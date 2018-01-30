const Sequelize = require('sequelize');
const db = require('../db');

const WatchWordOccurrence = db.define('watchWordOccurrence', {
  countOfTimesUsed: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = WatchWordOccurrence;
