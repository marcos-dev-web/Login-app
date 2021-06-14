const jwt = require('jsonwebtoken');
const { Users, Remembers } = require('../db/Models');
require('dotenv').config();

const SECRET = process.env.SECRET;

module.exports = {
  create: async (req, res) => {
    const { token, title, text } = req.body;

		if (!token) {
			return res.json({
				error: "Invalid token",
			});
		}

		if (!title && !text) {
			return res.json({
				error: "Empty fields",
			});
		}

    const getIdFromDb = async (username, password) => {
			const query = await Users.findOne({
				attributes: ['id'],
				where: {
					username,
					password
				}
			});

			return query.dataValues.id;
    }

    jwt.verify(String(token), SECRET, async (err, decoded) => {
      if (err) {
        return res.json({
          error: "Invalid token!",
        });
      }

      const result = JSON.parse(decoded.data);

			const id = await getIdFromDb(result.username, result.password);

			try {
				const resDb = await Remembers.create({
					identifier: id,
					title: String(title),
					text: String(text),
				});

				if (resDb) {
					return res.json({
						error: "",
						id: resDb.dataValues.id,
					});
				} else {
					return res.json({
						error: "Error on remember create, try again",
					});
				}
			} catch(err) {
				return res.json({
					error: "Error on remember create, try again",
				});
			}
    });
  },
  del: async (req, res) => {
		const { id, token } = req.body;

		if (!id || !token) {
			return res.json({
				error: "Empty fields",
			});
		}

		jwt.verify(token, SECRET, (err, _) => {
			if (err) {
				return res.json({
					error: "Invalid token",
				});
			}
		});

		try {
			const resDb = await Remembers.destroy({
				where: {
					id: id,
				},
			});

			if (resDb) {
				return res.json({
					error: "",
				});
			} else {
				return res.json({
					error: "This remember does not exist",
				});
			}

		} catch(err) {
			return res.json({
				error: "Error on remember delete, try again",
			});
		}
  },
};
