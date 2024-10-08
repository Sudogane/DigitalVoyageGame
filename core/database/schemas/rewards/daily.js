const mongoose = require('mongoose')
const { dbGet, dbSet } = require("../../utils")

const Daily = (activeConnection) => {
  const dailySchema = new mongoose.Schema({
    id: { type: Number, default: 0 },
    monthDays: {type: Number, default: 30},
    rewards: Array
  })
  
  dailySchema.methods.addToPool = function addToPool(items) {
    return this.constructor.updateOne({ id: this.id }, {
      $addToSet: {
        pool: {
          $each: items
        }
      }
    })
  }
  
  dailySchema.methods.setMonthDays = function monthDays() {
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()
    const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    
    this.constructor.updateOne({ id: this.id }, {
      $set: {
        monthDays: totalDaysInMonth
      }
    })
    
    return console.log(`[DAILY] Month days updated`)
  }
  
  const dailyModel = activeConnection.model("Daily Rewards", dailySchema, "rewards_daily")
  
  dailyModel.get = dbGet
  dailyModel.set = dbSet
  
  return dailyModel
}

module.exports = Daily
