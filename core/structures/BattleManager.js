class BattleManager {
  constructor(user, battleConfig, Schemas) {
    this.user = user
    this.battleConfig = battleConfig
    this.schemas = Schemas
  }
  
  async checkBasicConditions() {
    const isUserAlreadyInBattle = await this.schemas.battles.findOne({ tamer: this.user.id })
    const isAllDigimonDead = this.user.modules.party.every((digimon) => digimon.health === 0)

    return !(isUserAlreadyInBattle || isAllDigimonDead)
  }

  async createBattle() {
    const canCreateBattle = await this.checkBasicConditions()
    if(!canCreateBattle) return

    const data = {
      stage: this.battleConfig.stage.id,
      id: this.battleConfig.stage.id,
      backdrop: this.battleConfig.backdrop || "https://ik.imagekit.io/projectvoyage/Backdrops/smzb_uk4NdSNfv.jpg?updatedAt=1680108888994",
      backgroundMusic: this.battleConfig.backgroundMusic || "https://cdn.glitch.global/01f4400b-53dc-443a-be28-dae1dfeaf721/Digimon%20World_%20Next%20Order%20OST%20%2316%20-%20Digital%20Pulse%20(320%20kbps).mp3?v=1689092052251",
      turn: {
        now: 0,
        queue: [],
        total: 0
      },
      enemies: [],
      party: this.user.modules.party,
      log: [],
      battleType: this.battleConfig.type,
      drops: this.battleConfig.drops,
      url: this.battleConfig.url
    };

    data.enemies = await this.addEnemiesToBattle(this.battleConfig.enemies);
    this.calculateTurnOrder(data);
    await this.registerBattle(data);

    return { action: "redirectToBattle", to: data.stage };
  }

  calculateTurnOrder(data) {
    data.turn.total = (data.enemies.length + data.party.length) - 1;

    for (let i = 0; i < 3; i++) {
      if (data.enemies[i]) {
        data.turn.queue.push({ _index: i, enemy: true, speed: data.enemies[i].stats.speed });
      }
      if (data.party[i]) {
        data.turn.queue.push({ _index: i, speed: data.party[i].stats.speed + data.party[i].stats.additional.speed });
      }
    }

    data.turn.queue.sort((a, b) => parseFloat(b.speed) - parseFloat(a.speed));
  }

  async registerBattle(data) {
    await this.schemas.battles.new(this.user.id, data);
  }

  async addEnemiesToBattle(enemiesList) {
    const enemies = [];
    for (let i=0; i<enemiesList.length; i++) {
      const digimon = enemiesList[i]
      const digimonWithStats = await this.calculateStats(digimon, i);
      enemies.push(digimonWithStats);
    }
    return enemies;
  }

  async calculateStats(id, index) {
    let digimon = await this.schemas.digimons.findOne({ id });

    digimon = {
      ...digimon.toObject(),
      level: this.battleConfig.level || 1
    };

    for (let j = 1; j < digimon.level; j++) {
      digimon.stats.health += 5;
      digimon.stats.attack += 2;
      digimon.stats.speed += 2;
      digimon.stats.defense += 2;
    }
    
    const extraStats = this.battleConfig.extraStats[index]
    if(extraStats) {
      Object.keys(extraStats).forEach((stat) => {
        digimon.stats[stat] += extraStats[stat]
      })
    }

    digimon.health = 2 * digimon.stats.health;
    digimon.mana = digimon.stats.mana;

    return digimon;
  }
}


module.exports = BattleManager