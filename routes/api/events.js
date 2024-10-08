const Router = require("express").Router();
const { getUserInformation, RNG } = require("../../core/utils");
const BattleManager = require("../../core/structures/BattleManager");
const Digimon = require("../../core/structures/digimon");

let pulling = []
module.exports = function Events({ Schemas }) {
  
  Router.post("/worldboss", async(req, res) => {
    const worldBoss = await Schemas.events.worldBoss.findOne({ id: 1 })
    const { userData } = await getUserInformation(req.oidc.user, Schemas)
    
    const userFoughtAllAttempts = worldBoss.leaderboard.filter(position => position.id === userData.id)[0]
    console.log(userFoughtAllAttempts)
    if(!worldBoss.open) return
    if(userFoughtAllAttempts  && userFoughtAllAttempts.timesFought === 3) return
    
    let LEVEL = userData.modules.party[0].level
    if(userData.modules.party[1]) LEVEL += userData.modules.party[1].level
    if(userData.modules.party[2]) LEVEL += userData.modules.party[2].level
    
    const data = {
      stage: {
        id: "worldBossNormal"
      },
      url: "/battle/events/worldBossNormal",
      backdrop: "https://cdn.glitch.global/01f4400b-53dc-443a-be28-dae1dfeaf721/95481482-92d8-4ee5-83bc-065041091f03_width%3D1024%26height%3D512.jpg?v=1688842959131",
      type: "worldboss",
      drops: [],
      enemies: [worldBoss.currentEnemy.id],
      backgroundMusic: "https://cdn.glitch.global/01f4400b-53dc-443a-be28-dae1dfeaf721/%E3%80%8CDigimon%20Story%20_%20Cyber%20Sleuth%E3%80%8DBoss%20Battle%20Theme%20(OST)%20(320%20kbps).mp3?v=1689093155496",
      extraStats: [{
        health: Infinity,
        defense: Math.round(150 + Math.round((LEVEL / 1.1) * 1.5))
      }]
    }
    
    const battleTest = new BattleManager(userData, data, Schemas)
    const battle = await battleTest.createBattle()
    return res.json(battle)
  })
  
  Router.get("/gacha/data/0", async (req, res) => {
    try {
      if (!req.oidc?.user) return res.status(401).json({ error: "Usuário não autenticado" })

      const currentBanner = await Schemas.gacha.banners.findOne({ name: "V-Force" })
      if (!currentBanner) return res.status(404).json({ error: "Nenhum banner ativo encontrado" })

      return res.json(currentBanner)
    } catch (error) {
      console.error("Erro ao obter o banner:", error)
      return res.status(500).json({ error: "Erro interno do servidor" })
    }
  })
  
  Router.get("/gacha/data/1", async (req, res) => {
    try {
      if (!req.oidc?.user) return res.status(401).json({ error: "Usuário não autenticado" })

      const currentBanner = await Schemas.gacha.banners.findOne({ name: "Digital Hazard" })
      if (!currentBanner) return res.status(404).json({ error: "Nenhum banner ativo encontrado" })

      return res.json(currentBanner)
    } catch (error) {
      console.error("Erro ao obter o banner:", error)
      return res.status(500).json({ error: "Erro interno do servidor" })
    }
  })
  
  Router.get("/gacha/data/2", async (req, res) => {
    try {
      if (!req.oidc?.user) return res.status(401).json({ error: "Usuário não autenticado" })

      const currentBanner = await Schemas.gacha.banners.findOne({ name: "Soul Crusher" })
      if (!currentBanner) return res.status(404).json({ error: "Nenhum banner ativo encontrado" })

      return res.json(currentBanner)
    } catch (error) {
      console.error("Erro ao obter o banner:", error)
      return res.status(500).json({ error: "Erro interno do servidor" })
    }
  })
  
  Router.post("/gacha/pull", async (req, res) => {
    try {
      if (!req.oidc?.user) return res.status(401).json({ error: "Usuário não autenticado" })
      const { amount } = req.body
      if (!amount || ![1, 10].includes(amount)) return res.status(400).json({ error: "A quantidade é obrigatória" })
      const user = await Schemas.users.findOne({ email: req.oidc.user.email })
      
      const isUserPulling = pulling.filter(usr => usr === user.email)[0]
      if(isUserPulling) return res.status(500).json({ error: "Operation hasn't finished yet!"})
      pulling.push(user.email)
      
      const virtualData = user.modules.DATA
      const pullCost = 160 * amount
      
      if (virtualData < pullCost) {
        res.status(500).json({ error: "You don't have enough Virtual Data" })
        return pulling.splice(pulling.indexOf(user.email), 1)
      }
      if((user.modules.digibank.length + amount) > user.modules.capacities.digibank) {
        res.status(401).json({ error: "Digibank is full!" })
        return pulling.splice(pulling.indexOf(user.email), 1)
      }
      
      const currentBanner = await Schemas.gacha.banners.findOne({ name: "Synthetize Digital Form" })
      if (!currentBanner || !currentBanner.active) return res.status(404).json({ error: "Banner is inactive" })
      
      const Pull = await pullOnBanner(amount, currentBanner.pool, user)
      
      return res.json(Pull)
    } catch (error) {
      console.error("Erro ao obter o banner:", error)
      return res.status(500).json({ error: "Erro interno do servidor" })
    }
  })
  
Router.post("/gacha/pull/0", async (req, res) => {
    try {
      if (!req.oidc?.user) return res.status(401).json({ error: "Usuário não autenticado" })
      const { amount } = req.body
      if (!amount || ![1, 10].includes(amount)) return res.status(400).json({ error: "A quantidade é obrigatória" })
      const user = await Schemas.users.findOne({ email: req.oidc.user.email })
      
      const isUserPulling = pulling.filter(usr => usr === user.email)[0]
      if(isUserPulling) return res.status(500).json({ error: "Operation hasn't finished yet!"})
      pulling.push(user.email)
      
      const virtualData = user.modules.DATA
      const pullCost = 160 * amount
      
      if (virtualData < pullCost) {
        res.status(500).json({ error: "You don't have enough Virtual Data" })
        return pulling.splice(pulling.indexOf(user.email), 1)
      }
      if((user.modules.digibank.length + amount) > user.modules.capacities.digibank) {
        res.status(401).json({ error: "Digibank is full!" })
        return pulling.splice(pulling.indexOf(user.email), 1)
      }
      
      const currentBanner = await Schemas.gacha.banners.findOne({ name: "V-Force" })
      if (!currentBanner || !currentBanner.active) return res.status(404).json({ error: "Banner is inactive" })
      
      const Pull = await pullOnBanner(amount, currentBanner.pool, user)
      
      return res.json(Pull)
    } catch (error) {
      console.error("Erro ao obter o banner:", error)
      return res.status(500).json({ error: "Erro interno do servidor" })
    }
  })
  
Router.post("/gacha/pull/1", async (req, res) => {
    try {
      if (!req.oidc?.user) return res.status(401).json({ error: "Usuário não autenticado" })
      const { amount } = req.body
      if (!amount || ![1, 10].includes(amount)) return res.status(400).json({ error: "A quantidade é obrigatória" })
      const user = await Schemas.users.findOne({ email: req.oidc.user.email })
      
      const isUserPulling = pulling.filter(usr => usr === user.email)[0]
      if(isUserPulling) return res.status(500).json({ error: "Operation hasn't finished yet!"})
      pulling.push(user.email)
      
      const virtualData = user.modules.DATA
      const pullCost = 160 * amount
      
      if (virtualData < pullCost) {
        res.status(500).json({ error: "You don't have enough Virtual Data" })
        return pulling.splice(pulling.indexOf(user.email), 1)
      }
      if((user.modules.digibank.length + amount) > user.modules.capacities.digibank) {
        res.status(401).json({ error: "Digibank is full!" })
        return pulling.splice(pulling.indexOf(user.email), 1)
      }
      
      const currentBanner = await Schemas.gacha.banners.findOne({ name: "Digital Hazard" })
      if (!currentBanner || !currentBanner.active) return res.status(404).json({ error: "Banner is inactive" })
      
      const Pull = await pullOnBanner(amount, currentBanner.pool, user)

      return res.json(Pull)
    } catch (error) {
      console.error("Erro ao obter o banner:", error)
      return res.status(500).json({ error: "Erro interno do servidor" })
    }
  })
  
Router.post("/gacha/pull/2", async (req, res) => {
    try {
      if (!req.oidc?.user) return res.status(401).json({ error: "Usuário não autenticado" })
      const { amount } = req.body
      if (!amount || ![1, 10].includes(amount)) return res.status(400).json({ error: "A quantidade é obrigatória" })
      const user = await Schemas.users.findOne({ email: req.oidc.user.email })
      
      const isUserPulling = pulling.filter(usr => usr === user.email)[0]
      if(isUserPulling) return res.status(500).json({ error: "Operation hasn't finished yet!"})
      pulling.push(user.email)
      
      const virtualData = user.modules.DATA
      const pullCost = 160 * amount
      
      if (virtualData < pullCost) {
        res.status(500).json({ error: "You don't have enough Virtual Data" })
        return pulling.splice(pulling.indexOf(user.email), 1)
      }
      if((user.modules.digibank.length + amount) > user.modules.capacities.digibank) {
        res.status(401).json({ error: "Digibank is full!" })
        return pulling.splice(pulling.indexOf(user.email), 1)
      }
      
      const currentBanner = await Schemas.gacha.banners.findOne({ name: "Soul Crusher" })
      if (!currentBanner || !currentBanner.active) return res.status(404).json({ error: "Banner is inactive" })
      
      const Pull = await pullOnBanner(amount, currentBanner.pool, user)
      
      return res.json(Pull)
    } catch (error) {
      console.error("Erro ao obter o banner:", error)
      return res.status(500).json({ error: "Erro interno do servidor" })
    }
  })
  
  async function pullOnBanner(pullAmount, pool, user) {
    const userGachaInfo = user.modules.gacha?.digimon;
    let digibank = user.modules.digibank;
    let pulledDigimons = [];

    for (let i = 0; i < pullAmount; i++) {
      const tier = getRandomTier(userGachaInfo.pity);
      const item = getRandomDigimon(pool, tier);
      let alreadyPulled = false

      userGachaInfo.pulls++;
      userGachaInfo.pity++;
      
      if (tier === 'B' && !alreadyPulled || userGachaInfo.pity >= 90) {
        let guaranteedFiveStarItem = getRandomDigimon(pool, "B");
        pulledDigimons.push(guaranteedFiveStarItem);
        userGachaInfo.history.push(guaranteedFiveStarItem);
        
        const test = await Schemas.digimons.findOne({ species: guaranteedFiveStarItem.species });
        const digimonGenerator = new Digimon({ id: test.id, locked: false }, user.id, Schemas);

        try {
          const digimonData = await digimonGenerator.generateDigimonData();
            await Schemas.liveNews.addNews({title: `Congratulations to ${user.username}`, content: `For getting <b class="text-yellow">🌟🌟🌟🌟🌟 ${digimonData.species}</b> from the DigiCreate System!`})
            digimonData.tier = "B";
            Object.keys(digimonData.stats).forEach((stat) => {
              if (stat === "additional") return;
              digimonData.stats[stat] = Math.round(digimonData.stats[stat] * 1.4);
            });

          digibank.push(digimonData);
        } catch (error) {
          console.error("Failed to generate digimon data:", error);
        }
        
        userGachaInfo.pity = 0;
        
        alreadyPulled = true
      }

      const lastTenPulls = userGachaInfo.history.slice(-9)
      const hasFourStarInLastTenPulls = lastTenPulls.some((item) => item.tier === "C")

      if (tier === "C" && !alreadyPulled || !hasFourStarInLastTenPulls && !alreadyPulled) {
        let guaranteedFourStarItem = getRandomDigimon(pool, "C")
        pulledDigimons.push(guaranteedFourStarItem);
        userGachaInfo.history.push(guaranteedFourStarItem);

        const test = await Schemas.digimons.findOne({ species: guaranteedFourStarItem.species });
        const digimonGenerator = new Digimon({ id: test.id, locked: false }, user.id, Schemas);

        try {
          const digimonData = await digimonGenerator.generateDigimonData();

            digimonData.tier = "C";
            Object.keys(digimonData.stats).forEach((stat) => {
              if (stat === "additional") return;
              digimonData.stats[stat] = Math.round(digimonData.stats[stat] * 1.2);
            });

          digibank.push(digimonData);
        } catch (error) {
          console.error("Failed to generate digimon data:", error);
        }

        alreadyPulled = true;
        
      }
      
      if (tier === "D" && !alreadyPulled) {
        console.log(item)
        pulledDigimons.push(item);
        userGachaInfo.history.push(item);

        const test = await Schemas.digimons.findOne({ species: item.species });
        const digimonGenerator = new Digimon({ id: test.id, locked: false }, user.id, Schemas);

        try {
          const digimonData = await digimonGenerator.generateDigimonData();

          if (tier === "D") {
            digimonData.tier = "D";
            Object.keys(digimonData.stats).forEach((stat) => {
              if (stat === "additional") return;
              digimonData.stats[stat] = Math.round(digimonData.stats[stat] * 1.1);
            });
          } else if (tier === "C") {
            digimonData.tier = "C";
            Object.keys(digimonData.stats).forEach((stat) => {
              if (stat === "additional") return;
              digimonData.stats[stat] = Math.round(digimonData.stats[stat] * 1.2);
            });
          } else if (tier === "B") {
            digimonData.tier = "B";
            Object.keys(digimonData.stats).forEach((stat) => {
              if (stat === "additional") return;
              digimonData.stats[stat] = Math.round(digimonData.stats[stat] * 1.4);
            });
          }

          digibank.push(digimonData);
        } catch (error) {
          console.error("Failed to generate digimon data:", error);
        }

        alreadyPulled = true;
      }

    }
    
    const tierValues = {
      X: 7,
      S: 6,
      A: 5,
      B: 4,
      C: 3,
      D: 2,
      E: 1
    }

    const biggestRarity = pulledDigimons.sort((a, b) => tierValues[b.tier] - tierValues[a.tier])[0].tier
    //return
    await user.updateOne({
      $set: {
        "modules.gacha.digimon": userGachaInfo,
        "modules.digibank": digibank,
        "modules.DATA": user.modules.DATA - (160*pullAmount)
      }
    });

    pulling.splice(pulling.indexOf(user.email), 1)

    return { biggestRarity, digimons: pulledDigimons };
  }

  // futuramente re-fazer com porcentagens fixas
  function getRandomTier(pity) {
    const randomNumber = Math.random()

    const rarity5Chance = 0.0004 + (pity * 0.00028)
    const rarity4Chance = 0.033

    if (randomNumber <= rarity5Chance) {
      return "B"
    } else if (randomNumber <= rarity4Chance) {
      return "C"
    } else {
      return "D"
    }
  }


  function getRandomDigimon(pool, tier) {
    const itemsWithRarity = pool.filter((item) => item.tier === tier);
    let randomIndex
    if(["C", "D"].includes(tier)) randomIndex = RNG(0, itemsWithRarity.length -1);
    else randomIndex = (RNG(0, 5) <= 4) ? 1 : 0
    return itemsWithRarity[randomIndex] 
  }
  
  return {
    dir: "/api/events",
    Router,
  };
};