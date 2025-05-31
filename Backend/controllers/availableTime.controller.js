const { formatTimeSlots } = require("../utils/formattedTimeSlots");

const { AvailableTimeSlot } = require("../models/availableTime");
const moment = require("moment-timezone");
module.exports.getAvailableTimeSlot = async (req, res) => {
  try {
    const availableTimeSlots = await AvailableTimeSlot.find();
    const formattedTimeSlots = formatTimeSlots(availableTimeSlots);

    res.status(200).json({ time_slot: formattedTimeSlots });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
