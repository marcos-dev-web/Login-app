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
    const query = await Users.findOne({
      where: {
        username: usernameFormated,
        password: passwordEncrypted,
      },
    });

    if (query !== null) {
      const tokenPayload = JSON.stringify({
        username: usernameFormated,
        password: passwordEncrypted,
      });

      const token = jwt.sign({
        data: tokenPayload,
      }, SECRET, { expiresIn: (60 * 60) * 5 }); // 5 hours

      return res.json({
        error: '',
        token,
				username: usernameFormated,
      })
    } else {
      return res.json({
        error: "User and/or password not found!",
      });
    }
  } catch (err) {
    return res.json({
      error: "User and/or password not found!",
    });
  }
};
