const mongoose = require('mongoose')

const campaignSchema = mongoose.Schema({
    id:{type : String},
    userid : {type : String},
    country : {type : String},
    zipcode : {type : String},
    fundraising: 
    [{ type: String }],
    price : {type : String},
    data : [{ type: String }],
    title : {type : String},
    image : {type : String},
    url : {type : String},
    count : {type : String},
    status: {type : Boolean, default:true}
})

const Campaign = mongoose.model("Campaigns",campaignSchema)
module.exports = Campaign;