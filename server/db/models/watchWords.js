const Sequelize = require('sequelize');
const db = require('../db');

const WatchWord = db.define('watchWords', {
  wordOrPhrase: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  }
});

module.exports = WatchWord;
