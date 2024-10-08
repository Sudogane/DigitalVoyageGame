const mongoose = require('mongoose')
const AutoIncrementFactory = require('mongoose-sequence')
const { Mixed } = mongoose.Schema.Types
const { dbGet, dbSet } = require("../utils")

const EQUIPMENT_DB = (activeConnection) => {
  const Schema = new mongoose.Schema({
    id: Number,
    rarity: Number,
    name: String,
    icon: String,
    mainStat: Number,
    subStat: {
      type: String,
      enum: ["attack", "defense", "health"],
    },
    statAmountIncrease: Number,
    statAmountIncreaseType: String,
    passive: Mixed
  })
  
  const AutoIncrement = AutoIncrementFactory(activeConnection)
  Schema.plugin(AutoIncrement, {id:'Equipments', inc_field: 'id'})
  
  const Equipment = activeConnection.model('Equipments', Schema, 'equipments')
  
  Equipment.get = dbGet
  Equipment.set = dbSet
  
  Equipment.new = async(data) => {
    const doesExist = await Equipment.findOne({ name: data.name, rarity: data.rarity })
    if(doesExist) return
    
    const newSchema = new Equipment(data)
    newSchema.save()
    console.log(`[Database] New Equipment Registered! ${newSchema.name} - ${newSchema.passive.description}`)
  }
  
  return Equipment
}

module.exports = EQUIPMENT_DB