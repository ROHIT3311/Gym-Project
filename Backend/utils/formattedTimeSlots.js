// utils/formatTimeSlots.js
const moment = require("moment-timezone");

const formatTimeSlots = (timeSlots) => {
  return timeSlots.map((slot) => {
    const start = moment(slot.startTime).tz("Asia/Kolkata").format("hh:mm A");
    const end = moment(slot.endTime).tz("Asia/Kolkata").format("hh:mm A");
    return {
      id: slot._id,
      time_slot: `${start}-${end}`,
    };
  });
};

module.exports = { formatTimeSlots };
