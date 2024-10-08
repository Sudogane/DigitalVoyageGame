const mongoose = require('mongoose')
const AutoIncrementFactory = require('mongoose-sequence')
const { dbGet, dbSet } = require("../../utils")

const GachaBannerDB = (activeConnection) => {
  const GachaBannerSchema = new mongoose.Schema({
    id: {
      type: Number,
      unique: true
    },
    name: String,
    type: {
      type: String,
      enum: ['Weapon', 'Digimon']
    },
    pool: [Object],
    active: { type: Boolean, default: false },
    startDate: Date,
    timeout: Date,
    maxPity: Number,
    maxPullCount: Number
  })
  
  const AutoIncrement = AutoIncrementFactory(activeConnection)
  GachaBannerSchema.plugin(AutoIncrement, { id: 'Gacha_Banner', inc_field: 'id' })
  
  GachaBannerSchema.methods.addToPool = function addToPool(items) {
    return this.constructor.updateOne({ id: this.id }, {
      $addToSet: {
        pool: {
          $each: items
        }
      }
    })
  }
  
  const GachaBannerModel = activeConnection.model("Gacha Banners", GachaBannerSchema, "gacha_banners")
  
  GachaBannerModel.get = dbGet
  GachaBannerModel.set = dbSet
  GachaBannerModel.new = async (data) => {
    const doesExist = await GachaBannerModel.findOne({ name: data.name, type: data.type })
    if (doesExist) return

    data.startDate = data.startDate || Date.now()
    const daysToAdd = 10
    const timeout = data.timeout || new Date(Date.now() + daysToAdd * 24 * 60 * 60 * 1000)
    data.timeout = timeout.getTime()

    const newGachaBanner = new GachaBannerModel(data)
    await newGachaBanner.save()
  }
  
  return GachaBannerModel
}

module.exports = GachaBannerDB
