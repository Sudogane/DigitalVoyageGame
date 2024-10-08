const mongoose = require('mongoose')
const { Mixed } = mongoose.Schema.Types
const { dbGet, dbSet } = require("../utils")

module.exports = function DIGIMON_DB (activeConnection) {
  
  const Digimon = new mongoose.Schema(
    {
      id: { type: Number, required: true, index: { unique: true } },
      species: String,
      sprite: String,
      description: String,
      form: String,
      attribute: String,
      family: String,
      element: String,
      
      stats: {
        health: Number,
        mana: Number,
        attack: Number,
        defense: Number,
        speed: Number
      },
      
      evolution: {
        evoType: Number,
        requirements: {
          sxp: { sExpType: String, amount: Number},
          level: Number,
          friendship: Number,
          tamerRank: Number,
          item: Number
        },
        
        from: Array,
        to: Array
      },
      
      canLearnMoves: Array,
      traits: Array
    }
  )
  
  const DIGIMON = activeConnection.model('Digimons', Digimon, 'digimons')
  
  DIGIMON.get = dbGet
  
  DIGIMON.new = async (digimon) => {
    const doesExist = await DIGIMON.findOne({id: digimon.did})
    const allDigimons = await DIGIMON.find({})
    
    if(doesExist) return
    
    const DGMN = new DIGIMON({
      id: allDigimons.length + 1,
      species: digimon.species,
      sprite: digimon.sprite,
      description: digimon.description,
      stats: {
        health: digimon.baseStats.health,
        mana: digimon.baseStats.mana,
        attack: digimon.baseStats.attack,
        defense: digimon.baseStats.defense,
        speed: digimon.baseStats.speed
      },
      
      form: digimon.form,
      attribute: digimon.attribute,
      family: digimon.family,
      element: digimon.element,
      
      canLearnMoves: digimon.moves,
      traits: digimon.traits
    })
    
    console.log(`[DIGIMON][NEW SPECIES] ${DGMN.form} - ${DGMN.species}`)
    
    DGMN.save()
  }

  return DIGIMON
}