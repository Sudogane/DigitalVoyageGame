const Router = require("express").Router();
const { getUserInformation } = require("../core/utils");

module.exports = function Digibank({ requiresAuth, Schemas }) {
  Router.get("/", requiresAuth(), async (req, res) => {
    const userData = await getUserInformation(req.oidc.user, Schemas);

    const userScanList = (userData.userData.modules.scans) ? userData.userData.modules.scans : {}
    let scans = {}

    for (let i = 0; i < Object.keys(userScanList).length; i++) {
      const species = Object.keys(userScanList)[i]
      const scanData = await Schemas.digimons.findOne({ species: species })

      scans[species] = {
        scanAmount: userScanList[species],
        sprite: scanData.sprite
      }
    }

    res.locals = { ...userData, scans };

    res.render("tamer/digibank");
  });

  Router.get("/:id", requiresAuth(), async (req, res) => {
    const userData = await getUserInformation(req.oidc.user, Schemas);
    const digimonId = req.params.id
    const digimonData = userData.userData.modules.party.filter(digimon => digimon._id === digimonId)[0] || userData.userData.modules.digibank.filter(digimon => digimon._id === digimonId)[0]
    const isOnParty = (userData.userData.modules.party.filter(digimon => digimon._id === digimonId)[0]) ? true : false

    let evolutionData
    let evolutions = {}

    if (digimonData) evolutionData = await Schemas.evolutions.findOne({ id: digimonData.id })
    if (evolutionData) {
      let to = await Schemas.digimons.find().where('id').in(evolutionData.to)
      let from = await Schemas.digimons.find().where('id').in(evolutionData.from)
      if (to && to.length > 0) evolutions.to = []
      if (from && from.length > 0) evolutions.from = []

      for (let evo of to) {
        let details = await Schemas.evolutions.findOne({ id: evo.id })
        let evolution = {
          id: evo.id,
          species: evo.species,
          sprite: evo.sprite,
          form: evo.form
        }

        if (details) evolution = { ...evolution, ...details.toObject() }

        evolutions.to.push(evolution)
      }

      for (let evo of from) {
        let details = await Schemas.evolutions.findOne({ id: evo.id })
        let evolution = {
          id: evo.id,
          species: evo.species,
          sprite: evo.sprite,
          form: evo.form
        }

        if (details) evolution = { ...evolution, ...details.toObject() }

        evolutions.from.push(evolution)
      }
    }


    const moves = await Promise.all(digimonData.moves.map(async (moveName) => {
      const move = await Schemas.moves.findOne({ name: moveName }) || await Schemas.moves.findOne({ name: moveName.trimStart() })
      if (!move) return
      return move
    }));

    digimonData.moves = moves

    res.locals = { ...userData, digimonData: digimonData, evolutions: evolutions, isOnParty };

    res.render("tamer/digibank");
  });

  return {
    dir: "/digibank",
    Router,
  };
};
