const Sequelize = require('sequelize');
const db = require('../db');

const WatchWordOccurence = db.define('watchWordOccurence', {
  wordOrPhrase: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  countOfTimesUsed: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = WatchWordOccurence;
