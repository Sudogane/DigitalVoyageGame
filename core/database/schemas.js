const tamersSchema = require("./schemas/tamers.js")
const newsSchema = require("./schemas/news.js")
const campaignSchema = require("./schemas/campaign.js")
const digimonSchema = require("./schemas/digimon.js")
const natureSchema = require("./schemas/nature.js")
const evolutionsSchema = require("./schemas/evolutions.js")
const costumeSchema = require("./schemas/costume.js")
const moveSchema = require("./schemas/move.js")
const battleSchema = require("./schemas/battle.js")
const liveNewsSchema = require("./schemas/livenews.js")
const digiviceUpgradesSchema = require("./schemas/upgrades/digivice.js")
const tamedDigimonSchema = require("./schemas/tamed_digimons.js")
const coliseumOpponentsSchema = require("./schemas/coliseum/opponents.js")
const equipmentSchema = require("./schemas/equipment.js")
const gachaBannerSchema = require("./schemas/gacha/banner.js")
const dailySchema = require("./schemas/rewards/daily.js")
const worldBossSchema = require("./schemas/events/worldboss.js")
const serverSchema = require("./schemas/core/server.js")


module.exports = function SCHEMAS(activeConnection) {
  const userDB = tamersSchema(activeConnection)
  const newsDB = newsSchema(activeConnection)
  const campaignDB = campaignSchema(activeConnection)
  const digimonDB = digimonSchema(activeConnection)
  const natureDB = natureSchema(activeConnection)
  const evosDB = evolutionsSchema(activeConnection)
  const costumesDB = costumeSchema(activeConnection)
  const movesDB = moveSchema(activeConnection)
  const battlesDB = battleSchema(activeConnection)
  const liveNewsDB = liveNewsSchema(activeConnection)
  const digiviceUpgradesDB = digiviceUpgradesSchema(activeConnection)
  const tamedDigimonDB = tamedDigimonSchema(activeConnection)
  const coliseum = {
    opponents: coliseumOpponentsSchema(activeConnection)
  }
  const equipments = equipmentSchema(activeConnection)
  const gacha = {
    banners: gachaBannerSchema(activeConnection)
  }
  const rewards = {
    daily: dailySchema(activeConnection)
  }
  const events = {
    worldBoss: worldBossSchema(activeConnection, userDB, liveNewsDB)
  }
  const core = {
    server: serverSchema(activeConnection)
  }

  return {
    users: userDB,
    news: newsDB,
    campaigns: campaignDB,
    digimons: digimonDB,
    natures: natureDB,
    evolutions: evosDB,
    costumes: costumesDB,
    moves: movesDB,
    battles: battlesDB,
    liveNews: liveNewsDB,
    upgrades: {
      digivice: digiviceUpgradesDB
    },
    tamedDigimon: tamedDigimonDB,
    coliseum,
    equipments,
    gacha,
    rewards,
    events,
    core
  }
}
