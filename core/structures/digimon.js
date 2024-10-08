const { nanoid } = require("nanoid")
const { RNG } = require("../utils")

class DigimonGenerator {
  constructor(digimon, owner, Schemas) {
    this.digimon = digimon
    this.Schemas = Schemas
    this.owner = owner
  }

  async generateDigimonData() {
    if(!this.digimon || !this.digimon.id) return;
    
    const digimon = await this.fetchDigimonFromDb()
    await this.setDefaultValues(digimon)
    this.removeUnnecessaryFields(digimon)
    this.setLockedStatus(digimon)
    await this.createDigimonOnDatabase(digimon)
    
    return digimon
  }
  
  async fetchDigimonFromDb() {
    const digimon = await this.Schemas.digimons.findOne({id: this.digimon.id})
    if(!digimon) throw new Error("[Digimon Generator] No digimon found")
    return digimon.toObject()
  }
  
  async getDigimonMoves(digimon) {
    const randomMoveOne = digimon.canLearnMoves[1] 
    const randomMoveTwo = digimon.canLearnMoves[2]   
    const randomMoveThree = digimon.canLearnMoves[3]
    
    let newMoveList = {
      "In-Training": ["Charge"],
      "Rookie": ["Charge", randomMoveOne],
      "Champion": ["Charge", randomMoveOne, randomMoveTwo],
      "Ultimate": ["Charge", randomMoveOne, randomMoveTwo, randomMoveThree],
      "Mega": ["Charge", randomMoveOne, randomMoveTwo, randomMoveThree]
    }[digimon.form]
    
    return newMoveList
  }

  async setDefaultValues(digimon) {
    digimon._id = nanoid(20)
    digimon.nickname = digimon.species
    digimon.level = 1
    digimon.maxLevel = 1
    digimon.xp = 0
    digimon.friendship = 0
    digimon.tier = "E"
    digimon.size = "Ordinary"
    digimon.traits = []
    digimon.sExp = {
      holy: 0,
      dark: 0,
      dragon: 0,
      beast: 0,
      bird: 0,
      machine: 0,
      aquatic: 0,
      'plant/insect': 0
    }
    
    digimon.equipment = {}
    
    digimon.stats.additional = {
      health: 0,
      mana: 0,
      attack: 0,
      defense: 0,
      speed: 0,
      critical: {
        rate: 0,
        damage: 0
      },
      evasiness: 0,
      accuracy: 0,
      elementalPenetration: {
        fire: 0,
        wind: 0,
        water: 0,
        ice: 0,
        eletric: 0,
        wood: 0,
        earth: 0,
        light: 0,
        dark: 0,
        neutral: 0,
        metal: 0,
      },
      resistence: {
        fire: 0,
        wind: 0,
        water: 0,
        ice: 0,
        eletric: 0,
        wood: 0,
        earth: 0,
        light: 0,
        dark: 0,
        neutral: 0,
        metal: 0,
      }
    }
    
    digimon.health = 2 * digimon.stats.health
    digimon.mana = digimon.stats.mana
    digimon.nature = await this.generateNature()
    digimon.personality = "Ordinary"
    digimon.owner = {
      original: this.owner,
      current: this.owner
    }
    
    digimon.moves = await this.getDigimonMoves(digimon)
  }

  removeUnnecessaryFields(digimon) {
    delete digimon.evolution
    delete digimon.description
    delete digimon.canLearnMoves
  }

  setLockedStatus(digimon) {
    digimon.locked = !!this.digimon.locked
  }

  async createDigimonOnDatabase(digimonData) {
    await this.Schemas.tamedDigimon.new(digimonData)
  }

  async generateNature() {
    const natures = await this.Schemas.natures.find({})
    let randomNature = RNG(1, Object.keys(natures).length)
    let goodNatureChance = RNG(0, 100)

    if(randomNature === 2 && goodNatureChance > 25) {
      console.log(`[Digimon Generator] Rerolling Nature, Original Nature & Odds: ${randomNature}/${goodNatureChance}%`)
      return this.generateNature()
    }
      
    let nature = await this.Schemas.natures.findOne({ id: randomNature })
    return nature.name
  }
}

module.exports = DigimonGenerator