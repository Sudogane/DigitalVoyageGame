const Router = require("express").Router();
const { getUserInformation } = require("../core/utils");

module.exports = function Index({ requiresAuth, Schemas }) {
  
 Router.get("/worldboss", requiresAuth(), async (req, res) => {
    const userData = await getUserInformation(req.oidc.user, Schemas)
    let worldBoss = await Schemas.events.worldBoss.findOne({ id: 1 }).lean()
    
    if(userData.userData.modules.level < 2) return res.redirect("/")

    for(let i=0; i< worldBoss.leaderboard.length; i++) {
      let competitor = worldBoss.leaderboard[i]
      const profile = await Schemas.users.findOne({ id: competitor.id })
      competitor.data = profile
    }
   
   const userOnLeaderboard = worldBoss.leaderboard.filter((user) => user.id === userData.userData.id)[0]
   
    res.locals = { ...userData, worldBoss, userOnLeaderboard }
    res.render("events/worldboss")
  })
  
  return {
    dir: "/events",
    Router,
  };
};
