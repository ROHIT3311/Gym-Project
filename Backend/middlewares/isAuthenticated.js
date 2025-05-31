const jwt = require("jsonwebtoken");

module.exports.isAuthenticated = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not Authenticated" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.user = decoded;
    res.status(200).json({ success: true, user: decoded });
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};
