const Router = require("express").Router();
const { getUserInformation } = require("../core/utils");

let BATTLES = []
module.exports = function Battle({ requiresAuth, Schemas }) {

  Router.get("/:type/:stageId", requiresAuth(), async (req, res) => {
    const userData = await getUserInformation(req.oidc.user, Schemas);
    const TYPE = req.params.type
    const ID = req.params.stageId
    const url = req.url
    
    let _BATTLE = await Schemas.battles.findOne({ tamer: userData.userData.id })
    if(!_BATTLE) return res.redirect("/")
    
    const wb = await Schemas.events.worldBoss.findOne({ id: 1 })
    if(_BATTLE.data.battleType === "worldboss" && wb.open === false) {
      await Schemas.battles.deleteOne({ tamer: userData.userData.id })
      return res.redirect("/events/worldboss")
    }
    
    if(_BATTLE.data.battleType === "worldboss" && wb.open === true && url !== "/events/worldBossNormal") return res.redirect("/battle/events/worldBossNormal")
    
    
    res.locals = {...userData}
    
    let userBattleInfo
    let stage
    switch(TYPE) {
      case "campaign":
        const CAMPAIGN = await Schemas.campaigns.findOne({"stages.id": ID})
        let STAGE
        
        CAMPAIGN.locations.forEach(location => {
          let stage = location.stages.filter(stage => stage.id === ID)[0]
          
          
          if(stage) STAGE = {...stage, backdrop: location.backdrop}
        })
        
        res.locals.STAGE = STAGE
      break;
        
      case "coliseum":
        userBattleInfo = await Schemas.battles.findOne({ "data.stage": ID })
        if(!userBattleInfo) return
        stage = { 
          ...userBattleInfo.toObject(), 
          backdrop: "https://ik.imagekit.io/projectvoyage/Backdrops/smzb_uk4NdSNfv.jpg?updatedAt=1680108888994",
          enemies: userBattleInfo.data.enemies,
          battleType: userBattleInfo.data.battleType
        }
        
        res.locals.STAGE = stage
      break;
        
      case "chrono":
        
        userBattleInfo = await Schemas.battles.findOne({ "data.stage": ID })
        if(!userBattleInfo) return
        stage = { 
          ...userBattleInfo.toObject(), 
          backdrop: "https://ik.imagekit.io/projectvoyage/Backdrops/smzb_uk4NdSNfv.jpg?updatedAt=1680108888994",
          enemies: userBattleInfo.data.enemies,
          battleType: userBattleInfo.data.battleType
        }
        
        res.locals.STAGE = stage
      break;
        
      default:
        userBattleInfo = await Schemas.battles.findOne({ "data.stage": ID })
        if(!userBattleInfo) return
        stage = { 
          ...userBattleInfo.toObject(), 
          //backdrop: "https://ik.imagekit.io/projectvoyage/Backdrops/smzb_uk4NdSNfv.jpg?updatedAt=1680108888994",
          enemies: userBattleInfo.data.enemies,
          battleType: userBattleInfo.data.battleType || "default"
        }
        res.locals.STAGE = stage
      break;
    }
    
    res.locals._BATTLE = _BATTLE
    res.render("battle");
  });

  return {
    dir: "/battle",
    Router,
  };
};
