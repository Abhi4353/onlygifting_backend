const express = require("express");
const router = express.Router();
const {
  signup,
  createcampaign,
  createCampaignImage,
  getusers,
  getcampaigns
} = require("../controllers/user");

router.post("/signup", signup);
router.post("/createcampaign", createCampaignImage, createcampaign);
router.get("/getusers",getusers)
router.get("/getcampaigns",getcampaigns)
module.exports = router;
