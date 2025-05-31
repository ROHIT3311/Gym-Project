const { User } = require("../models/user");

module.exports.getCoachesName = async (req, res) => {
  try {
    const coachesData = await User.find({ role: "coach" });
    const formattedCoaches = coachesData.map((coach) => ({
      id: coach._id,
      firstName: coach.firstName,
      lastName: coach.lastName,
    }));

    res.status(200).json({ coaches: formattedCoaches });
  } catch (error) {
    console.log(error);
    res.status(400).json("Something went wrong", error);
  }
};
