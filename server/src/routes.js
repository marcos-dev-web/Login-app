const router = require('express').Router();
const jwt = require("jsonwebtoken");
const md5 = require('md5');
const { Users, Remembers } = require('./db/Models');

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
});

router.get('/api/remembers', async (req, res) => {
  const token = req.query.token;

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
          id: query.dataValues.id,
        }
      })

      if (allRemembers.length === 0) {
        console.log('oi')
        return {
          error: "You not have remembers!",
        };
      } else {
        return {
          data: allRemembers,
        };
      }
    } else {
      return {
        error: "User not exist",
      };
    }
  }

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
});

module.exports = router;