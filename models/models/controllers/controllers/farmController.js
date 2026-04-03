const FarmData = require("../models/FarmData");

exports.addFarmData = async (req, res) => {
  const data = new FarmData({ ...req.body, userId: req.user.id });
  await data.save();
  res.json({ message: "Farm data saved" });
};

exports.getFarmData = async (req, res) => {
  const data = await FarmData.find({ userId: req.user.id });
  res.json(data);
};
