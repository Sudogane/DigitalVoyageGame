const Router = require("express").Router();
const { getUserInformation, RNG } = require("../../core/utils");

const formBaseDamage = {
  "In-Training": { "min": 7, "max": 14 },
  "Rookie": { "min": 14, "max": 28 },
  "Champion": { "min": 36, "max": 50 },
  "Ultimate": { "min": 64, "max": 93 },
  "Mega": { "min": 144, "max": 216 }
}

const typeAdvantages = {
  None: { None: 1, Data: 1, Virus: 1, Vaccine: 1 },
  Virus: { None: 1, Data: 1.5, Virus: 1, Vaccine: 0.5 },
  Data: { None: 1, Data: 1, Virus: 0.5, Vaccine: 1.5 },
  Vaccine: { None: 1, Data: 0.5, Virus: 1.5, Vaccine: 1 },
};

const elementAdvantages = {
  Neutral: {},
  Fire: { Water: 0.9, Wood: 1.2, Ice: 1.2, Metal: 1.1, Earth: 1.1, Electric: 1.1 },
  Wind: { Earth: 1.2, Electric: 0.9, Water: 1.1, Metal: 0.9 },
  Water: { Fire: 1.2, Ice: 0.9, Wind: 0.9, Wood: 0.9, Earth: 1.1, Electric: 0.9 },
  Ice: { Fire: 0.9, Water: 1.2, Electric: 0.9 },
  Electric: { Water: 1.2, Ice: 1.2, Metal: 1.2, Fire: 0.9, Earth: 0.9 },
  Wood: { Fire: 0.9, Water: 0.9, Earth: 1.1, Electric: 1.2 },
  Earth: { Wind: 0.9, Water: 0.9, Electric: 1.1 },
  Light: { Dark: 1.2 },
  Dark: { Light: 1.2 },
};

function calculateDamage(attributes, elements, attackerLevel, attackerAttackStat, attackerEvolutionForm, defenderDefenseStats, moveEffect, enemyLevel) {
  const attributeAdvantage = typeAdvantages[attributes.attacker]?.[attributes.defender] || 1
  const elementalAdvantage = elementAdvantages[elements.attacker]?.[elements.defender] || 1
  let baseDamage = RNG(formBaseDamage[attackerEvolutionForm].min, formBaseDamage[attackerEvolutionForm].max)
  let damage = (attackerAttackStat * (attributeAdvantage + elementalAdvantage + 1) * (100 - enemyLevel + attackerLevel) - defenderDefenseStats * (100 - enemyLevel + attackerLevel)) / 100
  damage = Math.round(RNG(damage * 0.8, damage))
  if (damage < 0) damage = 0

  return damage
}


