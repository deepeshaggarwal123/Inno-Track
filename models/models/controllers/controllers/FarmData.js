const mongoose = require("mongoose");

const farmSchema = new mongoose.Schema({
  userId: String,
  crop: String,
  soilType: String,
  moisture: Number,
  pestRisk: String,
  expectedYield: Number
});

module.exports = mongoose.model("FarmData", farmSchema);
