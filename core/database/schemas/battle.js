const mongoose = require('mongoose')
const { Mixed } = mongoose.Schema.Types

module.exports = function BATTLE_DB (activeConnection) {
  
  const Battle = new mongoose.Schema(
    {
      tamer: { type: Number, required: true, index: { unique: true } },
      data: { type: Mixed }
    }
  )
  
  const BATTLE = activeConnection.model('Battles', Battle, 'battles')
  
  BATTLE.new = async (user, data) => {
    return new Promise(resolve => {
      BATTLE.findOne({ tamer: user.email }, (err, newBattle) => {
        if (err) console.error(err)
        if (newBattle) {
          return resolve(newBattle)
        }
        
        const battle = new BATTLE({
          tamer: user,
          data: {...data}
        })

        battle.save(err => {
          if (err) return console.error('BATTLCREATE ERROR')
          return resolve(battle)
        })
        
      })
    })
  }

  return BATTLE
}