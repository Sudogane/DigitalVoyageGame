const Router = require("express").Router()
const { getUserInformation } = require("../../core/utils")

module.exports = function Inventory({ Schemas }) {  
  Router.post("/equip", async (req, res) => {
    if (!req.oidc?.user) return res.status(401).send("Unauthorized")

    const { digimonIndex, equipmentIndex } = req.body
    if (isNaN(digimonIndex) || isNaN(equipmentIndex)) return res.status(400).send("Invalid request")
    
    try {
      const { userData } = await getUserInformation(req.oidc.user, Schemas)
      let { modules: { party, inventory } } = userData

      let digimonToEquip = party[digimonIndex]
      let equipment = inventory[equipmentIndex]

      if (equipment.type !== "equipment" || digimonToEquip.equipment && Object.keys(digimonToEquip.equipment).length) return res.status(400).send("Invalid equipment type")
      
      inventory.splice(equipmentIndex, 1)
      digimonToEquip.equipment = equipment

      digimonToEquip.stats.additional.attack += equipment.mainStat
      if(equipment.statAmountIncreaseType !== "percentage") digimonToEquip.stats.additional[equipment.subStat] += equipment.statAmountIncrease
      else digimonToEquip.stats.additional[equipment.subStat] = Math.floor(digimonToEquip.stats.additional[equipment.subStat] * equipment.statAmountIncrease)
      
      await userData.updateOne({
        $set: {
          "modules.party": party,
          "modules.inventory": inventory
        }
      })

      return res.status(200).send("Equipment successfully equipped")
    } catch (error) {
      console.error("Error:", error)
      return res.status(500).send("Internal Server Error")
    }
  })
  
  Router.post("/upgradeInventory", async (req, res) => {
    if (!req.oidc?.user) return res.status(401).send("Unauthorized")
    
    try {
      const user = await Schemas.users.findOne({ email: req.oidc.user.email })
      const upgradePrice = Math.round(1600 * (user.modules.capacities.inventory / 4.2) )
      
      if(user.modules.BITS < upgradePrice) return res.status(400).send("You don't have enough bits")
      
      await user.updateOne({
        $set: {
          "modules.BITS": user.modules.BITS - upgradePrice,
          "modules.capacities.inventory": user.modules.capacities.inventory + 15
        }
      })
      
      return res.status(200).send("Upgrade complete")
    } catch(error) {
      console.log("UPGRADE INVENTORY ERROR", error)
    }
  })


  return {
    dir: "/api/inventory",
    Router,
  }
}
