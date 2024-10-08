const { Schema } = require('mongoose')
const { dbGet } = require("../../utils")
const AutoIncrementFactory = require('mongoose-sequence')

module.exports = function COLISEUM_OPPONENTS_DB (activeConnection) {
  const AutoIncrement = AutoIncrementFactory(activeConnection)
  
  const OpponentSchema = new Schema({
    id: Number,
    name: String,
    rank: String,
    dialogues: Object,
    sprite: String,
    digimons: Array,
    coliseumSprite: String,
    battleConfig: {
      partyLevel: Number,
      aiLevel: Number,
      statsMultiplier: Number,
      maxDigimonLevel: Number
    },
    tamerLevelRequired: {
      min: Number,
      max: Number
    },
    recommendedPower: Number,
    drops: {
      tamerExp: {
        min: Number,
        max: Number
      },
      
      autoPlayTickets: {
        min: Number,
        max: Number
      }
    }
  }, { strict: false })
  
  OpponentSchema.plugin(AutoIncrement, {id:'Coliseum_Opponents', inc_field: 'id'})
  OpponentSchema.methods.setRandomEnemy = async() => {
/*      let randomOpponent = [
        {
          coliseumSprite: "",
          party: [313],
          randomLevel: RNG(40, 60),
        }
      ]
      
      randomOpponent = randomOpponent[RNG(0, randomOpponent.length-1)]
*/
    
  }
  const Model = activeConnection.model("COLISEUM_Opponents", OpponentSchema, "COLISEUM_Opponents")
  
  Model.new = (data) => {
    Model.findOne({ name: data.name }).then((foundData) => {
      if(!foundData) {
        const newData = new Model(data)
        newData.save((err) => {
          if(err) console.log(err)
          return newData
        })
      }
      
      return foundData
    })
  }
  Model.get = dbGet
  
  Model.getOpponents = async(level) => {
    return await Model.find({"tamerLevelRequired.min": { $lte: level  }, "tamerLevelRequired.max": { $gte: level } }).lean()
  }
  
  
  Model.new({
    name: "Mameo",
    rank: "Normal",
    dialogues: {
      beforeEnteringBattle: "...",
      battleWin: "That was easy...",
      battleLoss: "..."
    },
    sprite: "https://ik.imagekit.io/projectvoyage/Costumes/Mameo_br-zXIMwS.gif?updatedAt=1682091175583",
    digimons: [25, 2, 2],
    battleConfig: {
      partyLevel: 15,
      aiLevel: 0,
      statsMultiplier: 2,
      maxDigimonLevel: 16
    },
    tamerLevelRequired: {
      min: 1,
      max: 2
    },
    drops: {
      tamerExp: {
        min: 10,
        max: 25
      }
    }
  })
  
  Model.new({
    name: "Tai",
    rank: "Bronze",
    dialogues: {
      beforeEnteringBattle: "...",
      battleWin: "That was easy...",
      battleLoss: "..."
    },
    sprite: "https://ik.imagekit.io/projectvoyage/Costumes/Tai__psjxxLLk.gif?updatedAt=1688730181997",
    digimons: [25, 86, 25],
    battleConfig: {
      partyLevel: 25,
      aiLevel: 0,
      statsMultiplier: 2,
      maxDigimonLevel: 26
    },
    tamerLevelRequired: {
      min: 3,
      max: 3
    },
    drops: {
      tamerExp: {
        min: 12,
        max: 28
      }
    }
  })
  
  Model.new({
    name: 'PAST',
    rank: "Gold",
    dialogues: {
      beforeEnteringBattle: "...Fight against your predecessors...",
      battleWin: "The past follows you",
      battleLoss: "Congratulations, mortal...."
    },
    sprite: "https://ik.imagekit.io/projectvoyage/Interface/portal_-dNagXd5a.gif?updatedAt=1691362622835",
    coliseumSprite: "https://media.discordapp.net/attachments/608771957881700385/1135678190862479360/Takato_Sprite_Animated.gif",
    digimons: [313],
    battleConfig: {
      partyLevel: 60,
      aiLevel: 0,
      statsMultiplier: 2.8,
      maxDigimonLevel: 60,
      minPartyPower: "2000+",
      extraStats: {health: 500, defense: 1450}
    },
    tamerLevelRequired: {
      min: 6,
      max: 10
    },
    drops: {
      tamerExp: {
        min: 15,
        max: 30
      }
    }
  })
  
  return Model
}