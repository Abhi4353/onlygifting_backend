const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    id : {type : String},
    FirstName : {type : String},
    LastName : {type : String},
    Email : {type : String},
    Password : {type : String},
    Role:{type:String,default:"User"}
},
{
    timestamps : true
})

const User = mongoose.model("UserTable",userSchema)

module.exports = User;