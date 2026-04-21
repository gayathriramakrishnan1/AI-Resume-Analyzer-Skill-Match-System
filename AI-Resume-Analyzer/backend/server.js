const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

/* ================================
   🔹 MIDDLEWARE
================================ */
app.use(cors());
app.use(express.json());

/* ================================
   🔹 STATIC FOLDER (Uploads Access)
================================ */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ================================
   🔹 ROUTES
================================ */
const authRoutes = require("./routes/auth");
const analyzeRoute = require("./routes/analyze");
const historyRoutes = require("./routes/history");

app.use("/auth", authRoutes);
app.use("/analyze", analyzeRoute);
app.use("/history", historyRoutes);

/* ================================
   🔹 DATABASE CONNECTION
================================ */
require("dotenv").config();
const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/resumeAnalyzerDB";

mongoose.connect(MONGO_URL)
  .then(() => console.log("MongoDB Connected 🔥"))
  .catch((err) => console.error("DB Error: MongoDB could not be connected. (Check your MONGO_URL in .env)"));

/* ================================
   🔹 SERVE FRONTEND (React App)
================================ */
const frontendPath = path.join(__dirname, "../frontend/build");
app.use(express.static(frontendPath));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

/* ================================
   🔹 GLOBAL ERROR HANDLER
================================ */
app.use((err, req, res, next) => {
  console.error("Global Error:", err.stack);
  res.status(500).json({
    message: "Something went wrong",
  });
});

/* ================================
   🔹 SERVER START
================================ */
const PORT = 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🔥 Server started on http://localhost:${PORT}`);
});