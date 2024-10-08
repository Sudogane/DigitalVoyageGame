const xorshift = require("xorshift");

module.exports = {
  getUserInformation: async (userData, Schemas) => {
    if (!userData) return;
    let userDb = await Schemas.users.findOne({ email: userData.email });
    let costume
    let digivice
    let staminaRegen = {}
    
    if(userDb) {
      costume = await Schemas.costumes.findOne({ id: userDb.costume })
      digivice = await Schemas.upgrades.digivice.findOne({ id: userDb.modules.levels.digivice })
      staminaRegen.next = userDb.timeToNextStaminaRecharge()
      staminaRegen.full = userDb.timeToFullStaminaRecharge()
    }
    
    if (!userDb) await Schemas.users.new(userData).then((user) => {
        userDb = user;
        console.log("New user created~")
      });

    userData.name = (userData.name.length > 8) ? userData.name.slice(0, 8-1) + '&hellip;' : userData.name;
    return { user: userData, userData: userDb, costume, digivice, staminaRegen };
  },
  
  RNG: (a, b) => {
    return Math.floor(Math.random() * (b - a + 1) + a)
		//return Math.floor(a + xorshift.random() * (b - a))
	},
  
};