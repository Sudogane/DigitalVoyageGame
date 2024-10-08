const mongoose = require('mongoose')
const { Mixed } = mongoose.Schema.Types

module.exports = function MOVE_DB (activeConnection) {
  
  const Move = new mongoose.Schema(
    {
      id: { type: Number, required: true, index: { unique: true } },
      name: String,
      description: String,
      moveType: String, // Physical, Magical, buffer, healer
      element: String,
      areaEffect: Number, // 00x00
      mpCost: Number,
      effect: Number
    }
  )
  
  const MOVE = activeConnection.model("Moves", Move, 'moves')
  
  MOVE.new = async(data) => {
    const doesExist = await MOVE.findOne({ id: data.id })
    if(doesExist) return
    
    const DATA = new MOVE({...data})
    DATA.save()
  }
  
  return MOVE
}