const mongoose = require("mongoose");

const availableTimeSlotSchema = new mongoose.Schema({
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
});

const AvailableTimeSlot = mongoose.model(
  "AvailableTimeSlots",
  availableTimeSlotSchema
);

module.exports = { AvailableTimeSlot };
