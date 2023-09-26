const mongoose = require('mongoose')
const dbString =
  "mongodb+srv://as2271614:ymZQxUcqnTJyod7W@cluster0.tl1cc2m.mongodb.net/?retryWrites=true&w=majority";

const dbconn = mongoose.connect(dbString).then(() => console.log("Connected!")); 

module.exports = dbconn;