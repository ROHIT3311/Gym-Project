// const { User } = require("../models/user");
// const { Workout } = require("../models/workout");
// const { AvailableTimeSlot } = require("../models/availableTime");
// const { formatTimeSlots } = require("../utils/formattedTimeSlots");
// const mongoose = require("mongoose");

// module.exports.availableWorkouts = async (req, res) => {
//   try {
//     const { coach, slot_id, date, sport_type } = req.query;

//     if (!date) {
//       return res.status(400).json({ message: "Date is required" });
//     }

//     const targetDate = new Date(date);
//     const startOfDay = new Date(targetDate);
//     startOfDay.setUTCHours(0, 0, 0, 0);

//     const endOfDay = new Date(targetDate);
//     endOfDay.setUTCHours(23, 59, 59, 999);

//     const slotObjectId = slot_id ? new mongoose.Types.ObjectId(slot_id) : null;
//     const allSlots = await AvailableTimeSlot.find();

//     // CASE 1 & 2: Coach is provided
//     if (coach) {
//       const coachObjectId = new mongoose.Types.ObjectId(coach);
//       const coachData = await User.findById(coachObjectId);

//       if (!coachData) {
//         return res.status(404).json({ message: "Coach not found" });
//       }

//       if (
//         sport_type &&
//         !coachData.specialization.some(
//           (s) => s.toLowerCase() === sport_type.toLowerCase()
//         )
//       ) {
//         return res
//           .status(200)
//           .json({ message: "No Workout Found for the given filter" });
//       }

//       const bookedSlots = await Workout.find({
//         coach: coachObjectId,
//         date: { $gte: startOfDay, $lt: endOfDay },
//         state: "SCHEDULED",
//       }).select("slot");

//       const bookedSlotIds = bookedSlots.map((w) => w.slot.toString());

//       const unbookedSlots = allSlots.filter(
//         (slot) => !bookedSlotIds.includes(slot._id.toString())
//       );

//       let orderedSlots = unbookedSlots;

//       if (slot_id) {
//         const isBooked = bookedSlotIds.includes(slot_id);
//         if (isBooked) {
//           return res
//             .status(200)
//             .json({ message: "No Workout Found for the given filter" });
//         }

//         const selectedSlot = unbookedSlots.find(
//           (slot) => slot._id.toString() === slot_id
//         );
//         const otherSlots = unbookedSlots.filter(
//           (slot) => slot._id.toString() !== slot_id
//         );
//         orderedSlots = selectedSlot
//           ? [selectedSlot, ...otherSlots]
//           : otherSlots;
//       }

//       const formattedTimeSlots = formatTimeSlots(orderedSlots);

//       const filteredCoachData = {
//         ...coachData.toObject(),
//         specialization: sport_type
//           ? coachData.specialization.filter(
//               (s) => s.toLowerCase() === sport_type.toLowerCase()
//             )
//           : coachData.specialization,
//       };

//       return res.status(200).json({
//         Coaches: filteredCoachData,
//         Available_Time_Slots: formattedTimeSlots,
//       });
//     }

//     // CASE 3: No specific coach → filter all coaches
//     let allCoaches = [];

//     if (sport_type) {
//       allCoaches = await User.find({
//         role: "coach",
//         specialization: {
//           $elemMatch: { $regex: new RegExp(`^${sport_type}$`, "i") },
//         },
//       });
//     } else {
//       allCoaches = await User.find({ role: "coach" });
//     }

//     const result = [];

//     for (const coach of allCoaches) {
//       const bookedSlots = await Workout.find({
//         coach: coach._id,
//         date: { $gte: startOfDay, $lt: endOfDay },
//         state: "SCHEDULED",
//       }).select("slot");

//       const bookedSlotIds = bookedSlots.map((w) => w.slot.toString());

//       const unbookedSlots = allSlots.filter(
//         (slot) => !bookedSlotIds.includes(slot._id.toString())
//       );

//       let orderedSlots = unbookedSlots;

