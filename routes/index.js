const Router = require("express").Router();
const { getUserInformation } = require("../core/utils");

module.exports = function Index({ requiresAuth, Schemas }) {
  Router.get("/", async (req, res) => {
    const userData = await getUserInformation(req.oidc?.user, Schemas);

    res.locals = { ...userData }

    return res.render("register/index.ejs")
  })

  Router.get("/me", async (req, res) => {
    const userData = await getUserInformation(req.oidc.user, Schemas);
    const news = await Schemas.news.find({}).limit(5);
    const latestDigimon = await Schemas.digimons.find({}).sort({ id: -1 }).limit(1)
    let topTamers = await Schemas.users.find({}).sort({ "modules.BITS": -1 }).limit(5).lean()
    let topDigimons = await Schemas.tamedDigimon.find({}).sort({ "level": -1, "xp": -1 }).limit(5).lean()
    const usersPlaying = await Schemas.users.find({ online: true }).sort({ id: -1 }).lean()


    for (let i = 0; i < topTamers.length; i++) {
      const thisTamer = topTamers[i]
      const tamerCostume = await Schemas.costumes.findOne({ id: thisTamer.costume })

      thisTamer.costume = tamerCostume
      const thisTamerData = await Schemas.users.findOne({ id: thisTamer.id })
      thisTamer.VIP = thisTamerData.modules.VIP
    }

    for (let i = 0; i < topDigimons.length; i++) {
      const thisMon = topDigimons[i]
      const monOwner = await Schemas.users.findOne({ id: thisMon.owner.current })
      const monOwnerCostume = await Schemas.costumes.findOne({ id: monOwner.costume })

      thisMon.owner = {
        username: monOwner.username,
        costume: monOwnerCostume
      }
    }

    res.locals = {
      ...userData,
      usersPlaying,
      newsList: news,
      latestDigimon: latestDigimon[0],
      top: {
        tamers: topTamers,
        digimons: topDigimons
      }
    };

    res.render("index");
  });

  Router.get("/news/:postId", async (req, res) => {
    const postId = req.params.postId;
    const userData = await getUserInformation(req.oidc.user, Schemas).then((res) => {
      return res;
    });
    const post = await Schemas.news.findOne({ id: postId })

    if (!post) res.redirect("/");

    res.locals = { ...userData, post: post };

    res.render("news");
  });

  Router.get("/coliseum", requiresAuth(), async (req, res) => {
    const userData = await getUserInformation(req.oidc.user, Schemas)
    const opponents = await Schemas.coliseum.opponents.getOpponents(userData.userData.modules.level)

    res.locals = { ...userData, opponents }
    res.render("coliseum")
  })

  Router.get("/nowplaying", async (req, res) => {
    const userData = await getUserInformation(req.oidc.user, Schemas)
    const page = parseInt(req.query.page) || 1
    const limit = 3


    let Users = await Schemas.users.find({ "online": true }).limit(limit * 1).skip((page - 1) * limit).lean()
    const count = await Schemas.users.estimatedDocumentCount({ "online": true })
    const totalPages = Math.ceil(count / limit)

    for (var i = 0; i < Users.length; i++) {
      const user = Users[i]
      Users[i].username = user.username || "New User"
      Users[i].costume = await Schemas.costumes.findOne({ id: user.costume })
    }

    res.locals = { ...userData, Users, totalPages, page }
    res.render("nowplaying")
  })

  return {
    dir: "/",
    Router,
  };
};
