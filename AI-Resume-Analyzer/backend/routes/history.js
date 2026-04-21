const express = require("express");
const router = express.Router();
const Resume = require("../models/Resume");

// 📄 Get all analysis history
router.get("/", async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ createdAt: -1 });
    res.json(resumes);
  } catch (error) {
    console.error("Fetch History Error:", error);
    res.status(500).json({ message: "Failed to fetch history" });
  }
});

// 🗑️ Delete an entry (Optional but good for management)
router.delete("/:id", async (req, res) => {
  try {
    await Resume.findByIdAndDelete(req.params.id);
    res.json({ message: "Entry deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete" });
  }
});

module.exports = router;
