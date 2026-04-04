const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactNo: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  securityQuestion: { type: String, required: true, default: "What is your favorite crop?" },
  securityAnswer: { type: String, required: true, default: "Farmer" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
