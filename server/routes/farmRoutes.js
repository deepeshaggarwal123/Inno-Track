const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

// @route   GET /api/farm/dashboard
// @desc    Get dummy farm dashboard data
// @access  Private
router.get("/dashboard", auth, (req, res) => {
  res.json({
    cropHealth: {
      ndvi: 82,
      photosynthesis: 78,
      waterStress: 12,
      recommendation: "Vegetation health is optimal. Maintain current irrigation schedule."
    },
    irrigation: {
      soilMoisture: 42,
      pumpStatus: "Off",
      nextSchedule: "2026-04-02T10:00:00Z"
    },
    alerts: [
      { id: 1, type: "pest", message: "High probability of aphid activity in Sector B.", severity: "medium" },
      { id: 2, type: "weather", message: "Heavy rain expected in 24 hours. Adjust irrigation.", severity: "high" }
    ]
  });
});

// @route   GET /api/farm/units
// @desc    Get farm units
// @access  Private
router.get("/units", auth, (req, res) => {
  res.json([
    { id: 1, name: "Sector Alpha", crop: "Wheat", health: "Excellent" },
    { id: 2, name: "Sector Beta", crop: "Corn", health: "Good" },
    { id: 3, name: "Sector Gamma", crop: "Soybeans", health: "Monitoring" }
  ]);
});

module.exports = router;
