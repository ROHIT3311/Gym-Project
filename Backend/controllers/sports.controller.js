const { User } = require("../models/user");

module.exports.sportsType = async (req, res) => {
  try {
    const data = await User.find({ role: "coach" }, "specialization");

    // Flatten all specializations if each coach has an array of them
    const specializations = data.flatMap((coach) => coach.specialization);

    const uniqueSpecializations = [...new Set(specializations)];

    res.status(200).json({ specialization: uniqueSpecializations });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Something went wrong" });
  }
};
