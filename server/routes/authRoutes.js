const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// @route   POST /api/auth/register
// @desc    Register a new user
router.post("/register", async (req, res) => {
  const { name, contactNo, password } = req.body;
  console.log("Registration attempt:", { name, contactNo });

  try {
    let user = await User.findOne({ contactNo });
    if (user) {
      return res.status(400).json({ message: "User already exists with this contact number." });
    }

    user = new User({
      name,
      contactNo,
      password,
      securityQuestion: req.body.securityQuestion || "What is your favorite crop?",
      securityAnswer: req.body.securityAnswer || "Farmer",
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    
    // Hash security answer
    if (req.body.securityAnswer) {
      user.securityAnswer = await bcrypt.hash(req.body.securityAnswer.toLowerCase().trim(), salt);
    }

    await user.save();
    console.log("User saved successfully:", user._id);

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });

    res.status(201).json({ token });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

// @route   POST /api/auth/login
// @desc    Login with contact number and password
router.post("/login", async (req, res) => {
  const { contactNo, password } = req.body;

  try {
    const user = await User.findOne({ contactNo });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });

    res.json({ token, user: { name: user.name, contactNo: user.contactNo } });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send("Server error");
  }
});

// @route   POST /api/auth/verify-user
// @desc    Verify user exists and return security question
router.post("/verify-user", async (req, res) => {
  const { contactNo } = req.body;
  try {
    const user = await User.findOne({ contactNo });
    if (!user) {
      return res.status(404).json({ message: "User not found with this contact number." });
    }
    res.json({ securityQuestion: user.securityQuestion });
  } catch (err) {
    console.error("Verify user error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   POST /api/auth/reset-password
// @desc    Verify answer and reset password
router.post("/reset-password", async (req, res) => {
  const { contactNo, securityAnswer, newPassword } = req.body;
  try {
    const user = await User.findOne({ contactNo });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isMatch = await bcrypt.compare(securityAnswer.toLowerCase().trim(), user.securityAnswer);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect answer to security question." });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: "Password reset successful! You can now login." });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/auth/profile
// @desc    Get current user profile
const auth = require("../middleware/authMiddleware");
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
