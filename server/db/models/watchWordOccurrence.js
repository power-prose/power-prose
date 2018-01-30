const Sequelize = require('sequelize');
const db = require('../db');

const WatchWordOccurence = db.define('watchWordOccurence', {
  countOfTimesUsed: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = WatchWordOccurence;
