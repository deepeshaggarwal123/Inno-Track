const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { addFarmData, getFarmData } = require("../controllers/farmController");

router.post("/", auth, addFarmData);
router.get("/", auth, getFarmData);

module.exports = router;
