const { User, Client, Coach, Admin } = require("../models/user");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();

module.exports.register = async (req, res) => {
  try {
    // Get all data from body
    const { firstName, lastName, email, password, ...rest } = req.body;

    // All data should exists
    if (!(firstName && lastName && email && password)) {
      res.status(400).send("All fields should exists");
    }

    // Check user role
    let role;
    if (email.endsWith("@gmail.com")) {
      role = "client";
    } else if (email.endsWith("@coach.com")) {
      role = "coach";
    } else if (email.endsWith("@admin.com")) {
      role = "admin";
    } else {
      res.status(400).send("Invalid Email");
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(401).send("User already Exists");
    }

    // encrypt password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Save user in database

    let user;
    if (role === "client") {
      user = await Client.create({
        firstName,
        lastName,
        email,
        role,
        password: encryptedPassword,
        ...rest,
      });
    } else if (role === "coach") {
      user = await Coach.create({
        firstName,
        lastName,
        email,
        role,
        password: encryptedPassword,
        ...rest,
      });
    } else {
      user = await Admin.create({ firstName, lastName, email, password, role });
    }

    // Generate token and send it to user
    const token = jwt.sign(
      {
        id: user._id,
        email,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "24h",
      }
    );

    user.token = token;
    user.password = undefined;

    res.status(201).json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      token: user.token,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.login = async (req, res) => {
  try {
    // Get all data from frontend
    const { email, password } = req.body;

    // Validation
    if (!(email && password)) {
      req.status(400).send("Email and Password should be exists");
    }

    // Find the user in DB
    const user = await User.findOne({ email });

    // If user is not there in DB
    if (!user) {
      req.status(404).send("User not found");
    }

    // Match the password
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "24h",
      });

      user.token = token;
      user.password = undefined;

      // Send token to user Cookie
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.status(200).cookie("token", token, options).json({
        success: true,
        token,
        user,
      });
    }

    // Match the password
  } catch (error) {
    console.log(error);
  }
};

module.exports.signout = async (req, res) => {
  try {
    if (!req.cookies.token) {
      res.status(404).json({ message: "User not logged in" });
    }

    console.log(req.cookies.token);
    res.clearCookie("token");
    return res.status(200).json({ message: "Signout Successful" });
  } catch (error) {
    console.log(error);
  }
};
