const jwt = require("jsonwebtoken");
const md5 = require('md5');
const { Users } = require('../db/Models');
require('dotenv').config();

const SECRET = process.env.SECRET;

module.exports = async (req, res) => {
  let { username, password } = req.body;

  username = String(username).trim() || "";
  password = String(password) || "";

  if (!username || !password) {
    return res.json({
      error: "Invalid fields",
    });
  }


  const usernameFormated = String(username).trim();
  const passwordEncrypted = md5(String(password));

  try {
    const query = await Users.findAll({
      where: {
        username: usernameFormated,
      },
    });

    if (query.length >= 1) {
      return res.json({
        error: "User already exist",
      });
    }
  } catch (err) {
    return res.json({
      error: "Error on login, Try again",
    });
  }

  const tokenPayload = JSON.stringify({
    username: usernameFormated,
    password: passwordEncrypted,
  });

  const token = jwt.sign({
    data: tokenPayload,
  }, SECRET, { expiresIn: (60 * 60) * 5 }); // 5 hours

  try {
    const resDb = await Users.create({
      username: usernameFormated,
      password: passwordEncrypted,
    });

    if (resDb) {
      return res.json({
        error: "",
        token
      });
    } else {
      return res.json({
        error: "Error on signup, try again",
      });
    }
  } catch (err) {
    return res.json({
      error: "Error on signup, try again",
    });
  }
};
