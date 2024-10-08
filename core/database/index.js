const mongoose = require("mongoose")
const mons = require("../../digimons.js")

module.exports = async function ({ url, options }, extras) {
  return new Promise(async (resolve) => {
    console.info("• Connecting to Database...")

    const db = mongoose.createConnection(url, options, (err) => {
      if (err) return console.error(err, `• Failed to connect to Database!`)
      return console.log("• Connection OK")
    })

    const Schemas = require("./schemas.js")(db)
    db.on("error", console.error.bind(console, "• " + "DB connection error:"))
    db.once("open", async () => {
      console.log("• DB connection successful")
      Schemas.collections = Schemas.users.db.collections
      Schemas.raw = Schemas.users.db
      
      /*
      * Daily Configuration
      */
      const Daily = await Schemas.rewards.daily.findOne({ id: 0 })
      Daily.setMonthDays()
      if(Daily.rewards.length === 0) {
        let rewards = []
        for(let i=0; i< (Daily.monthDays || 30); i++) {
         rewards.push({ type: "economy", kind: "DATA", amount: 5, icon: "https://ik.imagekit.io/projectvoyage/Interface/Economy/icon_data_NOmq5vp1q.png?updatedAt=1682281009606", name: "Virtual Data" })
        }
        
        await Daily.updateOne({
          $set: {
            rewards
          }
        })
      }

      // Full 1.0 Campaign mode
      await Schemas.campaigns.new({
        id: "adventure",
        name: "Adventure",
        description: "Insert adventure description here!",
        mapImage:
          "https://cdn.glitch.global/f7f568cf-be3c-4b93-81f8-b9ec4596a310/image_2022-10-01_175001229.png?v=1664723381323",
        locations: [
          {
            id: "adv01_01",
            name: "Unwavering Forest",
            chapter: "Stranded? The Island of Adventure!",
            backdrop:
              "https://ik.imagekit.io/projectvoyage/Backdrops/gearSavanna_UNv0DFbJq.jpg",
            stages: [
              {
                id: "adv01_01_01",
                enemies: [
                  {
                    id: 135,
                    level: 1,
                    species: "Frimon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/Frimon_YdW5oc4Xu?ik-sdk-version=javascript-1.4.3&updatedAt=1668557277112",
                    extraStats: { health: -15, defense: -10 }
                  },
                ],
                drops: [
                  { type: "bits", min: 5, max: 10 },
                  { type: "xp", min: 15, max: 25 },
                ],
                sExpAmount: 15,
                enemyMultiplier: 1,
                initialStage: true,
                bossStage: false,
              },
              {
                id: "adv01_01_02",
                enemies: [
                  {
                    id: 136,
                    level: 1,
                    species: "Hopmon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/Hopmon_yQI8ewZR_?ik-sdk-version=javascript-1.4.3&updatedAt=1668557186837",
                    extraStats: { health: -15, defense: -10 }
                  },
                ],
                drops: [
                  { type: "bits", min: 6, max: 15 },
                  { type: "xp", min: 20, max: 25 },
                ],
                sExpAmount: 25,
                enemyMultiplier: 1,
                bossStage: false,
                clearPreviousToUnlock: true,
              },
              {
                id: "adv01_01_03",
                enemies: [
                  {
                    id: 137,
                    level: 1,
                    species: "Chapmon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/Chapmon_e_sdcbkWw.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1668568763985",
                    extraStats: { health: -15, defense: -10 }
                  },
                ],
                drops: [
                  { type: "bits", min: 6, max: 20 },
                  { type: "xp", min: 25, max: 30 },
                ],
                sExpAmount: 35,
                enemyMultiplier: 1,
                bossStage: false,
                clearPreviousToUnlock: true,
              },
              {
                id: "adv01_01_04",
                enemies: [
                  {
                    id: 77,
                    level: 2,
                    species: "Kunemon",
                    sprite:
                      "https://vignette.wikia.nocookie.net/digimon/images/6/62/Kunemon_vg.gif",
                    extraStats: { health: -15, defense: -10 }
                  },
                ],
                drops: [
                  { type: "bits", min: 6, max: 25 },
                  { type: "xp", min: 30, max: 40 },
                ],
                sExpAmount: 40,
                enemyMultiplier: 0.56,
                bossStage: false,
                clearPreviousToUnlock: true,
              },
              {
                id: "adv01_01_05",
                enemies: [
                  {
                    id: 101,
                    level: 2,
                    species: "Kuwagamon",
                    sprite:
                      "https://vignette.wikia.nocookie.net/digimon/images/9/9a/Kuwagamon_vg.gif",
                    extraStats: { health: 35, defense: -10 },
                  },
                ],
                drops: [
                  { type: "bits", min: 40, max: 55 },
                  { type: "xp", min: 100, max: 125 },
                  { type: "equipment", id: 1, min: 100, max: 100}
                ],
                sExpAmount: 125,
                enemyMultiplier: 0.446,
                bossStage: true,
                clearPreviousToUnlock: true,
              },
            ],
            location: { x: 455, y: 450 },
          },
          {
            id: "adv01_02",
            name: "Net Ocean",
            chapter: "Explosive Evolution! Greymon!",
            backdrop:
              "https://ik.imagekit.io/projectvoyage/Backdrops/dragonEyeLake_xoCiSmRih.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1667519740072",
            clearPreviousToUnlock: true,
            stages: [
              {
                id: "adv01_02_01",
                enemies: [
                  {
                    id: 58,
                    level: 3,
                    species: "Syakomon",
                    sprite:
                      "https://vignette.wikia.nocookie.net/digimon/images/b/b8/Syakomon_vg.gif",
                  },
                ],
                drops: [
                  { type: "bits", min: 5, max: 10 },
                  { type: "xp", min: 15, max: 30 },
                ],
                sExpAmount: 20,
                enemyMultiplier: 1,
                bossStage: false,
              },
              {
                id: "adv01_02_02",
                enemies: [
                  {
                    id: 62,
                    level: 3,
                    species: "Crabmon",
                    sprite:
                      "https://vignette.wikia.nocookie.net/digimon/images/9/90/Crabmon_vg.gif",
                  },
                ],
                drops: [
                  { type: "bits", min: 6, max: 15 },
                  { type: "xp", min: 15, max: 30 },
                ],
                sExpAmount: 20,
                enemyMultiplier: 1,
                clearPreviousToUnlock: true,
                bossStage: false,
              },
              {
                id: "adv01_02_03",
                enemies: [
                  {
                    id: 138,
                    level: 4,
                    species: "Swimmon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/Swimmon_w5RYX_WE0?ik-sdk-version=javascript-1.4.3&updatedAt=1668728965407",
                  },
                  {
                    id: 29,
                    level: 4,
                    species: "Betamon",
                    sprite:
                      "https://vignette.wikia.nocookie.net/digimon/images/e/e5/Betamon_vg.gif",
                  },
                ],
                drops: [
                  { type: "bits", min: 6, max: 20 },
                  { type: "xp", min: 20, max: 35 },
                ],
                sExpAmount: 25,
                enemyMultiplier: 1,
                clearPreviousToUnlock: true,
                bossStage: false,
              },
              {
                id: "adv01_02_04",
                enemies: [
                  {
                    id: 62,
                    level: 5,
                    species: "Crabmon",
                    sprite:
                      "https://vignette.wikia.nocookie.net/digimon/images/9/90/Crabmon_vg.gif",
                  },
                  {
                    id: 58,
                    level: 5,
                    species: "Syakomon",
                    sprite:
                      "https://vignette.wikia.nocookie.net/digimon/images/b/b8/Syakomon_vg.gif",
                  },
                ],
                drops: [
                  { type: "bits", min: 6, max: 25 },
                  { type: "xp", min: 20, max: 35 },
                ],
                sExpAmount: 25,
                enemyMultiplier: 1,
                clearPreviousToUnlock: true,
                bossStage: false,
              },
              {
                id: "adv01_02_05",
                enemies: [
                  {
                    id: 131,
                    level: 5,
                    species: "Shellmon",
                    sprite:
                      "https://static.wikia.nocookie.net/digimon/images/9/96/Shellmon_vg.gif",
                  },
                  {
                    id: 36,
                    level: 4,
                    species: "Otamamon",
                    sprite:
                      "https://vignette.wikia.nocookie.net/digimon/images/2/22/Otamamon_vg.gif",
                  },
                ],
                drops: [
                  { type: "bits", min: 45, max: 65 },
                  { type: "xp", min: 90, max: 100 },
                ],
                sExpAmount: 135,
                enemyMultiplier: 0.75,
                clearPreviousToUnlock: true,
                bossStage: true,
              },
            ],
            location: { x: 382, y: 496 },
          },
          {
            id: "adv01_03",
            name: "Dragon Eye Lake",
            chapter: "The Blue Wolf! Garurumon!",
            backdrop:
              "https://ik.imagekit.io/projectvoyage/Backdrops/dragonEyeLake_xoCiSmRih.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1667519740072",
            clearPreviousToUnlock: true,
            stages: [
              {
                id: "adv01_03_01",
                enemies: [
                  {
                    id: 138,
                    level: 5,
                    species: "Swimmon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/Swimmon_w5RYX_WE0?ik-sdk-version=javascript-1.4.3&updatedAt=1668728965407",
                  },
                ],
                drops: [
                  { type: "bits", min: 5, max: 10 },
                  { type: "xp", min: 10, max: 15 },
                ],
                sExpAmount: 35,
                enemyMultiplier: 1.1,
                bossStage: false,
              },
              {
                id: "adv01_03_02",
                enemies: [
                  {
                    id: 29,
                    level: 5,
                    species: "Betamon",
                    sprite:
                      "https://vignette.wikia.nocookie.net/digimon/images/e/e5/Betamon_vg.gif",
                  },
                  {
                    id: 36,
                    level: 4,
                    species: "Otamamon",
                    sprite:
                      "https://vignette.wikia.nocookie.net/digimon/images/2/22/Otamamon_vg.gif",
                  },
                ],
                drops: [
                  { type: "bits", min: 5, max: 15 },
                  { type: "xp", min: 25, max: 35 },
                ],
                sExpAmount: 50,
                enemyMultiplier: 1.1,
                clearPreviousToUnlock: true,
                bossStage: false,
              },
              {
                id: "adv01_03_03",
                enemies: [
                  {
                    id: 36,
                    level: 5,
                    species: "Otamamon",
                    sprite:
                      "https://vignette.wikia.nocookie.net/digimon/images/2/22/Otamamon_vg.gif",
                  },
                  {
                    id: 36,
                    level: 5,
                    species: "Otamamon",
                    sprite:
                      "https://vignette.wikia.nocookie.net/digimon/images/2/22/Otamamon_vg.gif",
                  },
                ],
                drops: [
                  { type: "bits", min: 6, max: 25 },
                  { type: "xp", min: 25, max: 35 },
                ],
                sExpAmount: 50,
                enemyMultiplier: 1.1,
                clearPreviousToUnlock: true,
                bossStage: false,
              },
              {
                id: "adv01_03_04",
                enemies: [
                  {
                    id: 64,
                    level: 6,
                    species: "Gizamon",
                    sprite:
                      "https://vignette.wikia.nocookie.net/digimon/images/a/af/Gizamon_vg.gif",
                  },
                  {
                    id: 138,
                    level: 5,
                    species: "Swimmon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/Swimmon_w5RYX_WE0?ik-sdk-version=javascript-1.4.3&updatedAt=1668728965407",
                  },
                  {
                    id: 36,
                    level: 5,
                    species: "Otamamon",
                    sprite:
                      "https://vignette.wikia.nocookie.net/digimon/images/2/22/Otamamon_vg.gif",
                  },
                ],
                drops: [
                  { type: "bits", min: 6, max: 25 },
                  { type: "xp", min: 35, max: 45 },
                ],
                sExpAmount: 75,
                enemyMultiplier: 1.1,
                clearPreviousToUnlock: true,
                bossStage: false,
              },
              {
                id: "adv01_03_05",
                enemies: [
                  {
                    id: 90,
                    level: 7,
                    species: "Seadramon",
                    sprite:
                      "https://vignette.wikia.nocookie.net/digimon/images/9/96/Seadramon_vg.gif",
                  },
                  {
                    id: 138,
                    level: 5,
                    species: "Swimmon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/Swimmon_w5RYX_WE0?ik-sdk-version=javascript-1.4.3&updatedAt=1668728965407",
                  },
                  {
                    id: 64,
                    level: 6,
                    species: "Gizamon",
                    sprite:
                      "https://vignette.wikia.nocookie.net/digimon/images/a/af/Gizamon_vg.gif",
                  },
                ],
                drops: [
                  { type: "bits", min: 50, max: 65 },
                  { type: "xp", min: 110, max: 125 },
                ],
                sExpAmount: 158,
                enemyMultiplier: 0.75,
                clearPreviousToUnlock: true,
                bossStage: true,
              },
            ],
            location: { x: 294, y: 400 },
          },
          {
            id: "adv01_04",
            name: "Pyocomon Village",
            chapter: "Burning Red! Birdramon!",
            backdrop:
              "https://ik.imagekit.io/projectvoyage/Backdrops/clcy_gxw7k9-sl.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1667595367649",
            clearPreviousToUnlock: true,
            stages: [
              {
                id: "adv01_04_01",
                enemies: [
                  {
                    id: 139,
                    level: 6,
                    species: "DemiMeramon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/DemiMeramon_yJSDfbpIH?ik-sdk-version=javascript-1.4.3&updatedAt=1668557244750",
                  },
                ],
                drops: [
                  { type: "bits", min: 10, max: 20 },
                  { type: "xp", min: 25, max: 35 },
                ],
                sExpAmount: 40,
                enemyMultiplier: 1.5,
                bossStage: false,
              },
              {
                id: "adv01_04_02",
                enemies: [
                  {
                    id: 140,
                    level: 7,
                    species: "Sunarizamon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/Sunarizamon_o2TI27S-8.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1668713617658",
                  },
                ],
                drops: [
                  { type: "bits", min: 10, max: 30 },
                  { type: "xp", min: 40, max: 50 },
                ],
                sExpAmount: 65,
                enemyMultiplier: 1.4,
                clearPreviousToUnlock: true,
                bossStage: false,
              },
              {
                id: "adv01_04_03",
                enemies: [
                  {
                    id: 141,
                    level: 8,
                    species: "Pomumon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/Pomumon_gN9oetMNx?ik-sdk-version=javascript-1.4.3&updatedAt=1668728822490",
                  },
                ],
                drops: [
                  { type: "bits", min: 10, max: 35 },
                  { type: "xp", min: 40, max: 50 },
                ],
                sExpAmount: 65,
                enemyMultiplier: 1.4,
                clearPreviousToUnlock: true,
                bossStage: false,
              },
              {
                id: "adv01_04_04",
                enemies: [
                  {
                    id: 134,
                    level: 8,
                    species: "Monochromon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/monochromon_KdCHSW_wS.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1667597137314",
                  },
                  {
                    id: 141,
                    level: 8,
                    species: "Pomumon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/Pomumon_gN9oetMNx?ik-sdk-version=javascript-1.4.3&updatedAt=1668728822490",
                  },
                ],
                drops: [
                  { type: "bits", min: 10, max: 35 },
                  { type: "xp", min: 45, max: 55 },
                ],
                sExpAmount: 85,
                enemyMultiplier: 1.4,
                clearPreviousToUnlock: true,
                bossStage: false,
              },
              {
                id: "adv01_04_05",
                enemies: [
                  {
                    id: 132,
                    level: 10,
                    species: "Meramon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/meramon_8NfQ12SPh.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1667594491288",
                  },
                  {
                    id: 139,
                    level: 6,
                    species: "DemiMeramon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/DemiMeramon_yJSDfbpIH?ik-sdk-version=javascript-1.4.3&updatedAt=1668557244750",
                  },
                  {
                    id: 80,
                    level: 8,
                    species: "Candlemon",
                    sprite:
                      "https://vignette.wikia.nocookie.net/digimon/images/0/08/Candlemon_vg.gif",
                  },
                ],
                drops: [
                  { type: "bits", min: 55, max: 70 },
                  { type: "xp", min: 100, max: 120 },
                ],
                sExpAmount: 179,
                enemyMultiplier: 1,
                clearPreviousToUnlock: true,
                bossStage: true,
              },
            ],
            location: { x: 567, y: 350 },
          },
          {
            id: "adv01_05",
            name: "Factorial Town",
            chapter: "Lightning Crash! Kabuterimon!",
            backdrop:
              "https://ik.imagekit.io/projectvoyage/Backdrops/factorial_town_OYdTpa_8s.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1670344866083",
            clearPreviousToUnlock: true,
            stages: [
              {
                id: "adv01_05_01",
                enemies: [
                  {
                    id: 41,
                    level: 9,
                    species: "Hagurumon",
                    sprite:
                      "https://vignette.wikia.nocookie.net/digimon/images/2/24/Hagurumon_vg.gif",
                  },
                ],
                drops: [
                  { type: "bits", min: 12, max: 24 },
                  { type: "xp", min: 35, max: 45 },
                ],
                sExpAmount: 69,
                enemyMultiplier: 1.6,
                bossStage: false,
              },
              {
                id: "adv01_05_02",
                enemies: [
                  {
                    id: 69,
                    level: 10,
                    species: "Pawnchessmon (Black)",
                    sprite:
                      "https://vignette.wikia.nocookie.net/digimon/images/9/94/PawnChessmon_%28Black%29_vg.gif",
                  },
                  {
                    id: 75,
                    level: 10,
                    species: "Pawnchessmon (White)",
                    sprite:
                      "https://vignette.wikia.nocookie.net/digimon/images/e/eb/PawnChessmon_%28White%29.gif",
                  },
                ],
                drops: [
                  {type: 'bits', min: 44, max: 74},
                  {type: 'xp', min: 64, max: 107},
                ],
                sExpAmount: 54,
                enemyMultiplier: 1.6,
                clearPreviousToUnlock: true,
                bossStage: false,
              },
              {
                id: "adv01_05_03",
                enemies: [
                  {
                    id: 107,
                    level: 10,
                    species: "Guardromon",
                    sprite:
                      "https://vignette.wikia.nocookie.net/digimon/images/c/cf/Guardromon_vg.gif",
                  },
                  {
                    id: 85,
                    level: 10,
                    species: "Mekanorimon",
                    sprite:
                      "https://vignette.wikia.nocookie.net/digimon/images/2/2c/Mekanorimon_vg.gif",
                  },
                ],
                drops: [
                  {type: 'bits', min: 54, max: 90},
                  {type: 'xp', min: 78, max: 131},
                ],
                sExpAmount: 65,
                enemyMultiplier: 1.6,
                clearPreviousToUnlock: true,
                bossStage: false,
              },
              {
                id: "adv01_05_04",
                enemies: [
                  {
                    id: 107,
                    level: 10,
                    species: "Guardromon",
                    sprite:
                      "https://vignette.wikia.nocookie.net/digimon/images/c/cf/Guardromon_vg.gif",
                  },
                  {
                    id: 81,
                    level: 10,
                    species: "KoKuwamon",
                    sprite:
                      "https://vignette.wikia.nocookie.net/digimon/images/6/64/Kokuwamon_vg.gif",
                  },
                  {
                    id: 107,
                    level: 10,
                    species: "Guardromon",
                    sprite:
                      "https://vignette.wikia.nocookie.net/digimon/images/c/cf/Guardromon_vg.gif",
                  },
                ],
                drops: [
                  {type: 'bits', min: 59, max: 99},
                  {type: 'xp', min: 87, max: 145},
                ],
                sExpAmount: 72,
                enemyMultiplier: 1.6,
                clearPreviousToUnlock: true,
                bossStage: false,
              },
              {
                id: "adv01_05_05",
                enemies: [
                  {
                    id: 142,
                    level: 15,
                    species: "Andromon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/Andromon_pkXg5InpC.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1670346861582",
                  },
                  {
                    id: 102,
                    level: 12,
                    species: "Raremon",
                    sprite:
                      "https://vignette.wikia.nocookie.net/digimon/images/a/a3/Raremon_vg.gif",
                  },
                  {
                    id: 143,
                    level: 12,
                    species: "Datamon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/Datamon_nM4idwN--.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1670347687582",
                  },
                ],
                drops: [
                  {type: 'bits', min: 99, max: 165},
                  {type: 'xp', min: 144, max: 240},
                ],
                sExpAmount: 200,
                enemyMultiplier: 1.8,
                clearPreviousToUnlock: true,
                bossStage: true,
              },
            ],
            location: { x: 120, y: 192 },
          },
          
          {
            id: "adv01_06",
            name: "Toy Town",
            chapter: "Palmon*s Raging Evolution!",
            backdrop:
              "https://ik.imagekit.io/projectvoyage/Backdrops/factorial_town_OYdTpa_8s.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1670344866083",
            clearPreviousToUnlock: true,
            stages: [
              {
                id: "adv01_06_01",
                enemies: [
                  {
                    id: 40,
                    level: 12,
                    species: "ToyAgumon",
                    sprite:
                      "https://vignette.wikia.nocookie.net/digimon/images/4/42/ToyAgumon_vg.gif",
                  },
                  {
                    id: 75,
                    level: 12,
                    species: "PawnChessmon (White)",
                    sprite:
                      "https://vignette.wikia.nocookie.net/digimon/images/e/eb/PawnChessmon_%28White%29.gif",
                  },
                  {
                    id: 40,
                    level: 12,
                    species: "ToyAgumon",
                    sprite:
                      "https://vignette.wikia.nocookie.net/digimon/images/4/42/ToyAgumon_vg.gif",
                  },
                ],
                drops: [
                  {type: 'bits', min: 72, max: 121},
                  {type: 'xp', min: 106, max: 177},
                ],
                sExpAmount: 88,
                enemyMultiplier: 1.6,
                bossStage: false,
              },
              {
                id: "adv01_06_02",
                enemies: [
                  {
                    id: 40,
                    level: 12,
                    species: "ToyAgumon",
                    sprite:
                      "https://vignette.wikia.nocookie.net/digimon/images/a/ae/Numemon_vg.gif",
                  },
                  {
                    id: 69,
                    level: 12,
                    species: "Pawnchessmon (Black)",
                    sprite:
                      "https://vignette.wikia.nocookie.net/digimon/images/9/94/PawnChessmon_%28Black%29_vg.gif",
                  },
                  {
                    id: 75,
                    level: 12,
                    species: "Pawnchessmon (White)",
                    sprite:
                      "https://vignette.wikia.nocookie.net/digimon/images/e/eb/PawnChessmon_%28White%29.gif",
                  },
                ],
                drops: [
                  {type: 'bits', min: 80, max: 134},
                  {type: 'xp', min: 117, max: 196},
                ],
                sExpAmount: 97,
                enemyMultiplier: 1.6,
                clearPreviousToUnlock: true,
                bossStage: false,
              },
              {
                id: "adv01_06_03",
                enemies: [
                  {
                    id: 91,
                    level: 14,
                    species: "Numemon",
                    sprite:
                      "https://vignette.wikia.nocookie.net/digimon/images/a/ae/Numemon_vg.gif",
                  },
                  {
                    id: 78,
                    level: 14,
                    species: "Mushroomon",
                    sprite:
                      "https://vignette.wikia.nocookie.net/digimon/images/c/c2/Mushroomon_vg.gif",
                  },
                ],
                drops: [
                  {type: 'bits', min: 88, max: 148},
                  {type: 'xp', min: 129, max: 216},
                ],
                sExpAmount: 108,
                enemyMultiplier: 1.6,
                clearPreviousToUnlock: true,
                bossStage: false,
              },
              {
                id: "adv01_06_04",
                enemies: [
                  {
                    id: 145,
                    level: 15,
                    species: "KyodaiNumemon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/KyodaiNumemon_HzkoT9ycb.gif?updatedAt=1679412049323",
                  },
                  {
                    id: 91,
                    level: 14,
                    species: "Numemon",
                    sprite:
                      "https://vignette.wikia.nocookie.net/digimon/images/a/ae/Numemon_vg.gif",
                  },
                  {
                    id: 91,
                    level: 14,
                    species: "Numemon",
                    sprite:
                      "https://vignette.wikia.nocookie.net/digimon/images/a/ae/Numemon_vg.gif",
                  },
                ],
                drops: [
                  {type: 'bits', min: 98, max: 164},
                  {type: 'xp', min: 143, max: 239},
                ],
                sExpAmount: 119,
                enemyMultiplier: 1.78,
                clearPreviousToUnlock: true,
                bossStage: false,
              },
              {
                id: "adv01_06_05",
                enemies: [
                  {
                    id: 144,
                    level: 15,
                    species: "Monzaemon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/Monzaemon_9tYuIhQtz.gif?updatedAt=1679269256004",
                  },
                  {
                    id: 40,
                    level: 15,
                    species: "ToyAgumon",
                    sprite:
                      "https://vignette.wikia.nocookie.net/digimon/images/4/42/ToyAgumon_vg.gif",
                  },
                  {
                    id: 146,
                    level: 15,
                    species: "EXTyrannomon",
                    sprite:
                    "https://ik.imagekit.io/projectvoyage/Digimons/ExTyrannomon_REM_ujkMN.gif?updatedAt=1679415781848",
                  },
                ],
                drops: [
                  {type: 'bits', min: 162, max: 272},
                  {type: 'xp', min: 237, max: 396},
                ],
                sExpAmount: 330,
                enemyMultiplier: 2,
                clearPreviousToUnlock: true,
                bossStage: true,
              },
            ],
            location: { x: 220, y: 152 },
          },
          
          {
            id: "adv01_07",
            name: "Freezeland",
            chapter: "Onwards! Leave the Snowy Fields!",
            backdrop:
              "https://ik.imagekit.io/projectvoyage/Backdrops/factorial_town_OYdTpa_8s.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1670344866083",
            clearPreviousToUnlock: true,
            stages: [
              {
                id: "adv01_07_01",
                enemies: [
                  {
                    id: 52,
                    level: 25,
                    species: "Penguinmon",
                    sprite:
                      "https://vignette.wikia.nocookie.net/digimon/images/3/36/Penguinmon_vg.gif",
                  },
                  {
                    id: 57,
                    level: 26,
                    species: "SnowGoburimon",
                    sprite:
                      "https://vignette.wikia.nocookie.net/digimon/images/9/9c/SnowGoburimon_vg.gif",
                  },
                  {
                    id: 52,
                    level: 25,
                    species: "Penguinmon",
                    sprite:
                      "https://vignette.wikia.nocookie.net/digimon/images/3/36/Penguinmon_vg.gif",
                  },
                ],
                drops: [
                  {type: 'bits', min: 120, max: 200},
                  {type: 'xp', min: 175, max: 292},
                ],
                sExpAmount: 145,
                enemyMultiplier: 1.76,
                bossStage: false,
              },
              {
                id: "adv01_07_02",
                enemies: [
                  {
                    id: 152,
                    level: 26,
                    species: "Icemon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/Icemon_kstH1s0Kq4.gif",
                  },
                  {
                    id: 197,
                    level: 26,
                    species: "Mojyamon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/Mojyamon_nXpyJyC1b.gif",
                  },
                  {
                    id: 152,
                    level: 26,
                    species: "Icemon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/Icemon_kstH1s0Kq4.gif",
                  },
                ],
                drops: [
                  {type: 'bits', min: 132, max: 221},
                  {type: 'xp', min: 193, max: 322}
                ],
                sExpAmount: 161,
                enemyMultiplier: 1.78,
                clearPreviousToUnlock: true,
                bossStage: false,
              },
              {
                id: "adv01_07_03",
                enemies: [
                  {
                    id: 176,
                    level: 28,
                    species: "Hyogamon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/Hyogamon_LvphBqgT_.gif",
                  },
                  {
                    id: 150,
                    level: 30,
                    species: "Ikakumon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/Ikkakumon_uE8fKtOfb.gif",
                  },
                  {
                    id: 152,
                    level: 28,
                    species: "Icemon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/Icemon_kstH1s0Kq4.gif",
                  },
                ],
                drops: [
                  {type: 'bits', min: 146, max: 244},
                  {type: 'xp', min: 213, max: 356},
                ],
                sExpAmount: 178,
                enemyMultiplier: 1.78,
                clearPreviousToUnlock: true,
                bossStage: false,
              },
              {
                id: "adv01_07_04",
                enemies: [
                  {
                    id: 197,
                    level: 30,
                    species: "Mojyamon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/Mojyamon_nXpyJyC1b.gif",
                  },
                  {
                    id: 176,
                    level: 30,
                    species: "Hyogamon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/Hyogamon_LvphBqgT_.gif",
                  },
                  {
                    id: 152,
                    level: 30,
                    species: "Icemon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/Icemon_kstH1s0Kq4.gif",
                  },
                ],
                drops: [
                  {type: 'bits', min: 162, max: 270},
                  {type: 'xp', min: 235, max: 393},
                ],
                sExpAmount: 196,
                enemyMultiplier: 1.80,
                clearPreviousToUnlock: true,
                bossStage: false,
              },
              {
                id: "adv01_07_05",
                enemies: [
                  {
                    id: 174,
                    level: 35,
                    species: "Frigimon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/Frigimon_sGIZHw-bA.gif",
                  },
                  {
                    id: 176,
                    level: 30,
                    species: "Hyogamon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/Hyogamon_LvphBqgT_.gif",
                  },
                  {
                    id: 176,
                    level: 30,
                    species: "Hyogamon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/Hyogamon_LvphBqgT_.gif",
                  },
                ],
                drops: [
                  { type: "bits", min: 268, max: 448 },
                  {type: 'xp', min: 391, max: 653},
                ],
                sExpAmount: 543,
                enemyMultiplier: 2.2,
                clearPreviousToUnlock: true,
                bossStage: true,
              },
            ],
            location: { x: 440, y: 16 },
          },
          
          {
            id: "adv01_08",
            name: "Infinity Mountain",
            chapter: "Howling Roar! Ikkakumon!",
            backdrop:
              "https://ik.imagekit.io/projectvoyage/Backdrops/factorial_town_OYdTpa_8s.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1670344866083",
            clearPreviousToUnlock: true,
            stages: [
              {
                id: "adv01_08_01",
                enemies: [
                  {
                    id: 134,
                    level: 40,
                    species: "Monochromon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/monochromon_KdCHSW_wS.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1667597137314",
                  },
                  {
                    id: 96,
                    level: 40,
                    species: "Ogremon",
                    sprite:
                      "https://vignette.wikia.nocookie.net/digimon/images/6/6c/Ogremon_vg.gif",
                  },
                  {
                    id: 134,
                    level: 40,
                    species: "Monochromon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/monochromon_KdCHSW_wS.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1667597137314",
                  },
                ],
                drops: [
                  {type: 'bits', min: 198, max: 330},
                  {type: 'xp', min: 288, max: 480},
                ],
                sExpAmount: 240,
                enemyMultiplier: 2,
                bossStage: false,
              },
              {
                id: "adv01_08_02",
                enemies: [
                  {
                    id: 163,
                    level: 45,
                    species: "Drimogemon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/Drimogemon_sf4BkyYSy.gif",
                  },
                  {
                    id: 164,
                    level: 45,
                    species: "NiseDrimogemon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/NiseDrimogemon_iyFJmSgbt.gif",
                  },
                  {
                    id: 163,
                    level: 45,
                    species: "Drimogemon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/Drimogemon_sf4BkyYSy.gif",
                  },
                ],
                drops: [
                  {type: 'bits', min: 218, max: 364},
                  {type: 'xp', min: 318, max: 531},
                ],
                sExpAmount: 265,
                clearPreviousToUnlock: true,
                enemyMultiplier: 2,
                bossStage: false,
              },
              {
                id: "adv01_08_03",
                enemies: [
                  {
                    id: 167,
                    level: 50,
                    species: "Fugamon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/Fugamon_2PbaOW3HC.gif",
                  },
                  {
                    id: 181,
                    level: 50,
                    species: "Woodmon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/Woodmon__WLGAiE609.gif",
                  },
                  {
                    id: 169,
                    level: 50,
                    species: "Tortamon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/Tortamon_Ud_IA7v5I.gif",
                  },
                ],
                drops: [
                  {type: 'bits', min: 241, max: 402},
                  {type: 'xp', min: 352, max: 587},
                ],
                sExpAmount: 293,
                enemyMultiplier: 2,
                clearPreviousToUnlock: true,
                bossStage: false,
              },
              {
                id: "adv01_08_04",
                enemies: [
                  {
                    id: 164,
                    level: 50,
                    species: "NiseDrimogemon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/NiseDrimogemon_iyFJmSgbt.gif",
                  },
                  {
                    id: 200,
                    level: 50,
                    species: "Centarumon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/Centarumon_4WVv12btE.gif",
                  },
                  {
                    id: 134,
                    level: 50,
                    species: "Monochromon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/monochromon_KdCHSW_wS.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1667597137314",
                  },
                ],
                drops: [
                  {type: 'bits', min: 267, max: 445},
                  {type: 'xp', min: 388, max: 648}
                ],
                sExpAmount: 324,
                enemyMultiplier: 2,
                clearPreviousToUnlock: true,
                bossStage: false,
              },
              {
                id: "adv01_08_05",
                enemies: [
                  {
                    id: 129,
                    level: 55,
                    species: "Unimon",
                    sprite:
                      "https://vignette.wikia.nocookie.net/digimon/images/a/a2/Unimon_vg.gif",
                    extraStats: { health: 100, attack: 50, defense: 50 },
                  },
                  {
                    id: 200,
                    level: 55,
                    species: "Centarumon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/Centarumon_4WVv12btE.gif",
                  },
                  {
                    id: 200,
                    level: 55,
                    species: "Centarumon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/Centarumon_4WVv12btE.gif",
                  },
                ],
                drops: [
                  {"type": "bits", "min": 441, "max": 737 },
                  { "type": "xp","min": 644, "max": 1074 }
                ],
                sExpAmount: 896,
                enemyMultiplier: 2.4,
                clearPreviousToUnlock: true,
                bossStage: true,
              },
            ],
            location: { x: 369, y: 32 },
          },
          
          {
            id: "adv01_09",
            name: "Infinity Mountain",
            chapter: "Emissary of Darkness, Devimon!",
            backdrop:
              "https://ik.imagekit.io/projectvoyage/Backdrops/factorial_town_OYdTpa_8s.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1670344866083",
            clearPreviousToUnlock: true,
            stages: [
              {
                id: "adv01_09_01",
                enemies: [
                  {
                    id: 167,
                    level: 50,
                    species: "Fugamon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/Fugamon_2PbaOW3HC.gif",
                  },
                  {
                    id: 134,
                    level: 40,
                    species: "Monochromon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/monochromon_KdCHSW_wS.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1667597137314",
                  },
                  {
                    id: 101,
                    level: 40,
                    species: "Kuwagamon",
                    sprite: "https://vignette.wikia.nocookie.net/digimon/images/9/9a/Kuwagamon_vg.gif"
                  },
                ],
                drops: [
                  {type: 'bits', min: 198, max: 330},
                  {type: 'xp', min: 288, max: 480},
                ],
                sExpAmount: 240,
                enemyMultiplier: 2,
                bossStage: false,
              },
              {
                id: "adv01_09_02",
                enemies: [
                  {
                    id: 134,
                    level: 40,
                    species: "Monochromon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/monochromon_KdCHSW_wS.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1667597137314",
                  },
                  {
                    id: 284,
                    level: 50,
                    species: "Vermilimon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/Vermilimon_0uBSzMF6X.gif",
                  },
                  {
                    id: 134,
                    level: 40,
                    species: "Monochromon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/monochromon_KdCHSW_wS.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1667597137314",
                  },
                ],
                drops: [
                  {type: 'bits', min: 218, max: 364},
                  {type: 'xp', min: 318, max: 531},
                ],
                sExpAmount: 265,
                enemyMultiplier: 2,
                bossStage: false,
              },
              {
                id: "adv01_09_03",
                enemies: [
                  {
                    id: 284,
                    level: 50,
                    species: "Vermilimon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/Vermilimon_0uBSzMF6X.gif",
                  },
                  {
                    id: 181,
                    level: 50,
                    species: "Woodmon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/Woodmon__WLGAiE609.gif",
                  },
                  {
                    id: 284,
                    level: 50,
                    species: "Vermilimon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/Vermilimon_0uBSzMF6X.gif",
                  }
                ],
                drops: [
                  {type: 'bits', min: 241, max: 402},
                  {type: 'xp', min: 352, max: 587},
                ],
                sExpAmount: 293,
                enemyMultiplier: 2,
                clearPreviousToUnlock: true,
                bossStage: false,
              },
              {
                id: "adv01_09_04",
                enemies: [
                  {
                    id: 169,
                    level: 50,
                    species: "Tortamon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/Tortamon_Ud_IA7v5I.gif",
                  },
                  {
                    id: 200,
                    level: 50,
                    species: "Centarumon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/Centarumon_4WVv12btE.gif",
                  },
                  {
                    id: 101,
                    level: 40,
                    species: "Kuwagamon",
                    sprite: "https://vignette.wikia.nocookie.net/digimon/images/9/9a/Kuwagamon_vg.gif"
                  },
                ],
                drops: [
                  {type: 'bits', min: 267, max: 445},
                  {type: 'xp', min: 388, max: 648}
                ],
                sExpAmount: 324,
                enemyMultiplier: 2,
                clearPreviousToUnlock: true,
                bossStage: false,
              },
              {
                id: "adv01_09_05",
                enemies: [
                  {
                    id: 100,
                    level: 55,
                    species: "Leomon",
                    sprite:
                      "https://vignette.wikia.nocookie.net/digimon/images/0/0e/Leomon_vg.gif",
                    extraStats: { health: 100, attack: 50, defense: 50 },
                  },
                  {
                    id: 96,
                    level: 55,
                    species: "Ogremon",
                    sprite:
                      "https://vignette.wikia.nocookie.net/digimon/images/6/6c/Ogremon_vg.gif",
                  },
                  {
                    id: 96,
                    level: 55,
                    species: "Ogremon",
                    sprite:
                      "https://vignette.wikia.nocookie.net/digimon/images/6/6c/Ogremon_vg.gif",
                  },
                ],
                drops: [
                  {"type": "bits", "min": 441, "max": 737 },
                  { "type": "xp","min": 644, "max": 1074 }
                ],
                sExpAmount: 896,
                enemyMultiplier: 2.4,
                clearPreviousToUnlock: true,
                bossStage: true,
              },
            ],
            location: { x: 346, y: -64 },
          },
          
          {
            id: "adv01_10",
            name: "Infinity Mountain",
            chapter: "The Mysterious Mansion",
            backdrop:
              "https://ik.imagekit.io/projectvoyage/Backdrops/factorial_town_OYdTpa_8s.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1670344866083",
            clearPreviousToUnlock: true,
            stages: [
              {
                id: "adv01_10_01",
                enemies: [
                  {
                    id: 167,
                    level: 50,
                    species: "Fugamon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/Fugamon_2PbaOW3HC.gif",
                  },
                  {
                    id: 134,
                    level: 40,
                    species: "Monochromon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/monochromon_KdCHSW_wS.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1667597137314",
                  },
                  {
                    id: 101,
                    level: 40,
                    species: "Kuwagamon",
                    sprite: "https://vignette.wikia.nocookie.net/digimon/images/9/9a/Kuwagamon_vg.gif"
                  },
                ],
                drops: [
                  {type: 'bits', min: 198, max: 330},
                  {type: 'xp', min: 288, max: 480},
                ],
                sExpAmount: 240,
                enemyMultiplier: 2,
                bossStage: false,
              },
              {
                id: "adv01_10_02",
                enemies: [
                  {
                    id: 134,
                    level: 40,
                    species: "Monochromon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/monochromon_KdCHSW_wS.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1667597137314",
                  },
                  {
                    id: 284,
                    level: 50,
                    species: "Vermilimon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/Vermilimon_0uBSzMF6X.gif",
                  },
                  {
                    id: 134,
                    level: 40,
                    species: "Monochromon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/monochromon_KdCHSW_wS.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1667597137314",
                  },
                ],
                drops: [
                  {type: 'bits', min: 218, max: 364},
                  {type: 'xp', min: 318, max: 531},
                ],
                sExpAmount: 265,
                enemyMultiplier: 2,
                bossStage: false,
              },
              {
                id: "adv01_10_03",
                enemies: [
                  {
                    id: 284,
                    level: 50,
                    species: "Vermilimon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/Vermilimon_0uBSzMF6X.gif",
                  },
                  {
                    id: 181,
                    level: 50,
                    species: "Woodmon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/Woodmon__WLGAiE609.gif",
                  },
                  {
                    id: 284,
                    level: 50,
                    species: "Vermilimon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/Vermilimon_0uBSzMF6X.gif",
                  }
                ],
                drops: [
                  {type: 'bits', min: 241, max: 402},
                  {type: 'xp', min: 352, max: 587},
                ],
                sExpAmount: 293,
                enemyMultiplier: 2,
                clearPreviousToUnlock: true,
                bossStage: false,
              },
              {
                id: "adv01_10_04",
                enemies: [
                  {
                    id: 169,
                    level: 50,
                    species: "Tortamon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/Tortamon_Ud_IA7v5I.gif",
                  },
                  {
                    id: 200,
                    level: 50,
                    species: "Centarumon",
                    sprite:
                      "https://ik.imagekit.io/projectvoyage/Digimons/Centarumon_4WVv12btE.gif",
                  },
                  {
                    id: 101,
                    level: 40,
                    species: "Kuwagamon",
                    sprite: "https://vignette.wikia.nocookie.net/digimon/images/9/9a/Kuwagamon_vg.gif"
                  },
                ],
                drops: [
                  {type: 'bits', min: 267, max: 445},
                  {type: 'xp', min: 388, max: 648}
                ],
                sExpAmount: 324,
                enemyMultiplier: 2,
                clearPreviousToUnlock: true,
                bossStage: false,
              },
              {
                id: "adv01_10_05",
                enemies: [
                  {
                    id: 100,
                    level: 55,
                    species: "Leomon",
                    sprite:
                      "https://vignette.wikia.nocookie.net/digimon/images/0/0e/Leomon_vg.gif",
                    extraStats: { health: 100, attack: 50, defense: 50 },
                  },
                  {
                    id: 96,
                    level: 55,
                    species: "Ogremon",
                    sprite:
                      "https://vignette.wikia.nocookie.net/digimon/images/6/6c/Ogremon_vg.gif",
                  },
                  {
                    id: 96,
                    level: 55,
                    species: "Ogremon",
                    sprite:
                      "https://vignette.wikia.nocookie.net/digimon/images/6/6c/Ogremon_vg.gif",
                  },
                ],
                drops: [
                  {"type": "bits", "min": 441, "max": 737 },
                  { "type": "xp","min": 644, "max": 1074 }
                ],
                sExpAmount: 896,
                enemyMultiplier: 2.4,
                clearPreviousToUnlock: true,
                bossStage: true,
              },
            ],
            location: { x: 346, y: -64 },
          }
        ],
      })
      
      return resolve(Schemas)
    })
  })
}