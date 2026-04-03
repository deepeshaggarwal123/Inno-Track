const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

let MongoMemoryServer;
try {
  MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
} catch (e) {
  MongoMemoryServer = null;
}

const authRoutes = require("./routes/authRoutes");
const farmRoutes = require("./routes/farmRoutes");
const contactRoutes = require("./routes/contactRoutes"); // Add this line

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/smartfarming";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected to:", MONGO_URI);
  } catch (err) {
    console.warn("Local MongoDB Connection Error:", err.message);
    if (MongoMemoryServer) {
        console.log("Starting in-memory MongoDB for demonstration...");
        const mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
        console.log("MongoDB Connected to in-memory instance at:", uri);
    } else {
        console.error("Failed to connect to MongoDB and memory server is unavailable. Exiting.");
        process.exit(1);
    }
  }
};

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/farm", farmRoutes);
app.use("/api/contact", contactRoutes); // Add this line

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
