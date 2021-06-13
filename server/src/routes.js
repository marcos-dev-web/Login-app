const router = require('express').Router();
const jwt = require("jsonwebtoken");
const md5 = require('md5');
const { Users } = require('./db/Models');

require('dotenv').config();

const SECRET = process.env.SECRET;

router.post('/api/signup', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({
      error: "Invalid fields",
    });
  }

  const passwordEncrypted = md5(String(password));

  const token = jwt.sign({
    data: `${username}${passwordEncrypted}`,
  }, SECRET, { expiresIn: (60 * 60) * 5 }); // 5 hours

  try {
    const resDb = await Users.create({
      username,
      password: md5(String(passwordEncrypted)),
    });

    if (resDb) {
      return res.json({
        error: "",
        token
      });
    } else {
      return res.json({
        error: "Error on signup [1]",
      });
    }
  } catch (err) {
    return res.json({
      error: "Error on signup [2]",
    });
  }
});

router.post('/api/signin', (req, res) => {
  const { username, password } = req.body;

  return res.json({
    path: '/api/signin',
  });
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