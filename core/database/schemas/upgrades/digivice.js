const mongoose = require('mongoose')
const { Mixed } = mongoose.Schema.Types

module.exports = function DIGIVICELEVELS_DB (activeConnection) {
  const digiviceLevelSchema = new mongoose.Schema({
    id: { type: Number, default: 1, unique: true },
    icon: String,
    minScan: { type: Number, default: 4 },
    maxScan: { type: Number, default: 10 },
    scanCost: { type: Number, default: 5},
    requirementsToUpgrade: Object,
  })
  
  const digiviceLevelModel = activeConnection.model('UPGRADES_Digivice', digiviceLevelSchema, 'UPGRADES_Digivice')
  
  digiviceLevelModel.new = data => {
    return new Promise(resolve => {
      digiviceLevelModel.findOne({ id: digiviceLevelModel.id }, (err, doesDataExist) => {
        if (err) console.error(err)
        if(doesDataExist) return resolve(doesDataExist)
        
        const newLevel = new digiviceLevelModel({...data})
        newLevel.save(err => {
          if (err) return console.error('DIGIVICE UPGRADE CREATE ERROR')
          return resolve(newLevel)
        })
      })
    })
  }
  
  return digiviceLevelModel
}