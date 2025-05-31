const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    activity: {
      type: String,
      required: true,
    },
    coach: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // assuming coach is a user with role "coach"
      required: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // assuming client is also a user
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    slot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AvailableTimeSlots", // assuming slot is a separate model
      required: true,
    },
    state: {
      type: String,
      enum: ["SCHEDULED", "COMPLETED", "CANCELLED"],
      default: "SCHEDULED",
    },
    clientFeedback: {
      type: String,
      default: null,
    },
    coachFeedback: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = { Workout };
