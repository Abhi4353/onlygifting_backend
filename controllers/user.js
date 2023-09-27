
const User = require("../model/userTable");
const Campaign = require("../model/campaignTable");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");



exports.signup = async (req, res) => {
  try {
    const { FirstName, LastName, Email, Password } = await req.body;
    const id = await uuidv4();

    // Check if the email or username is already in use
    const existingUser = await User.findOne({ $or: [{ Email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    } else {
      const newUser = await User.create({
        id,
        FirstName,
        LastName,
        Email,
        Password,
      });
      res.status(200).send(newUser);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// ***********Upload image into a folder using database*************
const DIR = "./uploads/";
const date = new Date();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, date.getMilliseconds() + "-" + fileName);
  },
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});


exports.createCampaignImage = upload.single("image");
exports.createcampaign = async(req, res, next) => {
  try {
    const { userid } = req.body;
    const id = uuidv4();
    const campaignData =await Campaign.create({
      userid,
      id:id,
      country:req.body.country,
      zipcode : req.body.zipcode,
      fundraising :req.body.fundraising,
      price:req.body.price,
      data:req.body.data,
      title:req.body.title,
      image:req.file.filename,
      url:req.body.url,
      count:req.body.count
    })
  
    res.status(200).send(campaignData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};




exports.getusers = async(req,res) => {
  try{
    const users = await User.find(req.body)
    res.status(200).send(users)
  }
  catch(error){
    res.status(500).send(error)
  }
}


exports.getcampaigns = async(req,res) => {
  try{
    const campaigns = await Campaign.find(req.body)
    res.status(200).send(campaigns)
  }
  catch(error){
    res.status(500).send(error)
  }
}

exports.getuserdata = async(req,res)=>{
 try{
  const{Email,Password} = req.body;
  const check = await User.findOne({Email,Password})
  if(Email === check?.Email && Password === check?.Password){
      const requiredtoken = check?.id;
      res.status(200).send({userData:requiredtoken,role:check.Role})
  }
  else{
      res.status(401).send("Wrong Username or Password")
  }
 }
 catch(error){
   res.status(500).send("Internal Server Error")
 }
}