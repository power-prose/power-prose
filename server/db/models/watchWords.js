const Sequelize = require('sequelize');
const db = require('../db');

module.exports = WatchWords;

const WatchWords = db.define('watchWords', {
  wordOrPhrase: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  }
})
