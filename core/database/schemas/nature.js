/*****

Durable - Inc 5 hp per lvl
Fighter - Inc 2 atk per level
Defender - inc 2 def per level
Brainy - inc 2 mp per level
Nimble - inc 2 speed per level

NatureSchema: {
id: 1
name: "name"
natureType: "increasePerLevel"
stats: {
  increase: {klk}
}
}

*****/

const mongoose = require('mongoose')
const { Mixed } = mongoose.Schema.Types

module.exports = function NATURE_DB (activeConnection) {
  
  const Nature = new mongoose.Schema(
    {
      id: { type: Number, required: true, index: { unique: true } },
      name: String,
      natureType: String, // increasePerLevel +1, adjustPerLevel +1 -1, modifyPerLevel +1 -2 (?)
      stats: {
        inc: Object,
        dec: Object
      }
    }
  )
  
  const NATURE = activeConnection.model("Natures", Nature, 'natures')
  
  NATURE.new = async(nature) => {
    const doesExist = await NATURE.findOne({ id: nature.id })
    if(doesExist) return
    
    const newNature = new NATURE({...nature})
    newNature.save()
  }
  
  return NATURE
}