const Router = require("express").Router();
const Digimon = require("../../core/structures/digimon");

module.exports = function Register({ Schemas }) {  
  Router.post("/username", async (req, res) => {
    const response = { success: false, error: "" };

    const user = req.oidc.user;
    const username = req.body.username;
    const userData = await Schemas.users.findOne({ email: user.email });

    const usernameExists = await Schemas.users.findOne({ username: { $regex: new RegExp(`^${username.toLowerCase()}$`, "i") } });
    const usernameRegexp = new RegExp(/[^A-Za-z0-9 ]/g);
    if (usernameExists) response.error = "This username is already taken by another user";
    if (usernameRegexp.test(username)) response.error = "The username includes unacceptable characters.";
    if (username.length < 4 || username.length > 16) response.error = "Username length is outside the allowed range; it should be at least 4 characters and at most 16 characters.";

    if (!response.error) {
      response.success = true;
      await userData.updateOne({ username: username, newAccount: 1 });
    }

    res.json(response);

  });
  
  Router.post("/character", async (req, res) => {
    const user = req.oidc.user
    let { costume } = req.body
    const charList = ["koh", "sayo"]
    const userData = await Schemas.users.findOne({ email: user.email })
    let response = {success: false, error: ""}

    if(!costume) response.error = "Get rickrolled, Since you've done the impossible."
    costume = costume.toLowerCase()
    if(!charList.includes(costume)) response.error = "Somebody once, told me the world is gonna roll me..."
    
    if(!response.error) response.success = true
    if(response.success) await userData.updateOne({ costume: costume, newAccount: 2 })

    res.json(response)
  });
  
  Router.post("/starter", async (req, res) => {
    const user = req.oidc.user
    let { starter } = req.body
    const digiList = [2, 3, 6]
    const userData = await Schemas.users.findOne({ email: user.email })
    let response = {success: false, error: ""}
    
    if(userData.party) response.error = "Sending you back to the tutorial."
    if(!digiList.includes(starter)) response.error = "So, you're trying to hack the game, huh?"
    if(!starter) response.error = "There is no MISSIGNOMON here..."
    
    if(!response.error) response.success = true
    
    starter = {id: starter, locked: true}
    const diginerator = new Digimon(starter, userData.id, Schemas)
    diginerator.generateDigimonData().then(async(digi) => {
      if(response.success) await userData.updateOne({ "modules.party": [digi], newAccount: 3 })
      return res.json(response)
    })
  });

  return {
    dir: "/api/register",
    Router,
  };
};
