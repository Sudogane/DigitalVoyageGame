const Router = require("express").Router()
const { getUserInformation } = require("../../core/utils")
const digimon = require("../../core/structures/digimon");

module.exports = function Main({ Schemas }) {
  const multer = require("multer")
  const upload = multer()
  const ImageKit = require("imagekit")
  
  // Rate Limits
  let dailing = []
  let pulling = []
  
  Router.post("/config", async(req, res) => {
    if(!req.oidc.user) return
    const user = await Schemas.users.findOne({ email: req.oidc.user.email })
    let { volume } = req.body
    if(!volume || volume < 0) return
    volume = parseInt(volume) / 100
    
    await user.updateOne({
      "modules.config.volume.master": volume
    })
    
    return res.json({success: true})
  })
  
  Router.post("/avatar", upload.single('image'), async (req, res) => {
    if(!req.file.mimetype.startsWith("image/")) return
    const user = await Schemas.users.findOne({ email: req.oidc.user.email })
    
    let imagekit = new ImageKit({
      publicKey : process.env.IMAGE_KIT_PUBLIC_KEY,
      privateKey : process.env.IMAGE_KIT_PRIVATE_KEY,
      urlEndpoint : process.env.IMAGE_KIT_BASE_URL
    })
    
    imagekit.upload({
        file: req.file.buffer,
        folder: "/User/Avatars",
        fileName: `${user.id}-${Date.now()}-${req.file.originalname}`,
        transformation : [{
            "height" : "508",
            "width" : "508"
        }]
      }).then(async(response) => {
        await user.updateOne({ $set: { "avatarUrl": response.url } })
        res.json({ success: true });
      }).catch((error) => {
        console.log(`Erro ao trocar de avatar: ${error}`)
      })
  })
  
  Router.get("/hospital/heal", async(req, res) => {
    if(!req.oidc?.user) return
    let { userData } = await getUserInformation(req.oidc.user, Schemas)
    const isUserInBattle = await Schemas.battles.findOne({ tamer: userData?.id })
    if(!userData || isUserInBattle) return
    
    let response = {}
    
    if(userData.modules.BITS < 5) response.lowOnBits = true
    else response.success = true
    
    userData.modules.party.forEach((digimon) => {
      digimon.health = 2 * (digimon.stats.health + digimon.stats.additional.health)
    })
    
    await userData.updateOne({ $inc: { "modules.BITS": - 5}, $set: { "modules.party": userData.modules.party } })
    
    res.json(response)
  })
  
  Router.get("/livenews", async(req, res) => {
    const liveNews = await Schemas.liveNews.findOne({ id: 0 }).lean()
    if(!liveNews) return res.json([{ title: "ERROR", description: "Something went wrong with the servers"}])
    
    res.json(liveNews.content)
  })
  
  Router.get("/upgrade/digivice", async(req, res) => {
    if(!req.oidc?.user) return
    let { userData, digivice } = await getUserInformation(req.oidc.user, Schemas)
    const isUserInBattle = await Schemas.battles.findOne({ tamer: userData?.id })
    if(!userData || isUserInBattle) return
    
    let response = {}
    const requirementsToAcomplish = digivice.requirementsToUpgrade
    let requirementsDone = 0
    
    const digiviceUpgrade = await Schemas.upgrades.digivice.findOne({ id: digivice.id + 1 })
    if(!digiviceUpgrade) return
    
    const tamerRankRequiredDigivices = {
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 8
    }
    
    if(userData.modules.BITS < requirementsToAcomplish.bits) return res.json({ success: false, message: "You don't have enough bits!" })
    if(userData.modules.level < tamerRankRequiredDigivices[digiviceUpgrade.id]) return res.json({ success: false, message: "Tamer Rank too low!" })
    else requirementsDone += 1
    
    if(requirementsDone === Object.keys(requirementsToAcomplish).length) {
      await userData.updateOne({ $set: { "modules.levels.digivice": digiviceUpgrade.id, "modules.BITS": userData.modules.BITS - requirementsToAcomplish.bits } })
      
      return res.json({ success: true })
    }
  })
  
  async function handleRewardType(reward, user) {
    let response = {}
    let alteration = {}
    
    switch(reward.type) {
      case "economy": 
        alteration = { $inc: { [`modules.${reward.kind}`]: reward.amount } }
        response.text = `Successfully redeemed <b>${reward.amount} ${reward.name}</b>`
        response.success = true
        break;
    }
    
    await Schemas.users.updateOne({ email: user }, {
      ...alteration,
      $set: {
        "modules.ratelimits.daily": false
      }
    })
    
    dailing.splice(dailing.indexOf(user), 1)
    
    return response
  }
  
  Router.post("/daily/redeem", async (req, res) => {
    try {
      if(!req.oidc?.user) return res.status(401).json({ error: "User not authenticated" });
      const user = await Schemas.users.findOne({ email: req.oidc.user.email }, { "modules.cooldowns.daily": 1, "modules.daily.streak": 1, "modules.ratelimits.daily": 1 }).lean()
      const { rewards } = await Schemas.rewards.daily.findOne({ id: 0 }).lean()
      if(!rewards) return res.status(401).json({ error: "Contact the admin" });
      
      const isUserDailing = dailing.filter(usr => usr === req.oidc.user.email)[0]
      if(isUserDailing) return res.status(500).json({ error: "The operation hasn't finished yet" });
      dailing.push(req.oidc.user.email)

      const now = Date.now()
      const lastTimeRedeemed = new Date(user.modules.cooldowns.daily)?.getTime() || 0;
      console.log(now, lastTimeRedeemed)
      const timeDifference = now - lastTimeRedeemed;
      const twentyFourHoursInMilliseconds = 86400000;
      const fourtyTwoHoursInMilliseconds = 86400000 * 2;

      if (now < lastTimeRedeemed) {
        res.status(500).json({ error: "Cooldown hasn't finished yet." });
        return dailing.splice(dailing.indexOf(user), 1)
      }

      const streak = (lastTimeRedeemed >= (lastTimeRedeemed + twentyFourHoursInMilliseconds)) ? 1 : user.modules.daily.streak + 1
      const reward = rewards[streak]

      await Schemas.users.updateOne({ email: req.oidc.user.email }, {
        $set: {
          "modules.cooldowns.daily": now + twentyFourHoursInMilliseconds,
          "modules.daily.streak": streak,
          "modules.ratelimits.daily": true
        }
      })

      const response = await handleRewardType(reward, req.oidc.user.email)

      return res.json({ ...response, index: streak, streak: streak });
    } catch(error) {
      console.log(`[DAILY COLLECT ERROR] ${error}`)
    }
  });

  
  Router.get("/daily/rewards", async(req,res) => {
    try {
      const Daily = await Schemas.rewards.daily.findOne({ id: 0 })
      if(!Daily) return res.status(401).json({ error: "No daily rewards" })
      
      return res.json({ rewards: Daily.rewards })
    } catch(err) {
      
    }
  })
  
  Router.get("/gacha/banner", async (req, res) => {
    try {
      if (!req.oidc?.user) return res.status(401).json({ error: "Usuário não autenticado" })

      const currentBanner = await Schemas.gacha.banners.findOne({ active: true })
      if (!currentBanner) return res.status(404).json({ error: "Nenhum banner ativo encontrado" })

      return res.json(currentBanner)
    } catch (error) {
      console.error("Erro ao obter o banner:", error)
      return res.status(500).json({ error: "Erro interno do servidor" })
    }
  })
  
  async function pullOnBanner(pullAmount, pool, user) {
    const userGachaInfo = user.modules.gacha?.weapon;
    let inventory = user.modules.inventory;
    let pulledItems = [];

    for (let i = 0; i < pullAmount; i++) {
      const rarity = getRandomRarity(userGachaInfo.pity);
      const item = getRandomItem(pool, rarity);
      let alreadyPulled = false

      userGachaInfo.pulls++;
      userGachaInfo.pity++;
      
      if (rarity === 5 && !alreadyPulled || userGachaInfo.pity >= 90) {
        let guaranteedFiveStarItem = getRandomItem(pool, 5);
        pulledItems.push(guaranteedFiveStarItem);
        userGachaInfo.history.push(guaranteedFiveStarItem);
        inventory.push(guaranteedFiveStarItem);
        userGachaInfo.pity = 0;
        
        await Schemas.liveNews.addNews({title: `Congratulations to ${user.username}`, content: `For getting <b class="text-yellow">🌟🌟🌟🌟🌟 ${guaranteedFiveStarItem.name}</b> from the Invocation System!`})
        
        alreadyPulled = true
      }

      const lastTenPulls = userGachaInfo.history.slice(-9)
      const hasFourStarInLastTenPulls = lastTenPulls.some((item) => item.rarity === 4)

      if (rarity === 4 && !alreadyPulled || !hasFourStarInLastTenPulls && !alreadyPulled) {
        let guaranteedFourStarItem = getRandomItem(pool, 4);
        pulledItems.push(guaranteedFourStarItem);
        userGachaInfo.history.push(guaranteedFourStarItem);
        inventory.push(guaranteedFourStarItem);
        alreadyPulled = true
      }
      
      if (rarity === 3 && !alreadyPulled) {
        pulledItems.push(item);
        userGachaInfo.history.push(item);
        inventory.push(item);
        alreadyPulled = true
      }
    }

    await user.updateOne({
      $set: {
        "modules.gacha.weapon": userGachaInfo,
        "modules.inventory": inventory
      },
      $inc: {
        "modules.DATA": -(160*pullAmount)
      }
    });
    
    pulling.splice(pulling.indexOf(user.email), 1)

    const biggestRarity = pulledItems.sort((a, b) => b.rarity - a.rarity)[0].rarity
    return { biggestRarity, items: pulledItems };
  }

  function getRandomRarity(pity) {
    const randomNumber = Math.random()

    const rarity5Chance = 0.0006 + (pity * 0.00028)
    const rarity4Chance = 0.066

    if (randomNumber <= rarity5Chance) {
      return 5
    } else if (randomNumber <= rarity4Chance) {
      return 4
    } else {
      return 3
    }
  }


  function getRandomItem(pool, rarity) {
    const itemsWithRarity = pool.filter((item) => item.rarity === rarity);
    const randomIndex = Math.floor(Math.random() * itemsWithRarity.length);
    return { ...itemsWithRarity[randomIndex], type: "equipment", level: 1 } 
  }


  Router.post("/gacha/banner/pull", async (req, res) => {
    try {
      if (!req.oidc?.user) return res.status(401).json({ error: "Usuário não autenticado" })
      const { amount } = req.body
      
      if (!amount || ![1, 10].includes(amount)) return res.status(400).json({ error: "A quantidade é obrigatória" })
      const user = await Schemas.users.findOne({ email: req.oidc.user.email })
      
      if(pulling[req.oidc.user.email]) return res.status(401).json({ error: "The operation hasn't finished yet" });
      pulling.push(req.oidc.user.email)
      
      const virtualData = user.modules.DATA
      const pullCost = 160 * amount
      
      if (virtualData < pullCost) {
        pulling.splice(pulling.indexOf(user), 1)
        return res.status(500).json({ error: "You don't have enough Virtual Data" })
      }
      if((user.modules.inventory.length + amount) > user.modules.capacities.inventory)  {
        pulling.splice(pulling.indexOf(user), 1)
        return res.status(401).json({ error: "Inventory is full!" })
      }
      
      const currentBanner = await Schemas.gacha.banners.findOne({ active: true })
      if (!currentBanner) {
        pulling.splice(pulling.indexOf(user), 1)
        return res.status(404).json({ error: "Nenhum banner ativo encontrado" })
      }
      
      const Pull = await pullOnBanner(amount, currentBanner.pool, user)
      
      return res.json(Pull)
    } catch (error) {
      console.error("Erro ao obter o banner:", error)
      return res.status(500).json({ error: "Erro interno do servidor" })
    }
  })
  
  Router.get("/status", async(req, res) => {
    try {
      const Server = await Schemas.core.server.findOne({ id: 0 });
      if(Server.maintenance.active) return res.json({ maintenance: "The game is under maintenance" })
      return res.status(200).json({allowed: ""})
    } catch (error) {
      console.error(`Erro ao tentar abrir servidor: ${error}`)
      return res.status(500).json({ error: "The game is down" })
    }
  })

  return {
    dir: "/api",
    Router,
  }
}