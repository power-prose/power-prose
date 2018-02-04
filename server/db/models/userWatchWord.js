const Sequelize = require('sequelize');
const db = require('../db');

const UserWatchWord = db.define('userWatchWord', {
  wordOrPhrase: {
    type: Sequelize.STRING,
    allowNull: false
  },
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
});

module.exports = UserWatchWord;
