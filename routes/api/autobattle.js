const Router = require("express").Router();
const { getUserInformation, RNG } = require("../../core/utils");

module.exports = function Main({ Schemas }) {
  Router.post("/", async (req, res) => {
    if (!req.oidc?.user) return
    let { userData } = await getUserInformation(req.oidc.user, Schemas)
    let { amount, stage } = req.body
    if (!amount || amount < 10 || !stage || !userData.modules.stagesCleared.includes(stage)) return res.sendStatus(400)

    let isUserInBattle = await Schemas.battles.findOne({ tamer: userData.id })
    if (isUserInBattle) return res.sendStatus(400)

    let enemies
    let sExpDropped
    let bitsEarned
    let expEarned
    let sExpTypes
    const campaignStage = await Schemas.campaigns.findOne({ "stages.id": stage }).lean()
    campaignStage.locations.forEach((location) => {
      const stageToFight = location.stages.filter(stf => stf.id === stage)[0]
      if (!stageToFight) return
      enemies = stageToFight.enemies

      let { drops, sExpAmount } = stageToFight
      const bits = drops[0]
      const exp = drops[1]

      sExpDropped = (sExpAmount * enemies.length) * amount
      bitsEarned = RNG(bits.min, bits.max) * amount
      expEarned = (RNG(exp.min, exp.max) * enemies.length) * amount


      if (userData.modules.VIP) {
        sExpDropped = Math.round(sExpDropped * 1.5)
        bitsEarned = Math.round(bitsEarned * 1.5)
        expEarned = Math.round(expEarned * 1.5)
      }

      sExpDropped = Math.round(sExpDropped * 4)
      bitsEarned = Math.round(bitsEarned * 4)
      expEarned = Math.round(expEarned * 4)

    })

    async function checkForLevelUp(member, hasLeveledUp, leveledChar) {
      let nature = await Schemas.natures.findOne({ name: member.nature })
      const additionalBaseExpNeeded = {
        "In-Training": 36,
        "Rookie": 50,
        "Champion": 76,
        "Ultimate": 120,
        "Mega": 160
      }

      const formExpMultiplier = {
        "In-Training": 0.95,
        "Rookie": 1.2,
        "Champion": 1.6,
        "Ultimate": 2.4,
        "Mega": 2.98
      }

      const tierExpMultiplier = {
        "E": 1,
        "D": 1.205,
        "C": 1.504,
        "B": 2.202,
        "A": 2.4015,
        "S": 4.1,
      };

      let toLevelUp = Math.floor((additionalBaseExpNeeded[member.form] * (member.level * 0.868)) * 2.35)
      toLevelUp = Math.floor(toLevelUp * formExpMultiplier[member.form])
      toLevelUp = Math.floor(toLevelUp * tierExpMultiplier[member.tier])

      if (member.xp >= toLevelUp && member.level !== 100) {
        member.xp = member.xp - toLevelUp
        member.level += 1
        if (member.maxLevel !== 100) member.maxLevel += 1;

        let thisCharData = { level: member.level, nickname: member.nickname, species: member.species, sprite: member.sprite }
        let oldStats = {}

        for (const stat of Object.keys(member.stats.additional)) {
          if (member.maxLevel >= 100) break;

          let natureStats = nature.stats;

          if (natureStats.inc[stat]) member.stats.additional[stat] += natureStats.inc[stat];
          if (stat === "health" && !natureStats.inc.health) member.stats.additional[stat] += 5;
          else member.stats.additional[stat] += 2;
        }

        member.health = 2 * (member.stats.health + member.stats.additional.health)

        thisCharData.oldStats = oldStats
        thisCharData.stats = member.stats

        return await checkForLevelUp(member, true, thisCharData)
      }

      if (hasLeveledUp) return leveledChar
    }

    enemies.forEach(async (enemy) => {
      enemy = await Schemas.digimons.findOne({ id: enemy.id })
      let sExpReward = {}
      switch (enemy.family) {
        case "Dragon's Roar":
          sExpReward.name = "Dragon"
          sExpReward.family = "dragonsroar"
          break;

        case "Virus Busters":
          sExpReward.name = "Holy"
          sExpReward.family = "virusbusters"
          break;

        case "Nightmare Soldiers":
          sExpReward.name = "Dark"
          sExpReward.family = "nightmaresoldiers"
          break;

        case "Nature Spirits":
          sExpReward.name = "Beast"
          sExpReward.family = "naturespirits"
          break;

        case "Wind Guardians":
          sExpReward.name = "Bird"
          sExpReward.family = "windguardians"
          break;

        case "Metal Empire":
          sExpReward.name = "Machine"
          sExpReward.family = "metalempire"
          break;

        case "Deep Savers":
          sExpReward.name = "Aquatic"
          sExpReward.family = "deepsavers"
          break;

        case "Jungle Troopers":
          sExpReward.name = "Plant/Insect"
          sExpReward.family = "jungletroopers"
          break;
      }

      for (var i = 0; i < userData.modules.party.length; i++) {
        let digimon = userData.modules.party[i]
        digimon.sExp[sExpReward.name.toLowerCase()] += sExpDropped
      }

    })

    for (var i = 0; i < userData.modules.party.length; i++) {
      let digimon = userData.modules.party[i]

      digimon.xp += expEarned
      await checkForLevelUp(digimon)

      await Schemas.tamedDigimon.update(digimon)
    }

    await userData.updateOne({ $set: { "modules.party": userData.modules.party }, $inc: { "modules.BITS": bitsEarned, "modules.autoPlayTickets": -10 } })

    return res.json({ action: "refresh" })
  })

  return {
    dir: "/api/autobattle",
    Router,
  }
}
