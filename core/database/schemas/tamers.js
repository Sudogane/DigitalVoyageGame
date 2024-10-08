const mongoose = require('mongoose')
const AutoIncrementFactory = require('mongoose-sequence')
const { dbGet, dbSet } = require("../utils")

const { Mixed } = mongoose.Schema.Types

module.exports = function USER_DB (activeConnection) {
  const AI = AutoIncrementFactory(activeConnection);
  
  const UserSchema = new mongoose.Schema(
    {
      email: { type: String, required: true, index: { unique: true } },
      username: String,
      costume: String,
      avatarUrl: String,
      newAccount: { type: Number, default: 0 },
      lastUpdated: { type: Mixed },

      modules: {
        level: { type: Number, default: 1, index: true },
        exp: { type: Number, default: 0, min: 0, index: true },
        VIP: { type: Boolean, default: false },
        
        levels: {
          digivice: { type: Number, default: 1 }
        },
        stamina: {
          current: { type: Number, default: 100, min: 0 },
          max: { type: Number, default: 100, min: 0 },
          regenRate: { type: Number, default: 1, min: 0 },
          lastUpdated: { type: Date, default: Date.now() }
        },

        BITS: { type: Number, default: 500, min: 0, index: true },
        DATA: { type: Number, default: 0, min: 0, index: true },
        YEN: { type: Number, default: 0, min: 0, index: true },
        
        finishedCampaigns: Array,
        stagesCleared: Array,

        party: Array,
        digibank: Array,
        friends: Array,
        inventory: Array,
        battleInventory: {
          type: Array,
          default: [
            { itemType: "potion", pointType: "health", amount: 50, id: 0, name: "Healing Potion", icon: "https://ik.imagekit.io/projectvoyage/Items/Potions/basicPotion_rD8y0zcLK.png?updatedAt=1690664003505", description: "Heals your current digimon by 50 points", pointRestoreAmount: 50 }
          ]
        },
        scans: Object,
        
        capacities: {
          digibank: { type: Number, default: 10 },
          inventory: { type: Number, default: 10 },
          friends: { type: Number, default: 10 }
        },
        cooldowns: {
          boss: { type: Object, default: {} },
          daily: { type: Date, default: 0 }
        },
        
        daily: {
          streak: { type: Number, default: 0 },
          lost: { type: Number, default: 0}
        },
        
        // ------------------------------------------
        coliseumTickets: { type: Number, default: 15, min: 0 },
        autoPlayTickets: { type: Number, default: 10, min: 0 },
        
        gacha: {
          weapon: {
            pulls: {type: Number, default: 0},
            pity: {type: Number, default: 0},
            history: Array
          },
          digimon: {
            pulls: {type: Number, default: 0},
            pity: {type: Number, default: 0},
            history: Array
          }
        },
        
        events: {
         // Calumon's Daily Login Evento [2023]
          calumonDailyLogin: {
            cooldown: { type: Date, default: 0 },
            rewardsClaimed: { type: Number, default: 0 },
            digimonsScaredToday: { type: Number, default: 0 }
          }
        },
        
        ratelimits: {
          daily: { type: Boolean, default: false }
        },
        
        digitalBug: {
          active: { type: Boolean, default: false },
          claimedToday: { type: Boolean, default: false },
          daysLeft: { type: Number, default: 0 }
        },
        
        config: {
          volume: {
            master: { type: Number, default: 1 },
            music: { type: Number, default: 1 },
            effects: { type: Number, default: 1 }
          }
        }
      }
    },
    { strict: false }
  )
  
  UserSchema.plugin(AI, {inc_field: 'id'});
  
  UserSchema.pre(/^update/, function () {
    this.update({}, { $set: { lastUpdated: new Date() } })
  })
  
  UserSchema.methods.claimDigitalBug = function claimDigitalBug() {
    const digitalBug = this.modules.digitalBug
    if(digitalBug.claimedToday || digitalBug.daysLeft === 0) return
    
    return this.constructor.updateOne({ id: this.id }, {
      $set: {
        "modules.DATA": this.modules.DATA + 90,
        "modules.digitalBug.claimedToday": true,
        "modules.digitalBug.daysLeft": this.modules.digitalBug.daysLeft - 1
      }
    })
  }
  
  UserSchema.methods.activateDigitalBug = function claimDigitalBug() {
    const digitalBug = {
      claimedToday: true,
      daysLeft: 30,
      active: true,
    }
    
    return this.constructor.updateOne({ id: this.id }, {
      $set: {
        "modules.DATA": this.modules.DATA + 90,
        "modules.digitalBug": digitalBug
      }
    })
  }
  
  UserSchema.methods.addExp = function addExp(amount) {
    return this.constructor.updateOne({ id: this.id },{ $inc: { "modules.exp": amount } })
  }
  
  UserSchema.methods.spendStamina = function spendStamina(amount) {
    const { stamina } = this.modules;
    if(stamina.current < amount) return
    
    return this.constructor.updateOne({ id: this.id }, { $inc: { "modules.stamina.current": -amount }, $set: { "modules.stamina.lastUpdated": new Date() } })
  }
  
  UserSchema.methods.timeToNextStaminaRecharge = function() {
    const { stamina } = this.modules;
    if (stamina.current === stamina.max) return 'Stamina is already full!';
    const elapsedMilliseconds = new Date() - new Date(stamina.lastUpdated);
    const remainingMilliseconds = (3 * 60 * 1000) - (elapsedMilliseconds % (5 * 60 * 1000));
    return remainingMilliseconds;
  };

  UserSchema.methods.timeToFullStaminaRecharge = function() {
    const { stamina } = this.modules;
    if (stamina.current === stamina.max) return false;
    const pointsToRecharge = Math.ceil((stamina.max - stamina.current) / 5); // Adjusted to 5 stamina points per minute
    const remainingMilliseconds = pointsToRecharge * (3 * 60 * 1000); // Changed from 5 minutes to 3 minutes since it's 5 stamina points per minute
    return remainingMilliseconds;
  };


  const MODEL = activeConnection.model('UserDB', UserSchema, 'users')

  MODEL.new = userDATA => {
    if (!userDATA) return

    return new Promise(resolve => {
      MODEL.findOne({ email: userDATA.email }, (err, newUser) => {
        if (err) console.error(err)
        if (newUser) {
          return resolve(newUser)
        }
        const user = new MODEL({
          email: userDATA.email
        })
        user.save(err => {
          if (err) return console.error('USERSAVE ERROR')
          return resolve(user)
        })
      })
    })
  }
  
  
  
  const cron = require("node-cron");

  const regenerateStamina = async () => {
    const users = await MODEL.find({ $expr: { $gt: ["$modules.stamina.max", "$modules.stamina.current"] } }).lean();
    users.forEach(async (user) => {
      const { stamina } = user.modules;
      
      if (stamina.current < stamina.max) {
        const now = new Date();
        const elapsedTime = now - new Date(stamina.lastUpdated);
        const elapsedMinutes = elapsedTime / (1000 * 60);

        const pointsToAdd = Math.floor(elapsedMinutes) * 5
        if(pointsToAdd === 0) return
        const newStamina = Math.min(stamina.current + pointsToAdd, stamina.max);

        console.log(`[Stamina Regenerator]: ${user.username} ${stamina.current}/${stamina.max} -> ${newStamina}/${stamina.max}`);
        await MODEL.updateOne({ _id: user._id }, {
          $set: {
            'modules.stamina.current': newStamina,
            'modules.stamina.lastUpdated': now,
          },
        });
      }
    });
  };
  
    const resetCalu = async () => {
    await MODEL.updateMany({
      $set: {
        "modules.events.calumonDailyLogin.digimonsScaredToday": 0
      }
    })
  }

  regenerateStamina();
  cron.schedule('0 0 0 * * *', resetCalu);
  cron.schedule('*/3 * * * *', regenerateStamina);
  
  MODEL.get = dbGet
  MODEL.set = dbSet

  return MODEL
}
