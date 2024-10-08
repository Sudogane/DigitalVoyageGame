const mongoose = require('mongoose')
const { dbGet, dbSet } = require("../../utils")

const Server = (activeConnection) => {
  const ServerSchema = new mongoose.Schema({
    id: { type: Number, default: 0 },
    version: { type: String, default: "0.1" },
    build: { type: String, default: "Prototype" },
    maintenance: {
      active: { type: Boolean, default: false },
      message: { type: String, default: "The game is under maintenance" }
    },
    dropBuffs: { type: Number, default: 1 }
  })
  
  const ServerModel = activeConnection.model("Server", ServerSchema, "Server")
  
  ServerModel.new = DATA => {
    if (!DATA) return

    return new Promise(resolve => {
      ServerModel.findOne({ id: DATA.id }, (err, newPost) => {
        if (err) console.error(err)
        const post = new ServerModel({...DATA})
        post.save(err => {
          if (err) return console.error('NEWS POST CREATE ERROR')
          return resolve(post)
        })
      })
    })
  }
  
  return ServerModel
}

module.exports = Server