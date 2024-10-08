const Router = require("express").Router();
const { getUserInformation } = require("../../core/utils");

module.exports = function Battle({ Schemas }) {
  Router.post("/createBattle", async(req, res) => {
    const { userData } = await getUserInformation(req.oidc.user, Schemas)
    let { id } = req.body
    if(userData.modules.stamina.current < 40) return
    
    if(!["chrOfBits", "chrOfExperience"].includes(id) || userData.modules.level < 4) return    
    let digimonsWithoutLife = userData.modules.party.filter((d) => d.health === 0)

    let isUserInBattle = await Schemas.battles.findOne({ tamer: userData.id })
    if(isUserInBattle) return res.json({ action: "redirectToBattle", to: isUserInBattle.data.stage })
    
    const enemies = {
      chrOfBits: [163, 163, 163],
      chrOfExperience: [85, 85, 85]
    }
    
    const drops = {
      chrOfBits: [{type: "bits", min: 550, max: 1000}],
      chrOfExperience: [{type: "xp", min: 550, max: 1000}]
    }
    
    let battleData = {
      stage: `${id}`,
      id: id,
      //opponent: enemy,
      turn: {
        now: 0,
        queue: []
      },
      enemies: [],
      party: userData.modules.party,
      log: [],
      battleType: "chrono",
      drops: drops[id]
    }
    
    // Add Enemies
    for(digimon of enemies[id]) {
      digimon = await calculateStats(digimon)
      battleData.enemies.push(digimon)
    }
    
    battleData.turn.total = (battleData.enemies.length + battleData.party.length) - 1
    calculateTurnOrder()
    
    createBattle().then(async (isBattleCreated) => {
      if(!isBattleCreated) return
      await userData.spendStamina(40)
      return res.json({ action: "redirectToBattle", to: battleData.stage });
    });
    
    // Functions
    async function calculateStats(id) {
      let digimon = await Schemas.digimons.findOne({ id })
      
      digimon = {
        ...digimon.toObject(),
        level: 40
      }
      
      for(var j = 1; j< digimon.level; j++) {
        digimon.stats.health += 5
        digimon.stats.attack += 2
        digimon.stats.speed += 2
        digimon.stats.defense += 2 
      }
      
      digimon.health = 2 * digimon.stats.health
      digimon.mana = digimon.stats.mana
      
      return digimon
    }
    
    function calculateTurnOrder() {
      for(var i=0; i<3; i++) {
        if(battleData.enemies[i]) battleData.turn.queue.push({ _index: i, enemy: true, speed: battleData.enemies[i].stats.speed})
        if(battleData.party[i]) battleData.turn.queue.push({_index: i, speed: battleData.party[i].stats.speed + battleData.party[i].stats.additional.speed })
      }
      
      battleData.turn.queue.sort((a,b) => parseFloat(b.speed) - parseFloat(a.speed))
    }
    
    async function createBattle() {
      return new Promise(async(resolve) => {
        let newBattle = await Schemas.battles.new(userData.id, battleData);
        newBattle = await Schemas.battles.findOne({ tamer: userData.id })
        
        resolve(newBattle)
      })
    }
    
    return
  })

  
  return {
    dir: "/api/chrono",
    Router,
  };
};