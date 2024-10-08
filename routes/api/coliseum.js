const Router = require("express").Router();
const { getUserInformation, RNG } = require("../../core/utils");

module.exports = function Battle({ Schemas }) {
  Router.post("/createBattle", async (req, res) => {
    const { userData } = await getUserInformation(req.oidc.user, Schemas);
    let { enemy } = req.body;

    const digimonsWithoutLife = userData.modules.party.filter((d) => d.health === 0);
    if (!enemy || !userData || userData.modules.coliseumTickets === 0 || digimonsWithoutLife.length === userData.modules.party.length) {
      return
    }

    let isUserInBattle = await Schemas.battles.findOne({ tamer: userData.id });
    if (isUserInBattle) {
      return res.json({ action: "redirectToBattle", to: isUserInBattle.data.stage });
    }

    enemy = await Schemas.coliseum.opponents.get(enemy);

    if (!enemy || enemy.tamerLevelRequired.min > userData.modules.level || enemy.tamerLevelRequired.max < userData.modules.level) {
      return console.log("Inimigo nao existe")
    }

    const battleData = {
      stage: `coliseumBattle-${enemy.name}${enemy.id}${enemy.rank}`,
      opponent: enemy,
      turn: {
        now: 0,
        queue: [],
      },
      enemies: [],
      party: userData.modules.party,
      log: [],
      battleType: "coliseum",
    };

    for (const digimon of enemy.digimons) {
      const calculatedStats = await calculateStats(digimon, enemy.battleConfig.partyLevel);
      battleData.enemies.push(calculatedStats);
    }

    battleData.turn.total = battleData.enemies.length + battleData.party.length - 1;
    calculateTurnOrder();

    createBattle().then(async (isBattleCreated) => {
      if(!isBattleCreated) return
      await userData.updateOne({ $inc: { "modules.coliseumTickets": -1 } });
      return res.json({ action: "redirectToBattle", to: battleData.stage });
    });

    // Functions
    function calculateTurnOrder() {
      for (let i = 0; i < 3; i++) {
        if (battleData.enemies[i]) {
          battleData.turn.queue.push({ _index: i, enemy: true, speed: battleData.enemies[i].stats.speed });
        }
        if (battleData.party[i]) {
          battleData.turn.queue.push({ _index: i, speed: battleData.party[i].stats.speed + battleData.party[i].stats.additional.speed });
        }
      }

      battleData.turn.queue.sort((a, b) => parseFloat(b.speed) - parseFloat(a.speed));
    }

    async function createBattle() {
      return new Promise(async(resolve) => {
        let newBattle = await Schemas.battles.new(userData.id, battleData);
        newBattle = await Schemas.battles.findOne({ tamer: userData.id })
        
        resolve(newBattle)
      })
    }
    
    async function calculateStats(digimon, level) {
      let digimonStats = await Schemas.digimons.findOne({ id: digimon });

      digimonStats = {
        ...digimonStats.toObject(),
        level: level,
      };

      for (let j = 1; j < digimonStats.level; j++) {
        digimonStats.stats.health += 5;
        digimonStats.stats.attack += 2;
        digimonStats.stats.speed += 2;
        digimonStats.stats.defense += 2;
      }
      
      if(battleData.opponent.battleConfig.extraStats) {
        const stats = battleData.opponent.battleConfig.extraStats
        Object.keys(stats).forEach((stat) => {
          digimonStats.stats[stat] += stats[stat]
        })
      }

      digimonStats.health = 2 * digimonStats.stats.health;
      digimonStats.mana = digimonStats.stats.mana;

      return digimonStats;
    }
  });
  
  return {
    dir: "/api/coliseum",
    Router,
  };
};