module.exports = function Battle({ Schemas }) {
  Router.post("/create", async (req, res) => {
    const DATA = req.body
    if (!DATA.stage) return

    const { userData } = await getUserInformation(req.oidc.user, Schemas)
    const BATTLE = await Schemas.battles.findOne({ tamer: userData.id })

    let monsDefeated = userData.modules.party.filter((mon) => mon.health == 0).length
    if (monsDefeated === userData.modules.party.length) return res.json({ deadDigimon: true })

    // Battle Types
    const CAMPAIGN = await Schemas.campaigns.findOne({ "stages.id": DATA.stage })

    if (!BATTLE) {
      let STAGE
      let battleData = {
        stage: DATA.stage,
        turn: {
          now: 0,
          queue: []
        },
        enemies: [],
        party: userData.modules.party,
        log: []
      }

      if (CAMPAIGN) {
        CAMPAIGN.locations.forEach(location => {
          let stage = location.stages.filter(stage => stage.id === DATA.stage)[0]
          if (stage) {
            STAGE = stage
            battleData.campaignId = location.id
            if (stage.bossStage) battleData.bossStage = true
          }
        })

        /*
        * Is Boss Stage on Cooldown?
        */

        if (STAGE.bossStage && userData.modules.cooldowns.boss[STAGE.id]) {
          const COOLDOWN_DATE = userData.modules.cooldowns.boss[STAGE.id]
          const CURRENT_DATE = new Date().getTime()
          const hasCooldownFinished = CURRENT_DATE >= COOLDOWN_DATE

          if (hasCooldownFinished) await userData.updateOne({ $unset: { [`modules.cooldowns.boss.${STAGE.id}`]: 1 } })
          else return res.json({ isStageOnCooldown: true, timeLeftInMS: COOLDOWN_DATE })
        }

        for (let i = 0; i < 3; i++) {
          let enemy = STAGE.enemies[i]

          if (enemy) {
            let _enemy = await Schemas.digimons.findOne({ id: enemy.id })
            let extraStats = enemy.extraStats

            _enemy = {
              ..._enemy.toObject(),
              level: enemy.level
            }


            for (var j = 1; j < _enemy.level; j++) {
              // Re-code to have a random nature.
              _enemy.stats.health += 5
              _enemy.stats.attack += 2
              _enemy.stats.speed += 2
              _enemy.stats.defense += 2

            }

            Object.keys(_enemy.stats).forEach(stat => {
              _enemy.stats[stat] = Math.floor(_enemy.stats[stat] * STAGE.enemyMultiplier)
              if (extraStats && extraStats[stat]) _enemy.stats[stat] += extraStats[stat]
            })

            _enemy.health = 2 * (_enemy.stats.health)
            _enemy.mana = _enemy.stats.mana

            delete _enemy.evolution
            delete _enemy._id
            delete _enemy.description
            delete _enemy.canLearnMoves
            delete _enemy.traits
            delete _enemy.__v

            battleData.enemies.push(_enemy)
          }
        }
      }

      battleData.turn.total = (battleData.enemies.length + battleData.party.length) - 1

      const enemiesQueue = battleData.enemies
        .filter(enemy => enemy)
        .map((enemy, index) => ({ _index: index, enemy: true, speed: enemy.stats.speed }));

      const partyQueue = battleData.party
        .filter(digimon => digimon)
        .map((digimon, index) => ({ _index: index, speed: digimon.stats.speed + digimon.stats.additional.speed }));

      const queue = [...enemiesQueue, ...partyQueue]
        .sort((a, b) => b.speed - a.speed);

      battleData.turn.queue = queue;


      await Schemas.battles.new(userData.id, battleData)
      res.json({ type: "redirect" })
    } else {
      res.json({ type: "redirect" })
    }

  })

  Router.get("/turn", async (req, res) => {
    if (!req.oidc.user) return;

    const { userData } = await getUserInformation(req.oidc.user, Schemas);
    let BATTLE = await Schemas.battles.findOne({ tamer: userData.id });
    if (!BATTLE) return;

    if (BATTLE.data.turn.now > BATTLE.data.turn.total) {
      await BATTLE.updateOne({ "data.turn.now": BATTLE.data.turn.total });
      BATTLE = await Schemas.battles.findOne({ tamer: BATTLE.tamer });
    }

    const CURRENT_TURN = BATTLE.data.turn.now;
    const BATTLE_QUEUE = BATTLE.data.turn.queue;
    const BATTLE_PARTY = BATTLE.data.party;
    const BATTLE_ENEMIES = BATTLE.data.enemies;

    let CURRENT_DIGIMON = BATTLE_QUEUE[CURRENT_TURN];
    CURRENT_DIGIMON = CURRENT_DIGIMON.enemy
      ? { enemy: true, ...BATTLE_ENEMIES[CURRENT_DIGIMON._index] }
      : BATTLE_PARTY[CURRENT_DIGIMON._index];
    CURRENT_DIGIMON = {
      species: CURRENT_DIGIMON.species,
      sprite: CURRENT_DIGIMON.sprite,
      enemy: CURRENT_DIGIMON.enemy || false,
    };

    const NEXT_TURN = CURRENT_TURN === BATTLE.data.turn.total ? 0 : CURRENT_TURN + 1;
    let NEXT_DIGIMON = BATTLE_QUEUE[NEXT_TURN];
    NEXT_DIGIMON = NEXT_DIGIMON.enemy
      ? { enemy: true, ...BATTLE_ENEMIES[NEXT_DIGIMON._index] }
      : BATTLE_PARTY[NEXT_DIGIMON._index];
    NEXT_DIGIMON = {
      species: NEXT_DIGIMON.species,
      sprite: NEXT_DIGIMON.sprite,
      enemy: NEXT_DIGIMON.enemy,
    };

    let data = {
      turn: {
        now: CURRENT_TURN,
        current: CURRENT_DIGIMON,
        next: NEXT_DIGIMON,
      },
      battleLog: BATTLE.data.log,
    };

    res.json(data);
  });


  Router.get("/", async (req, res) => {
    if (!req.oidc.user) return;

    const { userData } = await getUserInformation(req.oidc.user, Schemas);
    let BATTLE = await Schemas.battles.findOne({ tamer: userData.id });

    if (!BATTLE) return;
    if (BATTLE.data.turn.now > BATTLE.data.turn.total) {
      await BATTLE.updateOne({ "data.turn.now": BATTLE.data.turn.total });
      BATTLE = await Schemas.battles.findOne({ tamer: BATTLE.tamer });
    }

    BATTLE = await rearrangeTurns(BATTLE);

    if (BATTLE.data.turn.now > BATTLE.data.turn.total) {
      await BATTLE.updateOne({ "data.turn.now": BATTLE.data.turn.total });
      BATTLE = await Schemas.battles.findOne({ tamer: BATTLE.tamer });
    }

    if (!BATTLE) return;

    const CURRENT_TURN = BATTLE.data.turn.now;
    let BATTLE_QUEUE = BATTLE.data.turn.queue;
    const BATTLE_PARTY = BATTLE.data.party;
    let BATTLE_ENEMIES = BATTLE.data.enemies;

    let CURRENT_DIGIMON = BATTLE_QUEUE[CURRENT_TURN];
    let CURRENT_DIGIMONINDEX = CURRENT_DIGIMON._index;
    CURRENT_DIGIMON = CURRENT_DIGIMON.enemy
      ? { enemy: true, ...BATTLE_ENEMIES[CURRENT_DIGIMON._index] }
      : BATTLE_PARTY[CURRENT_DIGIMON._index];
    CURRENT_DIGIMON = {
      species: CURRENT_DIGIMON.species,
      sprite: CURRENT_DIGIMON.sprite,
      enemy: CURRENT_DIGIMON.enemy,
    };

    let NEXT_DIGIMON = CURRENT_TURN === BATTLE.data.turn.total
      ? BATTLE_QUEUE[0]
      : BATTLE_QUEUE[CURRENT_TURN];
    NEXT_DIGIMON = NEXT_DIGIMON.enemy
      ? { enemy: true, ...BATTLE_ENEMIES[NEXT_DIGIMON._index] }
      : BATTLE_PARTY[NEXT_DIGIMON._index];
    NEXT_DIGIMON = {
      species: NEXT_DIGIMON.species,
      sprite: NEXT_DIGIMON.sprite,
      enemy: NEXT_DIGIMON.enemy,
    };

    let data = {
      turn: {
        now: CURRENT_TURN,
        current: CURRENT_DIGIMON,
        next: NEXT_DIGIMON,
        currentEnemyIndex: CURRENT_DIGIMONINDEX,
      },
    };

    if (CURRENT_DIGIMON.enemy) {
      const battleParty = BATTLE.data.party.filter((digimon) => digimon.health > 0);
      if (!battleParty[0]) {
        await userData.updateOne({ "$set": { "modules.party": BATTLE_PARTY } });
        await Schemas.battles.deleteOne({ tamer: userData.id });
        return res.json({ lost: true });
      }

      let RE = RNG(0, battleParty.length - 1);
      let ENEMY = BATTLE.data.party[RE];

      for (let i = 1; i <= BATTLE.data.party.length; i++) {
        if (!ENEMY) {
          ENEMY = BATTLE.data.party[(RE + i) % BATTLE.data.party.length];
        } else {
          break;
        }
      }

      if (!ENEMY || ENEMY.health === 0) {
        ENEMY = BATTLE.data.party.find((enemy) => enemy.health > 0) || BATTLE.data.party[0];
      }

      if (!ENEMY || ENEMY.health === 0) {
        ENEMY = BATTLE.data.party.find((enemy) => enemy.health > 0) || BATTLE.data.party[1];
      }

      if (!ENEMY || ENEMY.health === 0) {
        ENEMY = BATTLE.data.party.find((enemy) => enemy.health > 0) || BATTLE.data.party[2];
      }

      RE = BATTLE.data.party.indexOf(ENEMY);
      if (RE === -1 || RE === 3 || typeof RE !== 'number') return

      const DIGIMON = BATTLE_ENEMIES[BATTLE_QUEUE[CURRENT_TURN]?._index];

      const stats = {
        main: {
          attack: DIGIMON.stats.attack,
          defense: DIGIMON.stats.defense,
          speed: DIGIMON.stats.speed,
        },
        enemy: {
          attack: ENEMY.stats.attack + ENEMY.stats.additional.attack,
          defense: ENEMY.stats.defense + ENEMY.stats.additional.defense,
          speed: ENEMY.stats.speed + ENEMY.stats.additional.speed,
        },
      };

      let damageOutput = calculateDamage(
        { attacker: DIGIMON.attribute, defender: ENEMY.attribute },
        { attacker: DIGIMON.element, defender: ENEMY.element },
        DIGIMON.level,
        stats.main.attack,
        DIGIMON.form,
        stats.enemy.defense,
        16,
        ENEMY.level
      );

      data.enemyAttacked = true;
      data.enemyAttacks = RE;
      data.enemyDMG = damageOutput;
      data.maxHP = 2 * (ENEMY.stats.health + ENEMY.stats.additional.health);

      BATTLE.data.party[RE].health = Math.max(0, BATTLE.data.party[RE].health - damageOutput);
      BATTLE.data.log.push(`<b>${DIGIMON.species}</b> deals ${damageOutput} to <b>${ENEMY.nickname || ENEMY.species}</b>`);
      data.health = ENEMY.health;

      if (BATTLE.data.stage.startsWith("worldBoss")) DIGIMON.stats.attack = DIGIMON.stats.attack * 1.8;
      await BATTLE.updateOne({ "data": BATTLE.data });
      BATTLE = await Schemas.battles.findOne({ tamer: userData.id });
      data.battleLog = BATTLE.data.log;

      await nextTurn(BATTLE);
      BATTLE = await Schemas.battles.findOne({ tamer: userData.id });
    }

    res.json(data);
  });




  Router.get("/status", async (req, res) => {
    if (!req.oidc.user) return
    let { userData } = await getUserInformation(req.oidc.user, Schemas)
    const BATTLE = await Schemas.battles.findOne({ tamer: userData.id })
    if (!BATTLE) return

    const BATTLE_ENEMIES = BATTLE.data.enemies
    const BATTLE_PARTY = BATTLE.data.party
    let data = {
      battle: {
        finished: false,
        rewards: []
      }
    }


    let enemiesDefeated = 0;
    BATTLE_ENEMIES.forEach((enemy) => {
      if (enemy.health === 0) enemiesDefeated++
    })

    let partnersDefeated = 0;
    BATTLE_PARTY.forEach((partyMember) => {
      if (partyMember.health === 0) partnersDefeated++
    })

    if (enemiesDefeated === BATTLE_ENEMIES.length || partnersDefeated === BATTLE_PARTY.length) data.battle.finished = true
    if (partnersDefeated === BATTLE_PARTY.length) data.battle.lost = true
    if (data.battle.finished) {
      await userData.updateOne({ "modules.party": BATTLE_PARTY })
      await Schemas.battles.deleteOne({ tamer: userData.id })
    }

    if (data.battle.finished && data.battle.lost) {
      await Promise.all(
        BATTLE_PARTY.map(async (member) => {
          member.xp = Math.round(member.xp * 0.06)
          if (member.xp < 0) member.xp = 0
        })
      );


      await userData.updateOne({ "$set": { "modules.party": BATTLE_PARTY } })
    }

    const hasBattleEndedAndUserWon = !data.battle.lost && data.battle.finished;
    const serverSettings = await Schemas.core.server.findOne({ id: 0 });

    // Campaign Rewards
    if (!BATTLE.data.battleType && hasBattleEndedAndUserWon) {
      let STAGE = await Schemas.campaigns.findOne({ "stages.id": BATTLE.data.stage }).lean()
      STAGE.locations.forEach(location => {
        location.stages.forEach(stage => {
          if (stage.id === BATTLE.data.stage) {
            const stageIndex = location.stages.indexOf(stage)
            const nextStage = location.stages[stageIndex + 1]
            STAGE = stage

            if (nextStage) {
              data.battle.nextStage = nextStage.id
            }
          }
        })
      })

      if (enemiesDefeated === BATTLE_ENEMIES.length) {
        data.battle.finished = true
        data.battle.levelup = {
          value: false,
          characters: []
        }

        if (BATTLE.data.hasScanned && userData.modules.stamina.current >= BATTLE.data.scan.cost) {
          const digimonScanned = BATTLE.data.scan.digimon;
          const scanAmount = BATTLE.data.scan.amount;
          let userScans = userData.modules.scans || {};

          userScans[digimonScanned] = (userScans[digimonScanned] || 0) + scanAmount;

          await userData.updateOne({
            $set: {
              "modules.scans": userScans,
              "modules.stamina.current": userData.modules.stamina.current - BATTLE.data.scan.cost
            }
          });
        }

        for (const drop of STAGE.drops) {
          switch (drop.type) {
            case "bits":
              let bits = RNG(drop.min, drop.max);
              bits = Math.round(bits * serverSettings.dropBuffs);

              if (userData.modules.vip?.active && userData.modules.vip.level >= 1) bits = Math.round(bits * 2)

              await userData.updateOne({ $inc: { "modules.BITS": bits } });
              data.battle.rewards.push({ type: "bits", amount: bits });
              break;

            case "xp":
              let Exp = RNG(drop.min, drop.max);
              Exp = Math.round(Exp * serverSettings.dropBuffs);

              let partyLevel = BATTLE.data.party.reduce((total, current) => total + current.level, 0);
              let enemiesLevel = BATTLE.data.enemies.reduce((total, current) => total + current.level, 0);


              if (userData.modules.vip?.active && userData.modules.vip.level >= 1) Exp = Math.round(Exp * 2)

              Exp = Exp * BATTLE_ENEMIES.length

              async function checkForLevelUp(member) {
                const additionalBaseExpNeeded = {
                  "In-Training": 36,
                  "Rookie": 50,
                  "Champion": 76,
                  "Ultimate": 120,
                  "Mega": 160
                };

                const formExpMultiplier = {
                  "In-Training": 0.95,
                  "Rookie": 1.2,
                  "Champion": 1.6,
                  "Ultimate": 2.4,
                  "Mega": 2.98
                };

                const tierExpMultiplier = {
                  "E": 1,
                  "D": 1.205,
                  "C": 1.504,
                  "B": 2.202,
                  "A": 2.4015,
                  "S": 4.1,
                }

                const nature = await Schemas.natures.findOne({ name: member.nature });
                let toLevelUp = Math.floor((additionalBaseExpNeeded[member.form] * (member.level * 0.868)) * 2.35);
                toLevelUp = Math.floor(toLevelUp * formExpMultiplier[member.form]);
                toLevelUp = Math.floor(toLevelUp * tierExpMultiplier[member.tier])

                if (member.xp >= toLevelUp && member.level !== 100) {
                  member.xp -= toLevelUp;
                  member.level += 1;
                  if (member.maxLevel < 100) member.maxLevel += 1;

                  const thisCharData = {
                    level: member.level,
                    nickname: member.nickname,
                    species: member.species,
                    sprite: member.sprite,
                    oldStats: {},
                    stats: member.stats
                  };

                  for (const stat of Object.keys(member.stats.additional)) {
                    if (member.maxLevel >= 100) break;

                    let natureStats = nature.stats;

                    if (natureStats.inc[stat]) member.stats.additional[stat] += natureStats.inc[stat];
                    if (stat === "health" && !natureStats.inc.health) member.stats.additional[stat] += 5;
                    else member.stats.additional[stat] += 2;
                  }

                  member.health = 2 * (member.stats.health + member.stats.additional.health);
                  thisCharData.stats = member.stats;

                  return await checkForLevelUp(member);
                }

                return member;
              }

              const levelUpCharacters = [];

              await Promise.all(
                BATTLE_PARTY.map(async (member) => {
                  if (!member.maxLevel) member.maxLevel = 1;
                  const nature = await Schemas.natures.findOne({ name: member.nature });
                  member.xp = member.xp + Exp;
                  const leveledChar = await checkForLevelUp(member);
                })
              );

              await userData.updateOne({ "modules.party": BATTLE_PARTY });
              data.battle.rewards.push({ type: "xp", amount: Exp });
              break;
          }
        }



        if (STAGE.bossStage) {
          const chance = RNG(0, 100)
          const minChance = 98
          const EquipmentManager = require("../../core/structures/equipment")
          const Equipment = new EquipmentManager()
          const equipment = await Equipment.generateEquipmentData(2, Schemas.equipments)

          if (chance >= minChance && userData.modules.inventory.length < userData.modules.capacities.inventory) {
            await userData.updateOne({
              $push: {
                "modules.inventory": equipment
              }
            })

            data.battle.rewards.push(equipment)
          }

          if (!userData.modules.stagesCleared.includes(STAGE.id) && STAGE.bossStage) {

            data.battle.rewards.push({
              name: "Virtual Data",
              type: "VirtualData",
              icon: "https://ik.imagekit.io/projectvoyage/Interface/Economy/icon_data_NOmq5vp1q.png?updatedAt=1682281009606",
              amount: 25
            })

            data.battle.rewards.push({ type: "autoPlayTicket", amount: 10 })

            await userData.updateOne({
              $set: {
                "modules.DATA": userData.modules.DATA + 25,
                "modules.autoPlayTickets": userData.modules.autoPlayTickets + 10
              }
            })
          }

        }

        for (let i = 0; i < BATTLE_ENEMIES.length; i++) {
          const enemy = BATTLE_ENEMIES[i];
          let sExpReward = { type: "sExp", amount: STAGE.sExpAmount };
          sExpReward.amount = Math.round(sExpReward.amount * serverSettings.dropBuffs);

          let partyLevel = BATTLE_PARTY.reduce((total, current) => total + current.level, 0);
          let enemiesLevel = BATTLE_ENEMIES.reduce((total, current) => total + current.level, 0);


          if (userData.modules.vip?.active && userData.modules.vip.level >= 3) sExpReward.amount = Math.round(sExpReward.amount * 2);

          switch (enemy.family) {
            case "Dragon's Roar":
              sExpReward.name = "Dragon";
              sExpReward.family = "dragonsroar";
              break;
            case "Virus Busters":
              sExpReward.name = "Holy";
              sExpReward.family = "virusbusters";
              break;
            case "Nightmare Soldiers":
              sExpReward.name = "Dark";
              sExpReward.family = "nightmaresoldiers";
              break;
            case "Nature Spirits":
              sExpReward.name = "Beast";
              sExpReward.family = "naturespirits";
              break;
            case "Wind Guardians":
              sExpReward.name = "Bird";
              sExpReward.family = "windguardians";
              break;
            case "Metal Empire":
              sExpReward.name = "Machine";
              sExpReward.family = "metalempire";
              break;
            case "Deep Savers":
              sExpReward.name = "Aquatic";
              sExpReward.family = "deepsavers";
              break;
            case "Jungle Troopers":
              sExpReward.name = "Plant/Insect";
              sExpReward.family = "jungletroopers";
              break;
          }

          BATTLE_PARTY.forEach(async (member) => {
            member.sExp[sExpReward.name.toLowerCase()] += sExpReward.amount;

            await Schemas.tamedDigimon.update(member);
          });

          const existingReward = data.battle.rewards.find(reward => reward.name === sExpReward.name);
          if (existingReward) {
            existingReward.amount += sExpReward.amount;
          } else {
            data.battle.rewards.push(sExpReward);
          }

          const userStagesCleared = userData.modules.stagesCleared;
          let stagesCleared = [];

          if (STAGE.bossStage && !userData.modules.cooldowns.boss[STAGE.id]) {
            const ONE_HOUR = 60 * 60 * 1000;
            const CURRENT_DATE = new Date().getTime();
            const COOLDOWN_DATE = new Date(CURRENT_DATE + ONE_HOUR).getTime();

            userData.modules.cooldowns.boss[STAGE.id] = COOLDOWN_DATE;

            await userData.updateOne({ "$set": { "modules.cooldowns.boss": userData.modules.cooldowns.boss } });
            userData = await Schemas.users.findOne({ id: userData.id });
          }

          if (!userStagesCleared.includes(STAGE.id)) stagesCleared.push(STAGE.id);
          if (!userStagesCleared.includes(STAGE.id) && STAGE.bossStage) {
            await Schemas.liveNews.addNews({ title: `Congratulations to ${userData.username}`, content: `for defeating <b class="text-red">BOSS ${STAGE.enemies[0].species}</b> for the first time!` });
          }

          if (STAGE.bossStage && !userStagesCleared.includes(BATTLE.data.campaignId)) stagesCleared.push(BATTLE.data.campaignId);
          if (stagesCleared.length > 0) await userData.updateOne({ $push: { "modules.stagesCleared": { $each: stagesCleared } } });
          userData = await Schemas.users.findOne({ id: userData.id });

          await userData.updateOne({ "$set": { "modules.party": BATTLE_PARTY, "modules.cooldowns.boss": userData.modules.cooldowns.boss } });
        }



        await userData.updateOne({ "$set": { "modules.party": BATTLE_PARTY } })
        await Schemas.battles.deleteOne({ tamer: userData.id })
        return res.json(data)
      }

      if (partnersDefeated === BATTLE_PARTY.length) {
        data.battle.finished = true
        data.battle.lost = true


        await userData.updateOne({ "$set": { "modules.party": BATTLE_PARTY } })
        await Schemas.battles.deleteOne({ tamer: userData.id })

        return res.json(data)
      }

    }

    // Coliseum Rewards
    if (BATTLE.data.battleType === "coliseum" && hasBattleEndedAndUserWon) {
      let expGained = RNG(BATTLE.data.opponent.drops.tamerExp.min, BATTLE.data.opponent.drops.tamerExp.max);
      const expNeededToLevelUp = Math.floor((528 * userData.modules.level * 1.588) / 1.4);
      expGained = Math.round(expGained * serverSettings.dropBuffs)

      if (userData.modules.vip?.active && userData.modules.vip.level >= 3) expGained = Math.round(expGained * 2)

      let exp = Math.round(userData.modules.exp + expGained);
      let level = userData.modules.level;

      const chance = RNG(0, 100);
      const extraAutoPlayTickets = chance >= 0 ? RNG(1, 8) : 0;

      if (exp >= expNeededToLevelUp) {
        const oldLevel = level;
        level++;
        exp -= expNeededToLevelUp;

        await Schemas.liveNews.addNews({
          title: `Congratulations to ${userData.username}`,
          content: `<b class="text-yellow">For leveling its tamer level up from ${oldLevel} to ${level}</b>`,
        });
      }

      await userData.updateOne({
        $set: { "modules.exp": exp, "modules.level": level },
        $inc: { "modules.autoPlayTickets": extraAutoPlayTickets },
      });

      const rewards = [{ type: "tamerExp", amount: expGained }];

      if (extraAutoPlayTickets) {
        rewards.push({ type: "autoPlayTicket", amount: extraAutoPlayTickets });
      }

      data.battle.rewards.push(...rewards);

      return res.json(data);

    }

    if (BATTLE.data.battleType === "chrono" && hasBattleEndedAndUserWon) {
      if (enemiesDefeated !== BATTLE.data.enemies.length) return
      data.battle.finished = true
      data.battle.levelup = {
        value: false,
        characters: []
      }

      for (var i = 0; i < BATTLE.data.drops.length; i++) {
        const drop = BATTLE.data.drops[i]
        switch (drop.type) {
          case "bits":
            let bits = RNG(drop.min, drop.max)
            bits = Math.round((bits) * serverSettings.dropBuffs)

            // Vip
            if (userData.modules.vip?.active && userData.modules.vip.level >= 1) bits = Math.round(bits * 2)
            if (RNG(0, 100) <= 15) {
              await userData.updateOne({ $inc: { "modules.autoPlayTicket": 2 } })
              data.battle.rewards.push({ type: "autoPlayTicket", amount: 2 })
            }

            await userData.updateOne({ $inc: { "modules.BITS": bits } })
            data.battle.rewards.push({ type: "bits", amount: bits })
            break;

          case "xp":
            let Exp = RNG(drop.min, drop.max)
            Exp = Math.round((Exp) * serverSettings.dropBuffs)

            // Vip
            if (userData.modules.vip?.active && userData.modules.vip.level >= 3) Exp = Math.round(Exp * 2)

            async function checkForLevelUp(member, hasLeveledUp, leveledChar) {
              const additionalBaseExpNeeded = {
                "In-Training": 36,
                "Rookie": 50,
                "Champion": 76,
                "Ultimate": 120,
                "Mega": 160
              };

              const formExpMultiplier = {
                "In-Training": 0.95,
                "Rookie": 1.2,
                "Champion": 1.6,
                "Ultimate": 2.4,
                "Mega": 2.98
              };

              const tierExpMultiplier = 1;

              const nature = await Schemas.natures.findOne({ name: member.nature });
              let toLevelUp = Math.floor((additionalBaseExpNeeded[member.form] * (member.level * 0.868)) * 2.35);
              toLevelUp = Math.floor(toLevelUp * formExpMultiplier[member.form]);

              if (member.xp >= toLevelUp && member.level !== 100) {
                member.xp -= toLevelUp;
                member.level += 1;
                if (member.maxLevel !== 101) member.maxLevel += 1;
                //console.log(member.level, member.maxLevel)

                const thisCharData = {
                  level: member.level,
                  nickname: member.nickname,
                  species: member.species,
                  sprite: member.sprite,
                  oldStats: {},
                  stats: member.stats
                };

                for (const stat of Object.keys(member.stats.additional)) {
                  if (member.level > member.maxLevel || member.maxLevel === 101) return
                  //console.log("upou")
                  const natureStats = nature.stats;

                  if (natureStats.inc[stat]) {
                    member.stats.additional[stat] += natureStats.inc[stat];
                  }

                  if (stat === "health" && !natureStats.inc.health) {
                    member.stats.additional[stat] += 5;
                  } else {
                    member.stats.additional[stat] += 2;
                  }

                  thisCharData.oldStats[stat] = member.stats[stat] + member.stats.additional[stat];
                }
                member.health = 2 * (member.stats.health + member.stats.additional.health);
                thisCharData.stats = member.stats;

                return await checkForLevelUp(member, true, thisCharData);
              }

              if (hasLeveledUp) {
                return leveledChar;
              }
            }


            for (const member of BATTLE_PARTY) {
              if (!member.maxLevel) member.maxLevel = 1
              const nature = await Schemas.natures.findOne({ name: member.nature });
              member.xp += Exp
              await checkForLevelUp(member);
            }
            data.battle.rewards.push({ type: "xp", amount: Exp })
            break;
        }
      }

      if (BATTLE.data.drops[0].type === "xp") {
        for (let i = 0; i < BATTLE_PARTY.length; i++) {
          const thisDigimon = BATTLE_PARTY[i];
          let sExpReward = { type: "sExp", amount: RNG(50, 60) };
          sExpReward.amount = Math.round(sExpReward.amount * serverSettings.dropBuffs);
          if (userData.modules.vip?.active && userData.modules.vip.level >= 3) sExpReward.amount = Math.round(sExpReward.amount * 2);

          switch (thisDigimon.family) {
            case "Dragon's Roar":
              sExpReward.name = "Dragon";
              sExpReward.family = "dragonsroar";
              break;
            case "Virus Busters":
              sExpReward.name = "Holy";
              sExpReward.family = "virusbusters";
              break;
            case "Nightmare Soldiers":
              sExpReward.name = "Dark";
              sExpReward.family = "nightmaresoldiers";
              break;
            case "Nature Spirits":
              sExpReward.name = "Beast";
              sExpReward.family = "naturespirits";
              break;
            case "Wind Guardians":
              sExpReward.name = "Bird";
              sExpReward.family = "windguardians";
              break;
            case "Metal Empire":
              sExpReward.name = "Machine";
              sExpReward.family = "metalempire";
              break;
            case "Deep Savers":
              sExpReward.name = "Aquatic";
              sExpReward.family = "deepsavers";
              break;
            case "Jungle Troopers":
              sExpReward.name = "Plant/Insect";
              sExpReward.family = "jungletroopers";
              break;
          }

          BATTLE_PARTY.forEach(async (member) => {
            member.sExp[sExpReward.name.toLowerCase()] += sExpReward.amount;

            await Schemas.tamedDigimon.update(member);
          });

          const existingReward = data.battle.rewards.find(reward => reward.name === sExpReward.name);
          if (existingReward) {
            existingReward.amount += sExpReward.amount;
          } else {
            data.battle.rewards.push(sExpReward);
          }

          await userData.updateOne({ "$set": { "modules.party": BATTLE_PARTY } });
        }
      }

      await userData.updateOne({ "$set": { "modules.party": BATTLE_PARTY } })
      await Schemas.battles.deleteOne({ tamer: userData.id })
      return res.json(data);
    }

    if (BATTLE.data.stage.startsWith("worldBoss") && partnersDefeated === BATTLE_PARTY.length) {
      const worldboss = await Schemas.events.worldBoss.findOne({ id: 1 })
      await worldboss.updateOne(
        { $inc: { "leaderboard.$[elem].timesFought": 1 } },
        { arrayFilters: [{ "elem.id": userData.id }] }
      )
    }



    return res.json(data)
  })


  Router.get("/items", async (req, res) => {
    const { user } = req.oidc;
    if (!user) return;

    const { userData } = await getUserInformation(user, Schemas);
    const battle = await Schemas.battles.findOne({ tamer: userData.id });
    if (!battle) return;

    const currentDigimon = battle.data.party[battle.data.turn.queue[battle.data.turn.now]._index];
    if (!currentDigimon) return;

    const items = userData.modules.battleInventory

    res.json({ items });
  });

  Router.get("/moves", async (req, res) => {
    const { user } = req.oidc;
    if (!user) return;

    const { userData } = await getUserInformation(user, Schemas);
    const battle = await Schemas.battles.findOne({ tamer: userData.id });
    if (!battle) return;

    const currentDigimon = battle.data.party[battle.data.turn.queue[battle.data.turn.now]._index];
    if (!currentDigimon) return;

    const moves = await Promise.all(currentDigimon.moves.map(async (moveName) => {
      const move = await Schemas.moves.findOne({ name: moveName });
      if (!move) return
      return { name: move.name, element: move.element };
    }));

    res.json({ moves });
  });

  Router.post("/useItem", async (req, res) => {
    if (!req.oidc.user) return
    const { userData } = await getUserInformation(req.oidc.user, Schemas)
    let BATTLE = await Schemas.battles.findOne({ tamer: userData.id })
    if (!BATTLE) return

    const { index } = req.body
    if (typeof index !== 'string') return
    const item = userData.modules.battleInventory[index]
    //console.log(item)
    if (!item || item.amount === 0) return

    const DIGIMON = BATTLE.data.party[BATTLE.data.turn.queue[BATTLE.data.turn.now]._index]
    if (item.itemType === "potion") {
      const maxHealth = 2 * (DIGIMON.stats.health + DIGIMON.stats.additional.health)
      const newHealthWithPotion = DIGIMON.health + item.pointRestoreAmount
      const finalHealth = (newHealthWithPotion > maxHealth) ? maxHealth : newHealthWithPotion

      BATTLE.data.log.push(`${DIGIMON.nickname || DIGIMON.species} has been healed`)

      await BATTLE.updateOne({
        "$set": {
          [`data.party.${BATTLE.data.turn.queue[BATTLE.data.turn.now]._index}.health`]: finalHealth,
          "data.log": BATTLE.data.log
        }
      })

      res.json({
        digimonIndex: BATTLE.data.turn.queue[BATTLE.data.turn.now]._index,
        battleLog: BATTLE.data.log,
        newHealth: finalHealth,
        maxHealth: maxHealth
      })
    }

    userData.modules.battleInventory[index].amount -= 1
    await userData.updateOne({
      "modules.battleInventory": userData.modules.battleInventory
    })
    await nextTurn(BATTLE)
  })

  Router.post("/useMove", async (req, res) => {
    if (!req.oidc.user) return;

    const { userData } = await getUserInformation(req.oidc.user, Schemas);
    let BATTLE = await Schemas.battles.findOne({ tamer: userData.id });
    if (!BATTLE) return;

    let { move, target } = req.body;
    if (!move) return;
    if (!target) target = 0;

    const isPlayerTurn = !BATTLE.data.turn.queue[BATTLE.data.turn.now].enemy;
    if (!isPlayerTurn) return;

    const MOVE = await Schemas.moves.findOne({ name: move });
    if (!MOVE) return;
    await nextTurn(BATTLE);

    let enemy = target;
    let name = move;
    let ENEMY = BATTLE.data.enemies[enemy];

    if (!ENEMY || ENEMY.health <= 0) {
      ENEMY = BATTLE.data.enemies.find((enemy) => enemy.health > 0) || null;
      enemy = ENEMY ? BATTLE.data.enemies.indexOf(ENEMY) : -1;
    }

    if (enemy === -1 || enemy === 3) return;

    const DIGIMON = BATTLE.data.party[BATTLE.data.turn.queue[BATTLE.data.turn.now]._index];
    const stats = {
      main: {
        attack: DIGIMON.stats.attack + DIGIMON.stats.additional.attack,
        defense: DIGIMON.stats.defense + DIGIMON.stats.additional.defense,
        speed: DIGIMON.stats.speed + DIGIMON.stats.additional.speed,
      },
      enemy: {
        attack: ENEMY.stats.attack,
        defense: ENEMY.stats.defense,
        speed: ENEMY.stats.speed,
      },
    };

    const missChance = RNG(0, 100);
    const minMissChance = {
      "In-Training": 20,
      "Rookie": 15,
      "Champion": 10,
      "Ultimate": 8,
      "Mega": 5,
    }[DIGIMON.form];

    const speedRatio = stats.main.speed / stats.enemy.speed;
    const missChanceWithSpeed = Math.max(minMissChance, minMissChance / speedRatio);
    const finalMissChance = Math.max(missChanceWithSpeed, missChance);

    let DMG = calculateDamage(
      { attacker: DIGIMON.attribute, defender: ENEMY.attribute },
      { attacker: DIGIMON.element, defender: ENEMY.element },
      DIGIMON.level,
      stats.main.attack,
      DIGIMON.form,
      stats.enemy.defense,
      16,
      ENEMY.level
    );

    const moveEffect = (MOVE.effect / 1.8) <= 0 ? 1 : MOVE.effect / 1.8;
    DMG = Math.round(DMG * moveEffect);

    if (BATTLE.data.stage.startsWith("worldBoss")) {
      const worldboss = await Schemas.events.worldBoss.findOne({ id: 1 });
      await worldboss.updateUserOnLeaderboard(userData.id, DMG);
    }

    const RANDOM_CRIT_CHANCE = RNG(0, 100);
    let hasCrited = false;
    if (RANDOM_CRIT_CHANCE < DIGIMON.stats.critRate) {
      DMG += Math.round(DMG * (1.2 + DIGIMON.stats.critDMG));
      hasCrited = true;
    }

    let HP = ENEMY.health;
    let log;
    if (finalMissChance >= 0) {
      HP = Math.max(0, ENEMY.health - DMG);
      DMG = hasCrited ? `<b>${DMG}</b> CRIT!` : DMG;
      log = `<b>${DIGIMON.nickname || DIGIMON.species}</b> deals ${DMG} to <b>${ENEMY.species}</b>`;
    } else {
      log = `<b>${DIGIMON.nickname || DIGIMON.species}</b> Missed the attack!`;
    }

    // Calumon daily login
    if (HP <= 0 && userData.modules.events.calumonDailyLogin.digimonsScaredToday !== 15) {
      await userData.updateOne({
        $inc: {
          "modules.events.calumonDailyLogin.digimonsScaredToday": 1,
        },
      });
    }

    BATTLE.data.log.push(log);

    await BATTLE.updateOne({
      "$set": {
        [`data.enemies.${enemy}.health`]: HP,
        "data.log": BATTLE.data.log,
      },
    });

    const digimonIndex = BATTLE.data.party.indexOf(DIGIMON);
    BATTLE = await Schemas.battles.findOne({ tamer: userData.id });

    res.json({
      digimonIndex: digimonIndex,
      damageDealt: DMG,
      enemyAttacked: enemy,
      enemyHP: HP,
      enemyMaxHP: 2 * ENEMY.stats.health,
      battleLog: log,
    });
  });


  Router.post("/flee", async (req, res) => {
    const battle = await isPlayerInBattle(req);
    if (!battle || battle.data.bossStage || battle.data.battleType === "coliseum") return;

    const isEnemyTurn = battle.data.turn.queue[battle.data.turn.now].enemy;
    if (isEnemyTurn) return;

    const fleeChance = RNG(0, 100);
    const fled = fleeChance <= 35;

    if (fled) {
      await Schemas.battles.deleteOne({ tamer: battle.tamer });
      await Schemas.users.updateOne({ id: battle.tamer }, { "modules.party": battle.data.party });
    } else {
      await nextTurn(battle);
    }

    res.json({ fled });
  });

  let scanning = []
  Router.post("/scan", async (req, res) => {
    try {
      if (!req.oidc.user) return res.status(403).json({ error: "Not Singed in" })
      const { userData, digivice } = await getUserInformation(req.oidc.user, Schemas)
      const battle = await Schemas.battles.findOne({ tamer: userData.id })
      const scanCost = digivice.scanCost || 5

      const prohibitedBattleTypes = ["coliseum", "chrono", "worldboss"]
      const isUserScanning = scanning.filter(usr => usr === userData.email)[0]
      if (!battle || !isPlayersTurn(battle) || isUserScanning || battle.data.bossStage || prohibitedBattleTypes.includes(battle.data.battleType) || userData.modules.stamina.current < scanCost) return res.status(400).json({ error: "Invalid battle conditions" })
      if (battle.data.hasScanned) {
        await battle.updateOne({ $push: { "data.log": "You can't scan anymore!" } })
        return res.json({ alreadyScanned: true })
      }

      scanning.push(userData.email)

      let { digimonToScan } = req.body
      if (typeof digimonToScan !== "number" || digimonToScan < 0 || digimonToScan >= battle.data.enemies.length) return res.status(400).json({ error: "Invalid digimon to scan" })

      /*
      Find any Alive digimon to scan if the current one isn't alive anymore.
      */
      for (let i = digimonToScan; i < battle.data.enemies.length + digimonToScan; i++) {
        const index = i % battle.data.enemies.length;
        if (battle.data.enemies[index].health > 0) {
          digimonToScan = battle.data.enemies[index].species;
          break;
        }
      }

      if (!digimonToScan) digimonToScan = battle.data.enemies[0].species;
      if (!digimonToScan) digimonToScan = battle.data.enemies[1].species;
      if (!digimonToScan) digimonToScan = battle.data.enemies[2].species;

      if (!userData.modules.scans) userData.modules.scans = {}
      if (userData.modules.scans[digimonToScan] && userData.modules.scans[digimonToScan] >= 500) {
        scanning.splice(scanning.indexOf(userData.email), 1)
        await battle.updateOne({ $push: { "data.log": "You can't scan this digimon anymore!" } })
        return res.json({ alreadyScanned: true })
      }

      const scannedAmount = RNG(digivice.minScan, digivice.maxScan);

      await Promise.all([
        battle.updateOne({
          $set: {
            "data.scan.digimon": digimonToScan,
            "data.scan.amount": scannedAmount,
            "data.scan.cost": scanCost,
            "data.hasScanned": true,
          },
          $push: {
            "data.log": `<b class="text-green">${userData.username}</b> Scanned ${scannedAmount}% of <b class="text-red">${digimonToScan}</b>'s DNA`,
          },
        })
      ])

      scanning.splice(scanning.indexOf(userData.email), 1)
      await nextTurn(battle)
      return res.json({ success: true })
    } catch (error) {
      console.log(error.message);
      console.log(error.stack);
      const [, lineno, colno] = error.stack.match(/(\d+):(\d+)/);
      console.log('Line:', lineno);
      return console.log('Column:', colno);

      return console.log(`[Battle/Scan][ERROR] ${error}\nLinha: ${error.line}`)
    }
  });



  function isPlayersTurn(BATTLE) {
    const CURRENT_DIGIMON = BATTLE.data.party[BATTLE.data.turn.queue[BATTLE.data.turn.now]._index]
    const isPlayerCurrentTurn = (CURRENT_DIGIMON) ? true : false

    return isPlayerCurrentTurn
  }

  async function isPlayerInBattle(req) {
    if (!req.oidc.user) return false
    const { userData } = await getUserInformation(req.oidc.user, Schemas)
    const battle = await Schemas.battles.findOne({ tamer: userData.id })
    if (!battle) return false

    return battle
  }

  async function nextTurn(battle) {
    const newTurn = (battle.data.turn.now < battle.data.turn.total) ? battle.data.turn.now + 1 : 0
    await battle.updateOne({ "data.turn.now": newTurn, })
    return Schemas.battles.findOne({ tamer: battle.tamer })
  }


  async function rearrangeTurns(battle) {
    // Clear the existing queue
    battle.data.turn.queue = [];

    // Add enemies to the queue
    battle.data.enemies.forEach((enemy, index) => {
      battle.data.turn.queue.push({
        _index: index,
        enemy: true,
        speed: enemy.stats.speed,
        defeated: enemy.health === 0,
      });
    });

    // Add party members to the queue
    battle.data.party.forEach((digimon, index) => {
      battle.data.turn.queue.push({
        _index: index,
        enemy: false,
        speed: digimon.stats.speed + digimon.stats.additional.speed,
        defeated: digimon.health === 0,
      });
    });

    // Remove defeated digimon from the queue
    battle.data.turn.queue = battle.data.turn.queue.filter((digi) => !digi.defeated);

    // Sort the queue based on speed (higher speed goes first)
    battle.data.turn.queue.sort((a, b) => b.speed - a.speed);

    // Update the total turns in the queue
    battle.data.turn.total = battle.data.turn.queue.length - 1;

    // Update the battle data in the database
    await battle.updateOne({ data: battle.data });

    // Fetch the updated battle data from the database
    battle = await Schemas.battles.findOne({ tamer: battle.tamer });

    return battle;
  }


  return {
    dir: "/api/battle",
    Router,
  };
};