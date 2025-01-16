const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  telephone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bus: {
    type: DataTypes.STRING,
  },
  town: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  postcode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user',
  },
  package_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  feedback_day: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  is_started: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  start_date: {
    type: DataTypes.DATE,
  },
  is_package_extended: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  is_paused: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  paused_date: {
    type: DataTypes.DATE,
  },
  extended_weeks: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }
}, {
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    }
  }
});

module.exports = User; 