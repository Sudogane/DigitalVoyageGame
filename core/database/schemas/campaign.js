const mongoose = require('mongoose')
const { Mixed } = mongoose.Schema.Types

module.exports = function CAMPAIGN_DB (activeConnection) {
  
  const Campaign = new mongoose.Schema(
    {
      id: { type: String, required: true, index: { unique: true } },
      name: String,
      description: String,
      mapImage: String,
      locations: Array
    }
  )
  
  const CAMPAIGN = activeConnection.model('Campaigns', Campaign, 'campaigns')
  
  CAMPAIGN.new = async (newCampaign) => {
    let {id, name, description, mapImage, locations } = newCampaign
    let campaignExists = await CAMPAIGN.findOne({ id });
    
    if(campaignExists) return
    
    let CPG = new CAMPAIGN({
      id,
      name,
      description,
      mapImage,
      locations
    })
    
    CPG.save()
  }

  return CAMPAIGN
}