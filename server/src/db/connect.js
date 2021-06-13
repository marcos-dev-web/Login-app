const { Sequelize } = require('sequelize');
require('dotenv').config();

const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

const sequelize = new Sequelize({
  dialect: 'mysql',
  username: DB_USER,
  password: DB_PASS,
  database: 'login_app',
  host: '127.0.0.1'
});

module.exports = sequelize;

