const express = require("express");
const Service = require("../models/Service");

const router = express.Router();

// Get all services
router.get("/getservices", async (req, res) => {
  try {
    const services = await Service.findAll();
    res.status(200).json({ services });
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
