const express = require("express");
const router = express.Router();
const multer = require("multer");
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

const Resume = require("../models/Resume");
const authMiddleware = require("../middleware/authMiddleware"); // 🔐 ADD THIS

// 📁 File upload setup
const upload = multer({ dest: "uploads/" });

/* =====================================================
   🔹 SINGLE RESUME ANALYSIS (Employee)
   POST /analyze
===================================================== */
router.post(
  "/",
// auth check removed
  upload.single("resume"),
  async (req, res) => {
    try {
      const filePath = req.file?.path;
      const { jobDesc } = req.body;

      if (!filePath || !jobDesc) {
        return res.status(400).json({ message: "Missing file or job role" });
      }

      const pythonScript = path.join(__dirname, "../../python/analyze.py");

      const python = spawn("python", [
        pythonScript,
        filePath,
        jobDesc,
      ]);

      let outputData = "";
      let errorData = "";

      python.stdout.on("data", (data) => {
        outputData += data.toString();
      });

      python.stderr.on("data", (data) => {
        errorData += data.toString();
      });

      python.on("close", async (code) => {
        // 🧹 Delete file after process closes
        try {
          if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        } catch (err) {
          console.error("File deletion error:", err);
        }

        if (errorData) {
          console.error("Python Output (stderr/warning):", errorData);
        }

        if (code !== 0) {
          return res.status(500).json({ 
            message: "Analysis script failed", 
            error: errorData 
          });
        }

        try {
          const parts = outputData.trim().split("|");
          if (parts.length < 3) {
             throw new Error("Invalid output format from analysis script");
          }

          const score = parts[0];
          const matched = parts[1];
          const missing = parts[2];

          // 💾 Save to DB (Handle failure gracefully)
          try {
            const newResume = new Resume({
              resumeText: req.file.originalname,
              jobDesc,
              score,
              matched,
              missing,
            });
            await newResume.save();
          } catch (dbErr) {
            console.error("Database Save Error (Analysis results not saved to history):", dbErr.message);
            // We continue anyway so the user gets their results!
          }

          res.json({
            score,
            matched,
            missing,
          });

        } catch (err) {
          console.error("Processing Error:", err);
          res.status(500).json({ message: "Failed to parse analysis results" });
        }
      });

    } catch (error) {
      console.error("Server Error:", error);
      if (!res.headersSent) {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
);


/* =====================================================
   🔥 MULTIPLE RESUME ANALYSIS (Organization)
   POST /analyze/multiple
===================================================== */
router.post(
  "/multiple",
// auth check removed
  upload.array("resumes", 10),
  async (req, res) => {
    try {
      const files = req.files;
      const { jobDesc } = req.body;

      if (!files || files.length === 0 || !jobDesc) {
        return res.status(400).json({ message: "Missing data" });
      }

      const pythonScript = path.join(__dirname, "../../python/analyze.py");

      let results = [];

      for (let file of files) {
        await new Promise((resolve, reject) => {
          const python = spawn("python", [
            pythonScript,
            file.path,
            jobDesc,
          ]);

          let outputData = "";
          let errorData = "";

          python.stdout.on("data", (data) => {
            outputData += data.toString();
          });

          python.stderr.on("data", (data) => {
            errorData += data.toString();
          });

          python.on("close", (code) => {
            // 🧹 Delete file
            try {
              if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
            } catch (err) {
              console.error("File deletion error:", err);
            }

            if (errorData) {
               console.error(`Python Warning for ${file.originalname}:`, errorData);
            }

            if (code !== 0) {
              results.push({
                file: file.originalname,
                error: "Analysis failed",
                score: 0,
                matched: "[]",
                missing: "[]"
              });
              return resolve();
            }

            try {
              const output = outputData.trim().split("|");
              if (output.length < 3) throw new Error("Invalid output");

              results.push({
                file: file.originalname,
                score: parseFloat(output[0]) || 0,
                matched: output[1],
                missing: output[2],
              });

              resolve();
            } catch (err) {
              console.error(`Parse error for ${file.originalname}:`, err);
              results.push({
                file: file.originalname,
                error: "Parse failed",
                score: 0,
                matched: "[]",
                missing: "[]"
              });
              resolve();
            }
          });
        });
      }

      // 🏆 SORT BY SCORE (HIGH → LOW)
      results.sort((a, b) => (b.score || 0) - (a.score || 0));

      res.json(results);

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;