const router = require('express').Router();
const jwt = require("jsonwebtoken");
const md5 = require('md5');
const { Users } = require('./db/Models');

require('dotenv').config();

const SECRET = process.env.SECRET;

router.post('/api/signup', async (req, res) => {
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

  const token = jwt.sign({
    data: `${usernameFormated}${passwordEncrypted}`,
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
});

router.post('/api/signin', async (req, res) => {
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
      const token = jwt.sign({
        data: `${usernameFormated}${passwordEncrypted}`,
      }, SECRET, { expiresIn: (60 * 60) * 5 }); // 5 hours

      return res.json({
        error: '',
        token,
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
});

router.post('/api/checktoken', (req, res) => {
  
  const { token } = req.body;

  if (!token) {
    return res.json({
      error: "Empty token",
    });
  }
  
  jwt.verify(token, SECRET, (err, decoded) => {
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
});

router.get('/api/remembers', (req, res) => {
  return res.json({
    path: '/api/remembers',
  });
});

module.exports = router;