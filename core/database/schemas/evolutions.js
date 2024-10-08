const mongoose = require('mongoose')

module.exports = function EVOLINES_DB (activeConnection) {
  const Line = new mongoose.Schema(
    {
      id: { type: Number, required: true, index: { unique: true } },
      sXpType: String,
      sXpAmount: Number,
      minLevel: Number,
      from: { type: Array, default: []},
      to: { type: Array, default: []}
    }
  )
  
  const LINE = activeConnection.model('Evolutions', Line, 'evolutions')
  
  LINE.new = async (evoLine) => {
    const doesExist = await LINE.findOne({id: evoLine.id })
    if(doesExist) return
    
    const EVOLINE = new LINE(evoLine)
    
    console.log(`[New Evolution Line] ${EVOLINE.id}`)
    
    EVOLINE.save()
    return EVOLINE
  }

  return LINE
}