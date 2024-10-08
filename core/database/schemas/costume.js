const mongoose = require('mongoose')
const { Mixed } = mongoose.Schema.Types

module.exports = function COSTUME_DB (activeConnection) {
  
  const Costume = new mongoose.Schema(
    {
      id: { type: String, required: true, index: { unique: true } },
      name: String,
      description: String,
      rarity: String,
      costumeUrl: String,
      avatarUrl: String
    }
  )
  
  const COSTUME = activeConnection.model('Costumes', Costume, 'costumes')
  
  COSTUME.new = async (data) => {
    const {id, name, description, rarity, costumeUrl, avatarUrl } = data
    const EXISTS = await COSTUME.findOne({ id });
    
    if(EXISTS) return
    
    let costume = new COSTUME({
      id,
      name,
      description,
      rarity,
      costumeUrl,
      avatarUrl
    })
    
    costume.save()
  }

  return COSTUME
}