const mongoose = require('mongoose')
const AutoIncrementFactory = require('mongoose-sequence')
const { Mixed } = mongoose.Schema.Types
const { dbGet, dbSet } = require("../../utils")
const { RNG } = require("../../../utils")

const WORLDBOSS_DB = (activeConnection, users, livenews) => {
  const leaderboardSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    totalDamage: { type: Number, default: 0 },
    timesFought: { type: Number, default: 0 }
  })

  const rewardSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    amount: { type: Number, required: true }
  })

  const enemySchema = new mongoose.Schema({
    id: { type: Number, required: true },
    sprite: { type: String, required: true }
  })

  const worldBossSchema = new mongoose.Schema({
    id: Number,
    leaderboard: [leaderboardSchema],
    possibleEnemies: [enemySchema],
    willOpenAt: { type: Date, required: true },
    willCloseAt: { type: Date, required: true },
    rewards: [rewardSchema],
    currentEnemy: enemySchema,
    attackMultiplier: { type: Number, default: 1.5 },
    difficulty: { type: "String", default: "Easy" },
    open: { type: Boolean, default: false }
  })
  
  const AutoIncrement = AutoIncrementFactory(activeConnection)
  worldBossSchema.plugin(AutoIncrement, {id:'WorldBoss', inc_field: 'id'})
  
  worldBossSchema.methods.setRandomEnemy = function setEnemy() {
    const enemies = this.possibleEnemies
    const randomEnemy = enemies[RNG(0, enemies.length - 1)]
    return this.constructor.updateOne({ id: this.id },{ $set: { "currentEnemy": randomEnemy } })
  }
  
  worldBossSchema.methods.updateUserOnLeaderboard = async function(id, totalDamage) {
    if (!this.open) return; // If the world boss is not open, return without doing anything.

    const userOnLeaderboard = this.leaderboard.find((user) => user.id === id);

    if (!userOnLeaderboard) {
      // If the user is not on the leaderboard, add them with initial data.
      await this.updateOne({
        $push: { leaderboard: { id, totalDamage, timesFought: 0 } }
      });
      return;
    }

    if (userOnLeaderboard.timesFought === 3) {
      // If the user has already fought 3 times, return without updating the leaderboard.
      return;
    }

    // Increment the totalDamage for the user.
    await this.updateOne(
      { $inc: { "leaderboard.$[elem].totalDamage": totalDamage } },
      { arrayFilters: [{ "elem.id": userOnLeaderboard.id }] }
    );
  };

  worldBossSchema.methods.disqualifyUser = function(id) {
    const userOnLeaderboard = this.leaderboard.find((user) => user.id === id)
    if (!userOnLeaderboard) return

    return this.updateOne(
      { $pull: { leaderboard: { id: userOnLeaderboard.id } } }
    )
  }
  
  worldBossSchema.methods.switchOpenState = async function(state) {
    state = (typeof state === "boolean") ? state : !this.open
    console.log(`[WORLDBOSS] Open state changed ${state}`)
    await this.updateOne({ $set: {"open": state } })
    
    if(state === false) {
      await this.sendRewards()
      await livenews.addNews({title: `<b class="text-green">Thanks Tamers, </b>`, content: `<b class="text-green">The barrier is safe now!</b>`})
      await livenews.addNews({title: `<b class="text-green">Thanks Tamers, </b>`, content: `<b class="text-green">The barrier is safe now!</b>`})
      await livenews.addNews({title: `<b class="text-green">Thanks Tamers, </b>`, content: `<b class="text-green">The barrier is safe now!</b>`})
      return
    } else {
      await livenews.addNews({title: `<b class="text-red">WARNING: </b>`, content: `<b class="text-red">A digimon is trying to break the barrier, help us!</b>`})
      await livenews.addNews({title: `<b class="text-red">WARNING: </b>`, content: `<b class="text-red">A digimon is trying to break the barrier, help us!</b>`})
      await livenews.addNews({title: `<b class="text-red">WARNING: </b>`, content: `<b class="text-red">A digimon is trying to break the barrier, help us!</b>`})
    }
  }
  
  worldBossSchema.methods.getSortedLeaderboard = function() {
    return this.leaderboard.sort((a, b) => b.totalDamage - a.totalDamage)
  }
  
  worldBossSchema.methods.sendRewards = async function() {
    const leaderboard = this.getSortedLeaderboard()
    const rewardAmounts = [28, 18, 15, 5]

    for (let i = 0; i < leaderboard.length; i++) {
      const competitor = await users.findOne({ id: leaderboard[i].id })
      const rewardAmount = i < 3 ? rewardAmounts[i] : rewardAmounts[3]
      console.log(`[WORLDBOSS] Sent ${rewardAmount} rewards to ${competitor.username}`)
      await competitor.updateOne({ $inc: { "modules.DATA": rewardAmount } })
    }
    
    await this.updateOne({ $set: { leaderboard: []}})
  }
  
  const WorldBoss = activeConnection.model('World Boss', worldBossSchema, 'World Boss')
  
  WorldBoss.get = dbGet
  WorldBoss.set = dbSet
  
  WorldBoss.new = async(data) => {
    const newSchema = new WorldBoss(data)
    return
    newSchema.save()
    console.log(`[Database] New WorldBoss registered: #${data.id} ${data.difficulty}`)
  }
  
  return WorldBoss
}

module.exports = WORLDBOSS_DB