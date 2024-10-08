const mongoose = require('mongoose')
const { Mixed } = mongoose.Schema.Types

module.exports = function LIVENEWS_DB (activeConnection) {
  const liveNewsSchema = new mongoose.Schema({
    id: { type: Number, default: 0, unique: true },
    content: Array
  })
  
  liveNewsSchema.statics.addNews = async function(content) {
    const news = await this.findOneAndUpdate(
      { id: 0 },
      { $push: { content: { $each: [content], $position: 0 } } },
      { new: true }
    );

    if (news.content.length > 3) {
      news.content.pop();
      await news.save();
    }

    return news;
  }
  
  const liveNewsModel = activeConnection.model('LiveNews', liveNewsSchema, 'liveNews')
  return liveNewsModel
}