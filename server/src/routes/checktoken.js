const jwt = require("jsonwebtoken");
require('dotenv').config();

const SECRET = process.env.SECRET;

module.exports = (req, res) => {
  
  const { token } = req.body;

  if (!token) {
    return res.json({
      error: "Empty token",
    });
  }
  
  jwt.verify(token, SECRET, (err, _) => {
    if (err) {
      return res.json({
        error: "Invalid token",
      });
    } else {
      return res.json({
        error: "",
      });
    }
  });
};