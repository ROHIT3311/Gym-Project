const mongoose = require("mongoose");

const options = { discriminatorKey: "role", timestamps: true };

// 🔹 Base User schema
const baseUserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
  options
);

// 🔹 Create base model
const User = mongoose.model("User", baseUserSchema);

// 🔹 Define discriminators
const Client = User.discriminator(
  "client",
  new mongoose.Schema({
    preferable_activity: { type: String },
    target: { type: String },
  })
);

const Coach = User.discriminator(
  "coach",
  new mongoose.Schema({
    specialization: [{ type: String, required: true }],
    certificates: [{ type: String }],
  })
);

const Admin = User.discriminator("admin", new mongoose.Schema({}));

module.exports = { User, Client, Coach, Admin };
