const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

const app = express();

// ✅ CORS: allow local dev + Vercel frontend
app.use(
  cors({
    origin: [
      "http://localhost:3000", // dev
      "https://mern-fedback-client-c5yvjo7qy-varunikhajp-1588s-projects.vercel.app" // production
    ],
    credentials: true
  })
);

app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/feedback", feedbackRoutes);

// PORT
const PORT = process.env.PORT || 5000;

// CONNECT MONGODB + START SERVER
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });

