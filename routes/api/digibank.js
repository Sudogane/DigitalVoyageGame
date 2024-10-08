const Router = require("express").Router();
const { RNG } = require("../../core/utils");

module.exports = function Digibank({ Schemas }) {  
  Router.post("/digimon/change_nickname", async (req, res) => {
    const USER = req.oidc.user
    const NICKNAME = req.body.nickname
    const DIGIMON_ID = req.body.id
    const user = await Schemas.users.findOne({ email: USER.email })
    let response = {error: ""}
        
    const REGEXP = new RegExp(/[^A-Za-z0-9 ]/g) 
    if(REGEXP.test(NICKNAME)) response.error = "Nickname contains invalid characters."
    if(!NICKNAME) response.error = "A Nickname must be provided"
    if(!DIGIMON_ID) response.error = "The ID is invalid"
    if(NICKNAME.length > 16) response.error = "Nickname is way too long."
    
    if(!response.error) {
      const IS_ONPARTY = user.modules.party.filter(D => D._id === DIGIMON_ID)[0]
      const STORAGE = (IS_ONPARTY) ? "party" : "digibank"
      
        await user.updateOne(
          {
            "$set": { [`modules.${STORAGE}.$[digimon].nickname`]: NICKNAME}
          },
          {
            "arrayFilters": [{"digimon._id": DIGIMON_ID}]
          }
        )
      
    }

    res.json(response)
  });
  
  Router.post("/digimon/evolve", async (req, res) => {
    const user = await Schemas.users.findOne({ email: req.oidc.user?.email })
    const { evolutionId, digimonId } = req.body
    if(!evolutionId) return
    
    const evolution = await Schemas.digimons.findOne({ id: evolutionId }).lean()
    const evolutionDetails = await Schemas.evolutions.findOne({ id: evolutionId }).lean()
    const digimonToEvolve = user.modules.party.filter(digimon => digimon._id === digimonId)[0] || user.modules.digibank.filter(digimon => digimon._id === digimonId)[0]
    if(!evolution || !evolutionDetails || !digimonToEvolve) return
    
    const randomMoveOne = evolution.canLearnMoves[1]   || ""
    const randomMoveTwo = evolution.canLearnMoves[2]   || ""
    const randomMoveThree = evolution.canLearnMoves[3] || ""
    
    let newMoveList = {
      "In-Training": ["Charge"],
      "Rookie": ["Charge", randomMoveOne],
      "Champion": ["Charge", randomMoveOne, randomMoveTwo],
      "Ultimate": ["Charge", randomMoveOne, randomMoveTwo, randomMoveThree],
      "Mega": ["Charge", randomMoveOne, randomMoveTwo, randomMoveThree]
    }[evolution.form]
    
    let tamerRankRequiredToLevelUp = {
      "In-Training": 1,
      "Rookie": 2,
      "Champion": 4,
      "Ultimate": 6,
      "Mega": 10
    };
    
    let canEvolve = false
    const hasEnoughSExp = evolutionDetails.sXpAmount <= digimonToEvolve.sExp[evolutionDetails.sXpType.toLowerCase()]
    const hasEnoughLevel = evolutionDetails.minLevel <= digimonToEvolve.level
    const hasEnoughTamerRank = user.modules.level >= tamerRankRequiredToLevelUp[evolution.form]
    
    if(!hasEnoughSExp || !hasEnoughLevel || !hasEnoughTamerRank) return
    
          let liveNews = await Schemas.liveNews.findOne({ id: 0 })
          if(liveNews.content.length > 2) {
            liveNews.content.shift()
            await liveNews.updateOne({ $set: { content: liveNews.content } })
            liveNews = await Schemas.liveNews.findOne({ id: 0 })
          }
          await liveNews.updateOne({ $push: {"content": {title: `Congratulations to ${user.username}`, content: `For evolving <b>${digimonToEvolve.species}</b> to <b>${evolution.species}</b>`} } })
    
    digimonToEvolve.id = evolution.id
    digimonToEvolve.species = evolution.species
    digimonToEvolve.sprite = evolution.sprite
    digimonToEvolve.stats = { ...evolution.stats, additional: { ...digimonToEvolve.stats.additional } }
    digimonToEvolve.form = evolution.form
    digimonToEvolve.attribute = evolution.attribute
    digimonToEvolve.family = evolution.family
    digimonToEvolve.element = evolution.element
    digimonToEvolve.level = 1
    digimonToEvolve.sExp[evolutionDetails.sXpType.toLowerCase()] = digimonToEvolve.sExp[evolutionDetails.sXpType.toLowerCase()] - evolutionDetails.sXpAmount
    digimonToEvolve.health = (digimonToEvolve.health > 2*(digimonToEvolve.stats.health + digimonToEvolve.stats.additional.health)) ? 2*(digimonToEvolve.stats.health + digimonToEvolve.stats.additional.health) : digimonToEvolve.health
    digimonToEvolve.mana = (digimonToEvolve.mana > digimonToEvolve.stats.mana + digimonToEvolve.stats.additional.mana) ? digimonToEvolve.stats.mana + digimonToEvolve.stats.additional.mana : digimonToEvolve.mana
    digimonToEvolve.xp = 0
    digimonToEvolve.moves = newMoveList
    
    if(digimonToEvolve.tier === "D") {
      Object.keys(digimonToEvolve.stats).forEach((stat) => {
        if(stat === "additional") return
        
        digimonToEvolve.stats[stat] = Math.round(digimonToEvolve.stats[stat] * 1.1)
      })
    }
    
    if(digimonToEvolve.tier === "C") {
      Object.keys(digimonToEvolve.stats).forEach((stat) => {
        if(stat === "additional") return
        
        digimonToEvolve.stats[stat] = Math.round(digimonToEvolve.stats[stat] * 1.2)
      })
    }
    
    if(digimonToEvolve.tier === "B") {
      Object.keys(digimonToEvolve.stats).forEach((stat) => {
        if(stat === "additional") return
        
        digimonToEvolve.stats[stat] = Math.round(digimonToEvolve.stats[stat] * 1.4)
      })
    }
    
    let storedIn = user.modules.party.filter(digimon => digimon._id === digimonId)[0]
    storedIn = (storedIn) ? "party" : "digibank"
    
    await user.updateOne(
      {
        "$set": { [`modules.${storedIn}.$[digimon]`]: digimonToEvolve}
      },
      {
        "arrayFilters": [{"digimon._id": digimonId}]
      }
    )
    
    res.json({ type: "success", digimon: digimonToEvolve })
  });
  
  Router.post("/digimon/degenerate", async (req, res) => {
    const user = await Schemas.users.findOne({ email: req.oidc.user?.email })
    const { evolutionId, digimonId } = req.body
    if(!evolutionId) return
    
    const evolution = await Schemas.digimons.findOne({ id: evolutionId }).lean()
    const evolutionDetails = await Schemas.evolutions.findOne({ id: evolutionId }).lean()
    const digimonToEvolve = user.modules.party.filter(digimon => digimon._id === digimonId)[0] || user.modules.digibank.filter(digimon => digimon._id === digimonId)[0]
    if(!evolution || !evolutionDetails || !digimonToEvolve) return
    
    let tamerRankRequiredToLevelUp = {
      "In-Training": 1,
      "Rookie": 2,
      "Champion": 4,
      "Ultimate": 6,
      "Mega": 10
    };
    
    let canEvolve = false
    const hasEnoughSExp = evolutionDetails.sXpAmount <= digimonToEvolve.sExp[evolutionDetails.sXpType.toLowerCase()]
    const hasEnoughLevel = evolutionDetails.minLevel <= digimonToEvolve.level
    const hasEnoughTamerRank = user.modules.level >= tamerRankRequiredToLevelUp[evolution.form]
    
    const randomMoveOne = evolution.canLearnMoves[1]   || ""
    const randomMoveTwo = evolution.canLearnMoves[2]   || ""
    const randomMoveThree = evolution.canLearnMoves[3] || ""
    
    let newMoveList = {
      "In-Training": ["Charge"],
      "Rookie": ["Charge", randomMoveOne],
      "Champion": ["Charge", randomMoveOne, randomMoveTwo],
      "Ultimate": ["Charge", randomMoveOne, randomMoveTwo, randomMoveThree],
      "Mega": ["Charge", randomMoveOne, randomMoveTwo, randomMoveThree]
    }[evolution.form]
    
    if(!hasEnoughSExp || !hasEnoughLevel || !hasEnoughTamerRank) return
    
    digimonToEvolve.id = evolution.id
    digimonToEvolve.species = evolution.species
    digimonToEvolve.sprite = evolution.sprite
    digimonToEvolve.stats = { ...evolution.stats, additional: { ...digimonToEvolve.stats.additional } };
    digimonToEvolve.form = evolution.form
    digimonToEvolve.attribute = evolution.attribute
    digimonToEvolve.family = evolution.family
    digimonToEvolve.element = evolution.element
    digimonToEvolve.level = 1
    digimonToEvolve.sExp[evolutionDetails.sXpType.toLowerCase()] = digimonToEvolve.sExp[evolutionDetails.sXpType.toLowerCase()] - evolutionDetails.sXpAmount
    digimonToEvolve.health = (digimonToEvolve.health > 2*(digimonToEvolve.stats.health + digimonToEvolve.stats.additional.health)) ? 2*(digimonToEvolve.stats.health + digimonToEvolve.stats.additional.health) : digimonToEvolve.health
    digimonToEvolve.mana = (digimonToEvolve.mana > digimonToEvolve.stats.mana + digimonToEvolve.stats.additional.mana) ? digimonToEvolve.stats.mana + digimonToEvolve.stats.additional.mana : digimonToEvolve.mana
    digimonToEvolve.xp = 0
    digimonToEvolve.moves = newMoveList
    
    if(digimonToEvolve.tier === "D") {
      Object.keys(digimonToEvolve.stats).forEach((stat) => {
        if(stat === "additional") return
        
        digimonToEvolve.stats[stat] = Math.round(digimonToEvolve.stats[stat] * 1.1)
      })
    }
    
    if(digimonToEvolve.tier === "C") {
      Object.keys(digimonToEvolve.stats).forEach((stat) => {
        if(stat === "additional") return
        
        digimonToEvolve.stats[stat] = Math.round(digimonToEvolve.stats[stat] * 1.2)
      })
    }
    
    if(digimonToEvolve.tier === "B") {
      Object.keys(digimonToEvolve.stats).forEach((stat) => {
        if(stat === "additional") return
        
        digimonToEvolve.stats[stat] = Math.round(digimonToEvolve.stats[stat] * 1.4)
      })
    }
    
    let storedIn = user.modules.party.filter(digimon => digimon._id === digimonId)[0]
    storedIn = (storedIn) ? "party" : "digibank"
    
    await user.updateOne(
      {
        "$set": { [`modules.${storedIn}.$[digimon]`]: digimonToEvolve}
      },
      {
        "arrayFilters": [{"digimon._id": digimonId}]
      }
    )
    
    res.json({ type: "success", digimon: digimonToEvolve })
  });
  
  Router.post("/digimon/removeFromParty", async(req, res) => {
    const user = await Schemas.users.findOne({ email: req.oidc.user?.email })
    const { _id } = req.body
    if(!_id || user.modules.party.length === 1) return
    
    const digimonToRemove = user.modules.party.filter(digimon => digimon._id === _id)[0]
    if(!digimonToRemove) return
    const digimonIndex = user.modules.party.indexOf(digimonToRemove)
    if(user.modules.digibank.length === user.modules.capacities.digibank) return
    
    user.modules.party.splice(digimonIndex, 1)
    user.modules.digibank.push(digimonToRemove)
    
    await user.updateOne({
      $set: {
        "modules.party": user.modules.party,
        "modules.digibank": user.modules.digibank
      }
    })
    
    return res.json({ type: "success" })
  })
  
  Router.post("/digimon/addToParty", async(req, res) => {
    const user = await Schemas.users.findOne({ email: req.oidc.user?.email })
    const { _id } = req.body
    if(!_id || user.modules.party.length === 3) return
    
    const digimonToAdd = user.modules.digibank.filter(digimon => digimon._id === _id)[0]
    if(!digimonToAdd) return
    const digimonIndex = user.modules.digibank.indexOf(digimonToAdd)
    
    let tamerRankRequired = {
      "In-Training": 1,
      "Rookie": 2,
      "Champion": 4,
      "Ultimate": 6,
      "Mega": 10
    };
    
    if(tamerRankRequired[digimonToAdd.form] > user.modules.level) return res.status(500).send("Your Tamer Rank is too low")
    
    user.modules.digibank.splice(digimonIndex, 1)
    user.modules.party.push(digimonToAdd)
    
    await user.updateOne({
      $set: {
        "modules.party": user.modules.party,
        "modules.digibank": user.modules.digibank
      }
    })
    
    return res.json({ type: "success" })
  })
  
  Router.post("/digimon/release", async(req, res) => {
    const user = await Schemas.users.findOne({ email: req.oidc.user?.email })
    const { _id } = req.body
    if(!_id) return
    
    let digimonToRelease = user.modules.digibank.filter(digimon => digimon._id === _id)[0] || user.modules.party.filter(digimon => digimon._id === _id)[0]
    if(!digimonToRelease || digimonToRelease && user.modules.party.length === 1 && user.modules.party[0]._id === digimonToRelease._id || digimonToRelease.locked) return
    
    const storedIn = (user.modules.digibank.filter(digimon => digimon._id === _id)[0]) ? "digibank" : "party"
    const digimonIndex = user.modules[storedIn].indexOf(digimonToRelease)
    
    user.modules[storedIn].splice(digimonIndex, 1)
    
    await user.updateOne({
        "$set": { [`modules.${storedIn}`]: user.modules[storedIn]},
        "$inc": { "modules.BITS": 500 }
      })
    
    return res.json({ type: "success" })
  })
  
  let deleting = []
  Router.post("/digimon/delete", async(req, res) => {
    try {
      if(!req.oidc.user) return res.json(403).json({ error: "Not Logged In" })
      const user = await Schemas.users.findOne({ email: req.oidc.user.email })
      const { digimonsToDelete } = req.body
      if(!digimonsToDelete || digimonsToDelete.length < 1 || deleting[user.email]) return res.json(500).json({ error: "Invalid digimons" })
      if(!deleting[user.email]) deleting.push(user.email)
      
      digimonsToDelete.forEach((digimonToDelete) => {
        const thisDigimon = user.modules.digibank.filter((digi) => digi._id === digimonToDelete)[0]
        if(!thisDigimon || thisDigimon.locked) return
        user.modules.digibank.splice(user.modules.digibank.indexOf(thisDigimon), 1)
      })
      
      await user.updateOne({
        $set: {
          "modules.digibank": user.modules.digibank,
          "modules.BITS": user.modules.BITS + (500 * digimonsToDelete.length)
        }
      })
    } catch(error) {
      console.log(`[Digibank/Delete] ${error}`)
    } finally {
      deleting.splice(deleting.indexOf(req.oidc.user.email), 1)
      return res.json({ type: "success" })
    }
  })
  
  const Digimon = require("../../core/structures/digimon");
  Router.post("/scans/create", async (req, res) => {
    const user = await Schemas.users.findOne({ email: req.oidc.user?.email })
    const scans = user.modules.scans
    let { species } = req.body
    if(!species || !scans[species] || scans[species] < 100 || user.modules.digibank.length === user.modules.capacities.digibank) return
    species = await Schemas.digimons.findOne({ species }) 
    
    
  const digimonGenerator = new Digimon({ id: species.id, locked: false }, user.id, Schemas);
  digimonGenerator.generateDigimonData().then(async (digimonData) => {
    user.modules.scans[species.species] -= 100;
    user.modules.digibank.push(digimonData);
    
    const chance = Math.random()
    if(user.modules.levels.digivice >= 3 && chance <= 0.25) {
      digimonData.tier = "D"
      Object.keys(digimonData.stats).forEach((stat) => {
        if(stat === "additional") return
        
        digimonData.stats[stat] = Math.round(digimonData.stats[stat] * 1.1)
      })
    }
    
    if(user.modules.levels.digivice >= 5 && chance <= 0.12) {
      digimonData.tier = "C"
      Object.keys(digimonData.stats).forEach((stat) => {
        if(stat === "additional") return
        
        digimonData.stats[stat] = Math.round(digimonData.stats[stat] * 1.2)
      })
    }
    
    if(user.modules.levels.digivice >= 8 && chance <= 0.005) {
      digimonData.tier = "B"
      Object.keys(digimonData.stats).forEach((stat) => {
        if(stat === "additional") return
        
        digimonData.stats[stat] = Math.round(digimonData.stats[stat] * 1.4)
      })
    }

    await user.updateOne({
      $set: {
      "modules.scans": user.modules.scans,
        "modules.digibank": user.modules.digibank
      }})
    })
    
    let liveNews = await Schemas.liveNews.findOne({ id: 0 })
    if(liveNews.content.length > 2) {
      liveNews.content.shift()
      await liveNews.updateOne({ $set: { content: liveNews.content } })
      liveNews = await Schemas.liveNews.findOne({ id: 0 })
    }
    await liveNews.updateOne({ $push: {"content": {title: `Congratulations to ${user.username}`, content: `for creating <b>${species.species}</b> using the scan system!`} } })
    
    return res.json({ type: "success" })
  })
  
  Router.post("/digimon/unequip", async (req, res) => {
    if (!req.oidc?.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await Schemas.users.findOne({ email: req.oidc.user?.email });
    const { modules: { party, digibank, inventory, capacities } } = user;
    const { _id } = req.body;

    if (!_id) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const storedIn = party.some((digimon) => digimon._id === _id) ? "party" : "digibank";
    const digimon = user.modules[storedIn].find((digi) => digi._id === _id);

    if (!digimon || inventory.length === capacities.inventory || !digimon.equipment) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    inventory.push(digimon.equipment);

    const equipment = digimon.equipment;
    const { stats } = digimon;
    
    if (equipment.statAmountIncreaseType !== "percentage") {
      let newSubStatValue = stats.additional[equipment.subStat] - equipment.statAmountIncrease;
      newSubStatValue = Math.floor(newSubStatValue)
      stats.additional[equipment.subStat] = (Number.isFinite(newSubStatValue) && newSubStatValue >= 0) ? newSubStatValue : 0;
    } else {
      const newSubStatValue = Math.floor(stats.additional[equipment.subStat] / equipment.statAmountIncrease);
      stats.additional[equipment.subStat] = (Number.isFinite(newSubStatValue) && newSubStatValue >= 0) ? newSubStatValue : 0;
    }
    
    if(equipment.mainStat) {
      let newMainStat = stats.additional.attack - equipment.mainStat
      newMainStat = Math.floor(newMainStat)
      stats.additional.attack = (Number.isFinite(newMainStat) && newMainStat >= 0) ? newMainStat : 0;
    }
    
    digimon.equipment = {};

    await user.updateOne({
      $set: {
        "modules.inventory": inventory,
        [`modules.${storedIn}`]: user.modules[storedIn],
      },
    });

    return res.status(200).json({ message: "Equipment successfully equipped" });
  });

  Router.post("/upgradeDigibank", async (req, res) => {
    if (!req.oidc?.user) return res.status(401).send("Unauthorized")
    
    try {
      const user = await Schemas.users.findOne({ email: req.oidc.user.email })
      const upgradePrice = Math.round(1550 * (user.modules.capacities.digibank / 4.2) )
      
      if(user.modules.BITS < upgradePrice) return res.status(400).send("You don't have enough bits")
      
      await user.updateOne({
        $set: {
          "modules.BITS": user.modules.BITS - upgradePrice,
          "modules.capacities.digibank": user.modules.capacities.digibank + 15
        }
      })
      
      return res.status(200).send("Upgrade complete")
    } catch(error) {
      console.log("UPGRADE INVENTORY ERROR", error)
    }
  })

  return {
    dir: "/api/digibank",
    Router,
  };
};
