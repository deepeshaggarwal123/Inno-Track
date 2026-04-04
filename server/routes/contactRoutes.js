const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// @route   POST /api/contact
// @desc    Submit a contact form inquiry
router.post("/", async (req, res) => {
  const { firstName, lastName, email, subject, message } = req.body;

  try {
    const newContact = new Contact({
      firstName,
      lastName,
      email,
      subject,
      message,
    });

    await newContact.save();
    res.status(201).json({ message: "Inquiry submitted successfully!" });
  } catch (err) {
    console.error("Contact error:", err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
