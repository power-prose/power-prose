const Sequelize = require('sequelize');
const db = require('../db');

const WatchWordOccurence = db.define('watchWordOccurence', {
  wordOrPhrase: {
    type: Sequelize.STRING,
    allowNull: false
  },
  countOfTimesUsed: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = WatchWordOccurence;
