const mongoose = require('mongoose')
const { Mixed } = mongoose.Schema.Types

module.exports = function NEWS_DB (activeConnection) {
  const NewsSchema = new mongoose.Schema(
    {
      title: String,
      category: {type: String, default: "TO BE ANNOUNCED"},
      id: { type: String, required: true, index: { unique: true }},
      description: String,
      content: String,
      creationDate: { type: Mixed },
      thumbnail: String,
      image: String
    }
  )

  const MODEL = activeConnection.model('NewsDb', NewsSchema, 'newsdb')

  MODEL.new = DATA => {
    if (!DATA) return

    return new Promise(resolve => {
      MODEL.findOne({ id: DATA.id }, (err, newPost) => {
        if (err) console.error(err)
        const post = new MODEL({...DATA})
        post.save(err => {
          if (err) return console.error('NEWS POST CREATE ERROR')
          return resolve(post)
        })
      })
    })
  }
  
  
  var betanews = {
    title: "Embark on the thrilling Beta Adventure, starting right now!",
    category: "Announcement",
    id: "betaventure",
    description: "Step into the extraordinary world of Digital Voyage, where passion meets creativity! We proudly present the first-ever open public beta of this game crafted by fans, for fans. Brace yourself for an unforgettable digital journey filled with endless challenges and boundless excitement! Join the adventure now and let the voyage begin!",
    content: `<h2>🚀 Embark on an Epic Digital Voyage: Join our First Open Beta Now!</h2>
    <p>Greetings, adventurers! ADMIN here, and I am beyond thrilled to welcome each and every one of you to our spectacular new beta test: Digital Voyage! The journey to this point has been a labor of love, with nearly a year of development. Along the way, I faced some real-life challenges, but with determination, we've kept the development on track. No more delays; let's dive straight into the excitement! Our beta test is set to run for about a month, but its duration may depend on our ability to secure the necessary resources to keep it running smoothly. Your invaluable feedback will shape the game's future, and we plan to update it weekly, incorporating your ideas and suggestions. Be prepared for a host of thrilling events too!</p>
    <br>
    <h2>🎮 Now, let's explore some of the thrilling updates since the last private beta test:</h2>
    <br>
    <ul>
        <li><p>🔍 Meet the new <b>analyzer</b>, an indispensable tool for your adventures!</p></li>
        <li><p>🌀🔥 Prepare to be amazed by captivating new animations for <b>Evolution</b> and <b>Invocation</b>. </p></li>
        <li><p>🌟 Unlock <b>VIP</b> bonuses for a truly special gaming experience.</p></li>
        <li><p>😎 Express yourself with the brand new <b>Avatar system</b>; simply click on your avatar to customize it!</p></li>
        <li><p>🐲💥 Discover a plethora of <b>new Digimons</b>, each with unique abilities and powers.</p></li>
        <li><p>💪🎯 Master four incredible <b>moves</b> to conquer any challenge that comes your way.</p></li>
        <li><p>🗺️🏞️ Embark on thrilling new adventure <b>quests in Adventure 01.</b></p></li>
        <li><p>🏆👾 Enjoy enhanced rewards and a re-designed <b>World Boss</b> for epic battles.</p></li>
        <li><p>⚔️🛡️ Engage in the rebalanced <b>Coliseum</b> for even more intense competitions.</p></li>
        <li><p>⚙️🆙 Witness the potential of <b>Digivice levels</b>, which can now generate higher-tier Digimons.</p></li>
        <li><p>🎮🌌 Immerse yourself in battles with a <b>revamped in-battle screen</b>, offering an immersive experience.</p></li>
        <li><p>📈Experience limitless growth as we remove the <b>Max Level</b> of Coliseum.</p></li>
        <li><p>🏟️🏅 Test your skills daily with the <b>buffed Daily Max</b> Attempts of the coliseum.</p></li>
        <li><p>🎁🌟 Explore rebalanced <b>Adventure 01 Drops</b>, ensuring a fair and rewarding gaming experience.</p></li>
    </ul>
    <br>
    <p class="text-yellow bold">Prepare for an unforgettable adventure in Digital Voyage! Thank you for joining us on this epic journey, and your valuable feedback will pave the way for an even more extraordinary gaming experience. Let's dive in and create unforgettable memories together! See you in the game! 🤩🎉</p>
    `,
    creationDate: new Date(),
    thumbnail: "https://ik.imagekit.io/projectvoyage/Interface/Backgrounds/dl_bg3_U0-azEyhP.jpg?updatedAt=1688052739774",
    image: "https://ik.imagekit.io/projectvoyage/Interface/Backgrounds/dl_bg3_U0-azEyhP.jpg?updatedAt=1688052739774"
  }
  
  MODEL.new(betanews)

  return MODEL
}
