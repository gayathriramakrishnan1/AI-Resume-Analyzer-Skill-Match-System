const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
require("dotenv").config();

// ✅ Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ========================
// 🔹 REGISTER / SIGNUP
// ========================
router.post("/register", async (req, res) => {
  try {
    let { name, email, password, role } = req.body;

    // Trim inputs
    name = name.trim();
    email = email.trim().toLowerCase();
    password = password.trim();

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Password strong validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and include a number, uppercase letter, lowercase letter, and special character",
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();

    // Send confirmation email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to Resume Analyzer ✅",
      html: `<h3>Hello ${name}!</h3>
      <p>Thanks for using Resume Analyzer.</p>
      <p>Please confirm your email by clicking the link below:</p>
      <a href="http://localhost:5000/auth/verify/${user._id}">Confirm Email</a>`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) console.error(err);
    });

    res.status(201).json({
      message: "Signup successful! Please check your email to verify account.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ========================
// 🔹 EMAIL VERIFICATION
// ========================
router.get("/verify/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("User not found");

    user.isVerified = true;
    await user.save();

    res.send("Email verified! You can now login.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// ========================
// 🔹 LOGIN
// ========================
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.trim().toLowerCase();
    password = password.trim();

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email/password" });

    if (!user.isVerified)
      return res.status(401).json({ message: "Please verify your email first" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email/password" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send Welcome Back email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Welcome Back to Resume Analyzer 👋",
      html: `<h3>Hello ${user.name}!</h3>
      <p>We noticed a successful login to your Resume Analyzer account.</p>
      <p>Welcome back! You can now continue analyzing resumes.</p>`
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) console.error("Failed to send login email:", err);
    });

    res.json({ token, role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;