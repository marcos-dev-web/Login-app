const { DataTypes } = require('sequelize');

const sequelize = require('./connect');

const Users = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

const Remembers = sequelize.define('remembers', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  identifier: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

(async () => {
  await Users.sync();
  await Remembers.sync();
})();

// this creates the tables if it doesn't exist (does nothing if already exist)

module.exports = {
  Users,
  Remembers,
};