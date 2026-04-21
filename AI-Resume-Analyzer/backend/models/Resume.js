const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema({
  resumeText: {
    type: String,
  },
  jobDesc: {
    type: String,
  },
  score: {
    type: String,
  },
  matched: {
    type: String,
  },
  missing: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Resume", ResumeSchema);