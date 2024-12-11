const jwt = require("jsonwebtoken");
const db = require("../config/db");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization; // Correct way to access the header
  const token = authHeader && authHeader.split(' ')[1]; // Extract the token from "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, db.jwtSecret, (error, decode) => {
    if (error) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.userId = decode.id;
    next();
  });
};
