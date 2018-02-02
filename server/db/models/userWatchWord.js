const Sequelize = require('sequelize');
const db = require('../db');

const UserWatchWord = db.define('userWatchWord', {
  wordOrPhrase: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
});

module.exports = UserWatchWord;