//       if (slot_id && !bookedSlotIds.includes(slot_id)) {
//         const selectedSlot = unbookedSlots.find(
//           (slot) => slot._id.toString() === slot_id
//         );
//         const otherSlots = unbookedSlots.filter(
//           (slot) => slot._id.toString() !== slot_id
//         );
//         orderedSlots = selectedSlot
//           ? [selectedSlot, ...otherSlots]
//           : otherSlots;
//       }

//       const formattedTimeSlots = formatTimeSlots(orderedSlots);

//       const filteredCoach = {
//         ...coach.toObject(),
//         specialization: sport_type
//           ? coach.specialization.filter(
//               (s) => s.toLowerCase() === sport_type.toLowerCase()
//             )
//           : coach.specialization,
//       };

//       result.push({
//         Coaches: filteredCoach,
//         Available_Time_Slots: formattedTimeSlots,
//       });
//     }

//     return res.status(200).json(result);
//   } catch (error) {
//     console.error("Error in availableWorkouts:", error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };

const { User } = require("../models/user");
const { Workout } = require("../models/workout");
const { AvailableTimeSlot } = require("../models/availableTime");
const { formatTimeSlots } = require("../utils/formattedTimeSlots");
const mongoose = require("mongoose");

module.exports.availableWorkouts = async (req, res) => {
  try {
    let { coach, slot_id, date, sport_type } = req.query;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    // Normalize 'All' to null
    coach = coach === "All" ? null : coach;
    slot_id = slot_id === "All" ? null : slot_id;
    sport_type = sport_type === "All" ? null : sport_type;

    const targetDate = new Date(date);
    const startOfDay = new Date(targetDate);
    startOfDay.setUTCHours(0, 0, 0, 0);
    const endOfDay = new Date(targetDate);
    endOfDay.setUTCHours(23, 59, 59, 999);

    const allSlots = await AvailableTimeSlot.find();

    // Build coach query
    const coachQuery = { role: "coach" };
    if (coach) {
      coachQuery._id = new mongoose.Types.ObjectId(coach);
    }
    if (sport_type) {
      coachQuery.specialization = {
        $elemMatch: { $regex: new RegExp(`^${sport_type}$`, "i") },
      };
    }

    const coaches = await User.find(coachQuery);
    if (!coaches.length) {
      return res
        .status(200)
        .json({ message: "No Workout Found for the given filter" });
    }

    const result = [];

    for (const coachItem of coaches) {
      // Skip coach if sport_type filter doesn't match (extra check if direct query missed it)
      if (
        sport_type &&
        !coachItem.specialization.some(
          (s) => s.toLowerCase() === sport_type.toLowerCase()
        )
      ) {
        continue;
      }

      const bookedSlots = await Workout.find({
        coach: coachItem._id,
        date: { $gte: startOfDay, $lt: endOfDay },
        state: "SCHEDULED",
      }).select("slot");

      const bookedSlotIds = bookedSlots.map((w) => w.slot.toString());
      let unbookedSlots = allSlots.filter(
        (slot) => !bookedSlotIds.includes(slot._id.toString())
      );

      // Handle specific slot_id
      if (slot_id) {
        if (bookedSlotIds.includes(slot_id)) {
          continue; // This coach is not available at that slot
        }

        const selectedSlot = unbookedSlots.find(
          (slot) => slot._id.toString() === slot_id
        );
        const otherSlots = unbookedSlots.filter(
          (slot) => slot._id.toString() !== slot_id
        );
        unbookedSlots = selectedSlot
          ? [selectedSlot, ...otherSlots]
          : otherSlots;
      }

      if (!unbookedSlots.length) {
        continue;
      }

      const formattedTimeSlots = formatTimeSlots(unbookedSlots);

      const filteredCoach = {
        ...coachItem.toObject(),
        specialization: sport_type
          ? coachItem.specialization.filter(
              (s) => s.toLowerCase() === sport_type.toLowerCase()
            )
          : coachItem.specialization,
      };

      result.push({
        Coaches: filteredCoach,
        Available_Time_Slots: formattedTimeSlots,
      });
    }

    if (!result.length) {
      return res
        .status(200)
        .json({ message: "No Workout Found for the given filter" });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error in availableWorkouts:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
