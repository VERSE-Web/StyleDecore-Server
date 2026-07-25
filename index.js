require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Service = require("./models/Service");
const Decorator = require("./models/Decorator");
const Booking = require("./models/Booking");
const Review = require("./models/Review");

const app = express();
app.use(cors());
app.use(express.json());

// --- DB connection, cached across serverless invocations ---
let isConnected = false;
async function connectDB() {
  if (isConnected && mongoose.connection.readyState === 1) return;
  await mongoose.connect(process.env.MONGODB_URI);
  isConnected = true;
  console.log("✅ MongoDB Connected");
}

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    res.status(500).json({ error: "Database connection failed" });
  }
});

app.get("/", (req, res) => {
  res.send("Server Running");
});

// ---------- Services ----------
app.get("/services", async (req, res) => {
  try {
    res.json(await Service.find({}));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/services", async (req, res) => {
  try {
    res.status(201).json(await Service.create(req.body));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------- Decorators ----------
app.get("/decorators", async (req, res) => {
  try {
    res.json(await Decorator.find({}));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/decorators", async (req, res) => {
  try {
    res.status(201).json(await Decorator.create(req.body));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------- Bookings ----------
app.get("/bookings", async (req, res) => {
  try {
    res.json(await Booking.find({}));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/bookings", async (req, res) => {
  try {
    res.status(201).json(await Booking.create(req.body));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/bookings/:id", async (req, res) => {
  try {
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(req.params.id);
    const query = isObjectId
      ? { $or: [{ id: req.params.id }, { _id: req.params.id }] }
      : { id: req.params.id };
    const updated = await Booking.findOneAndUpdate(query, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Booking not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------- Reviews ----------
app.get("/reviews", async (req, res) => {
  try {
    res.json(await Review.find({}));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/reviews", async (req, res) => {
  try {
    res.status(201).json(await Review.create(req.body));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;

// Only start a listener for local development.
// On Vercel, this file is imported directly as the serverless function.
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
