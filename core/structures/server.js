// Initialize Globals
const globals = require("./globals")

const express = require("express")
const ejs = require("ejs")
const { auth, requiresAuth } = require("express-openid-connect")
const glob = require("glob")
const path = require("path")
const bodyParser = require("body-parser")
//const helmet = require("helmet")
const http = require('http')

const database = require("../database");
require("dotenv").config();

module.exports = class Server {
  constructor(port) {
    this.app = express();
    this.port = port;
  
    this.app.set("view engine", "ejs");
    this.app.use(express.static("./public"));
    this.app.use(bodyParser.json());
    this.app.set("views", "./src/views");
    this.app.enable('trust proxy')
    /*this.app.use(helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "script-src": [
            "'unsafe-inline'",
            "'self'", 
            "*.jsdelivr.net",
            "*.fontawesome.com",
            "*.cloudflare.com",
            "unpkg.com",
            "profitabledisplaynetwork.com"
          ],
          "script-src-attr": [
            "'unsafe-inline'",
          ],
          "img-src": [
            "'self'",
            "cdn.glitch.global",
            "ik.imagekit.io",
            "*.wikia.nocookie.net",
            "*.googleusercontent.com",
            "*.flaticon.com",
            "*.wixmp.com",
            "*.discordapp.net",
            "*.wp.com",
            "*.alphacoders.com"
          ],
          "connect-src": [
            "'self'",
            "*.fontawesome.com",
            "wss:",
            "ws:"
          ],
          "media-src": [
            "cdn.glitch.global"
          ]
        }
      },
      frameguard: false
    }))*/
        

    this.app.use(
      auth({
        authRequired: false,
        auth0Logout: true,
        secret: process.env.SECRET,
        baseURL: process.env.BASEURL,
        clientID: process.env.CLIENTID,
        issuerBaseURL: process.env.ISSUERBASEURL,
        routes: {
          //login: true
        }
      })
    );
    
    this.app.use(function(request, response, next) {
      if (!request.secure) {
        return response.redirect("https://" + request.headers.host + request.url);
      }

      next();
    })

    this.app.use((req, res, next) => { this.handlerMiddleware(req, res, next,this.Schemas) })
    this.startDatabase();
  }

  startServer() {
    this.server = http.createServer(this.app)
    
    this.server.listen(3000, () => {
      this.startWebSocketServer()
      console.log("• WebServer Started!")
    });
  }
  
  startWebSocketServer() {
    const { Server } = require("socket.io")
    const io = new Server(this.server)
    
    this.onlineUsers = {}
    this.onlineRegisteredUsers = {}
    
    io.on('connection', (socket) => {
      socket.on("online", async({userId}) => {
        this.onlineUsers[socket.id] = userId
      })
      
      socket.on("disconnect", async() => {
        const userId = this.onlineUsers[socket.id]
        
        if(userId) {
          let user = await this.Schemas.users.get(userId)
          await this.Schemas.users.set(userId, { $set: { online: false } })
        }
        
        delete this.onlineUsers[socket.id]
      })
      
      socket.on("offline", async() => {
        const userId = this.onlineUsers[socket.id]
        
        if(userId) {
          let user = await this.Schemas.users.get(userId)
          await this.Schemas.users.set(userId, { $set: { online: false } })
        }
        
        delete this.onlineUsers[socket.id]
      })
    })
    
    console.log("• WebSocket Server Started!")
  }

  startDatabase() {
    database({
      url: process.env.MONGODB_URL,
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    }).then((Schemas) => {
      this.Schemas = Schemas;
      
      this.registerRouters()
      this.registerTasks(Schemas)
    });
  }
  
  registerRouters() {
    glob("./routes/**/*.js", (er, files) => {
      files.forEach((file) => {
        const Router = require(path.resolve(file));
        const router = Router({ requiresAuth: requiresAuth, Schemas: this.Schemas });

        this.app.use(router.dir, router.Router);
      });
    });
    
    this.startServer()
  }
  
  async registerTasks(Schemas) {
    // Re-fazer melhor.
    const schedule = require("node-schedule")
    const sendDataToUsersWithDigitalBug = schedule.scheduleJob('0 0 0 * * *', async () => {
      console.log(`[CRONJOB] Meia noite`)
      try {
        const usersWithDigitalBug = await Schemas.users.find({ "modules.digitalBug.active": true }).lean();

        for (const user of usersWithDigitalBug) {
          if (user.modules.digitalBug.daysLeft <= 0) continue;

          await Schemas.users.updateOne({ id: user.id }, {
            $set: {
              "modules.digitalBug.daysLeft": user.modules.digitalBug.daysLeft - 1,
              "modules.DATA": user.modules.DATA + 95
            }
          });

          if (user.modules.digitalBug.daysLeft === 1) {
            await Schemas.users.updateOne({ id: user.id }, {
              $set: {
                "modules.digitalBug.active": false
              }
            });
          }
        }
      } catch (error) {
        console.error('Error in sending data to users with Digital Bug:', error);
      }
    });
    
    const manageVip = schedule.scheduleJob('0 0 0 * * *', async () => {
      try {
        const VipUsers = await Schemas.users.find({ "modules.vip.active": true }).lean();
        
        for (const user of VipUsers) {
          if(user.modules.vip.daysLeft <= 0) return
          let newDays = ((user.modules.vip.daysLeft - 1) <= 0) ? 0 : user.modules.vip.daysLeft - 1
          let isActive = newDays >= 1
          
          await Schemas.users.updateOne({ id: user.id }, {
            $set: {
              "modules.vip.daysLeft": newDays,
              "modules.vip.active": isActive
            }
          })
        }
      } catch (error) {
        console.error('Error in managing VIP users:', error);
      }
    });
    
    const resetTickets = schedule.scheduleJob('0 */12 * * *', async() => {
      console.log("[SERVER || Cron Job] Running 12hr tasks")
      await Schemas.users.updateMany({ $set: {"modules.coliseumTickets": 15} })
    })
    
    const worldBossSwitchOpenState = schedule.scheduleJob('0 */4 * * *', async() => {
      console.log(`[WORLDBOSS] Four hours passed, switching...`)
      const worldBoss = await Schemas.events.worldBoss.findOne({ id: 1 })
      await worldBoss.setRandomEnemy()
      await worldBoss.switchOpenState()
    })
  }
  
  async handlerMiddleware(req, res, next, schemas) {
    const URL = req.url.toLowerCase()
    const serverSettings = await this.Schemas.core.server.findOne({ id: 0 })
    if(URL.includes("/img") || URL.includes("/css") || URL.startsWith("/api") || URL.startsWith("/callback") && !serverSettings.maintenance.active) return next();
    //console.log(`[Handler Middleware] Path: ${URL}`)

    const User = req.oidc?.user
    if(!User) return next()
     
    schemas.users.findOne({ email: User.email }).then(async(user) => {
        if(serverSettings.maintenance.active && !["/api/status", "/"].includes(URL) && (user.id !== 1 || !user)) return res.redirect("/")
        if(URL.startsWith("/api") && URL !== "/api/status" && serverSettings.maintenance.active && (user.id !== 1 || !user)) return res.status(403).json({ success: false })
      
        if(URL === "/" && user && user.newAccount >= 3 && !serverSettings.maintenance.active) return res.redirect("/me")
        if(!user) user = await schemas.users.new({ email: User.email })
        const isUserInBattle = await schemas.battles.findOne({ tamer: user.id })
        const userTutorialLevel = user.newAccount
        
        await this.Schemas.users.set(user.id, { $set: { online: true } })
        const whitelist = [1]
        const isUserWhitelisted = whitelist.includes(user.id)

        if(URL.includes("adminbureau") && !isUserWhitelisted) return res.redirect("/")
      
        if(userTutorialLevel !== 0) {
          //console.log(`[#${user.id}] ${user.username} - ${req.ip}`)
          await user.updateOne({ $set: {"ip.current": req.ip} })
          if(!user.ip.original) await user.updateOne({ $set: {"ip.original": req.ip} }) 
        }
          
        if(isUserInBattle && isUserInBattle.data.campaignId && URL !== `/battle/campaign/${isUserInBattle.data.stage}`) return res.redirect(`/battle/campaign/${isUserInBattle.data.stage}`)
        if(isUserInBattle && isUserInBattle.data.url && req.url !== isUserInBattle.data.url) return res.redirect(isUserInBattle.data.url)
        if(isUserInBattle && isUserInBattle.data.battleType === "coliseum" && req.url !== `/battle/coliseum/${isUserInBattle.data.stage}`) return res.redirect(`/battle/coliseum/${isUserInBattle.data.stage}`)
        if(isUserInBattle && isUserInBattle.data.battleType === "chrono" && req.url !== `/battle/chrono/${isUserInBattle.data.stage}`) return res.redirect(`/battle/chrono/${isUserInBattle.data.stage}`)
        //console.log(isUserInBattle)
        ///battle/chrono/chrOfExperience
      
        switch (userTutorialLevel) {
            case 0: {
                if (URL !== '/') return res.redirect('/')
                break
            }
            case 1: {
                if (URL !== '/') return res.redirect('/')
                break
            }
            case 2: {
                if (URL !== '/') return res.redirect('/')
                break
            }
            default: {
                return next()
                break
            }
        }

        return next()
    })
  }
};