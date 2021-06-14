const jwt = require("jsonwebtoken");
const { Users, Remembers } = require('../db/Models');
require('dotenv').config();

const SECRET = process.env.SECRET;

const getData = async (data) => {
  const { username, password } = data;

  const query = await Users.findOne({
    attributes: ["id"],
    where: {
      username,
      password
    }
  });

  if (query !== null) {
    const allRemembers = await Remembers.findAll({
      attributes: ['title', 'text', 'id'],
      where: {
        identifier: query.dataValues.id,
      }
    })

    if (allRemembers.length === 0) {
      return {
        error: "You not have remembers!",
      };
    } else {
      return {
				error: "",
        data: allRemembers,
      };
    }
  } else {
    return {
      error: "User not exist",
    };
  }
}

module.exports = async (req, res) => {
  const token = req.query.token;

  if (!token) {
    return res.json({
      error: "Invalid token!",
    });
  }

  jwt.verify(String(token), SECRET, async (err, decoded) => {
    if (err) {
      return res.json({
        error: "Invalid token",
      });
    } else {
      const data = JSON.parse(decoded.data);
      const result = await getData(data);
      return res.json(result);
    }
  });
};
