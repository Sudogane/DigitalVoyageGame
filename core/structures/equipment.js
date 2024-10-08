const { RNG } = require("../utils")

class Equipment {
  constructor(data) {
    this.data = data || {}
  }
  
  async generateEquipmentData(id, EquipmentSchemas) {
    await this.setDefaultValues(id, EquipmentSchemas)
    
    return this.data
  }
  
  async setDefaultValues(id, EquipmentSchemas) {
    const equipmentData = await EquipmentSchemas.get(id)
    
    this.data = { ...equipmentData }
    this.data.level = 1
    this.data.xp = 0
    this.data.rarity = this.data.rarity || 3
    this.data.upgrade = 1
    this.data.type = "equipment"
  }
  
  addExp(xp) {
    this.data.xp += xp
  }
  
  levelUp() {
    const xpRequired = this.calculateXPRequired()

    while (this.data.xp >= xpRequired) {
      this.data.level++
      this.data.xp -= xpRequired
      
      this.data.mainStat += 10
      this.data.statAmountIncrease += 5

      xpRequired = this.calculateXPRequired()
    }
  }

  calculateXPRequired() {
    const rarityXPMap = { 3: 1500, 4: 2200, 5: 5500 }
    const baseXP = rarityXPMap[rarity]
    const rarity = this.data.rarity
    const level = this.data.level
    
    const xpRequired = Math.floor(baseXP * Math.pow(1.5, level))

    return xpRequired
  }
}

module.exports = Equipment