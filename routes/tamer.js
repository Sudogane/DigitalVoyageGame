const Router = require("express").Router();
const { getUserInformation } = require("../core/utils");

module.exports = function Tamer({ requiresAuth, Schemas }) {
  Router.get("/agagagag", requiresAuth(), async (req, res) => {
    const userData = await getUserInformation(req.oidc.user, Schemas);
    const news = await Schemas.news.find({}).limit(5);
    res.locals = { ...userData, newsList: news };

    res.render("tamer/index");
  });
  
  Router.get("/inventory", requiresAuth(), async (req, res) => {
    const userData = await getUserInformation(req.oidc.user, Schemas)
    
    res.locals = { ...userData }
    res.render("tamer/inventory");
  });
  
  return {
    dir: "/me",
    Router,
  };
};
