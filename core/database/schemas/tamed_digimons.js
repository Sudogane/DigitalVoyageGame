const mongoose = require('mongoose')
const { Mixed } = mongoose.Schema.Types

module.exports = function DIGIMON_DB (activeConnection) {
  
  const Digimon = new mongoose.Schema(
    {
      id: { type: String, index: { unique: true } },
      power: Number,
      owner: {
        original: Number,
        current: Number
      }
    }, 
    { strict: false }
  )
  
  const DIGIMON = activeConnection.model('TAMED_Digimons', Digimon, 'Tamed_Digimons')
  
  DIGIMON.new = async (digimon) => {
    const doesExist = await DIGIMON.findOne({id: digimon._id})
    if(doesExist) return
    
    const digimonData = { ...digimon }
    digimonData.id = digimonData._id
    delete digimonData._id
    
    digimonData.power = Math.floor((digimonData.stats.health + digimonData.stats.additional.health + digimonData.stats.speed + digimonData.stats.additional.speed + digimonData.stats.attack + digimonData.stats.additional.attack + digimonData.stats.mana + digimonData.stats.additional.mana + digimonData.stats.defense + digimonData.stats.additional.defense) / 8.5)
    
    const DGMN = new DIGIMON(digimonData)

    
    DGMN.save()
  }
  
  DIGIMON.update = async(digimon) => {
    const isDigimonRegistered = await DIGIMON.findOne({ id: digimon._id })
    if(!isDigimonRegistered) return DIGIMON.new(digimon)
    
    const digimonData = { ...digimon }
    digimonData.id = digimonData._id
    delete digimonData._id
    
    digimonData.power = Math.floor((digimonData.stats.health + digimonData.stats.additional.health + digimonData.stats.speed + digimonData.stats.additional.speed + digimonData.stats.attack + digimonData.stats.additional.attack + digimonData.stats.mana + digimonData.stats.additional.mana + digimonData.stats.defense + digimonData.stats.additional.defense) / 8.5)
    
    await isDigimonRegistered.updateOne({ $set: { ...digimonData } })
  }

  return DIGIMON
}