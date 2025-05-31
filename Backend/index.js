const express = require("express");
const cookieParser = require("cookie-parser");
const { login, register, signout } = require("./controllers/auth.controller");
const connectDB = require("./utils/db");
const cors = require("cors");
const { registerValidation } = require("./validators/authValidators");
const { validationResult } = require("express-validator");
const { isAuthenticated } = require("./middlewares/isAuthenticated");
const {
  getAvailableTimeSlot,
} = require("./controllers/availableTime.controller");
const { getCoachesName } = require("./controllers/coachesName.controller");
const { sportsType } = require("./controllers/sports.controller");
const {
  availableWorkouts,
} = require("./controllers/availableWorkouts.controller");

const app = express();
connectDB();
require("dotenv").config();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true, // Allow credentials (cookies)
  })
);
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  console.log("Root Route");
});

// Auth Routes
app.post(
  "/auth/register",
  registerValidation,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next(); // Pass control to your register controller
  },
  register
);
app.post("/auth/login", login);
app.post("/signout", signout);
app.get("/auth/isAuthenticated", isAuthenticated);
app.get("/availableTimeSlots", getAvailableTimeSlot);
app.get("/coachesName", getCoachesName);
app.get("/getSportName", sportsType);
app.get("/getAvailableWorkouts", availableWorkouts);
app.listen(port, () => {
  console.log(`Server host on ${port}`);
});
