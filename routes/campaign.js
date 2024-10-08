const Router = require("express").Router();
const { getUserInformation } = require("../core/utils");

module.exports = function Campaign({ requiresAuth, Schemas }) {
  Router.get("/:campaignId", requiresAuth(), async (req, res) => {
    const campaignId = req.params.campaignId
    let campaign = await Schemas.campaigns.findOne({ id: campaignId })
    if(!campaign) res.redirect("/404")
    let userData = await getUserInformation(req.oidc.user, Schemas);
    
    campaign.locations.forEach((quest) => {
      const filtered = quest.stages.find(stage => stage.bossStage);
      if (userData.userData.modules.cooldowns.boss[filtered.id]) {
        const ONE_HOUR = 60 * 60 * 1000;
        const COOLDOWN_DATE = new Date(userData.userData.modules.cooldowns.boss[filtered.id]);
        const CURRENT_DATE = new Date();
        const TIME_LEFT_IN_MS = CURRENT_DATE - COOLDOWN_DATE;
        const isStageCooldownDone = CURRENT_DATE >= COOLDOWN_DATE;

        if (isStageCooldownDone) {
          (async () => {
            await userData.userData.updateOne({ $unset: { [`modules.cooldowns.boss.${filtered.id}`]: 1 } });
          })();
        }
      }
    })
    
    userData = await getUserInformation(req.oidc.user, Schemas);
    
    res.locals = {...userData, campaign}
    res.render("campaign")
  });

  return {
    dir: "/campaign",
    Router,
  };
};