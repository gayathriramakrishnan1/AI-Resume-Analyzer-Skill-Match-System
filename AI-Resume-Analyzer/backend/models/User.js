// models/User.js
const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Invalid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  role: {
    type: String,
    enum: ["fresher", "organization"],
    required: [true, "Role is required"],
  },
  isVerified: {
    type: Boolean,
    default: false, // ✅ tracks if user verified email
  },
}, { timestamps: true }); // optional: createdAt / updatedAt

module.exports = mongoose.model("User", userSchema);