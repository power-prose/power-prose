
const Sequelize = require('sequelize');
const db = require('../db');

const ToneSentence = db.define('toneSentence', {
  sentence: {
    type: Sequelize.STRING,
    allowNull: true
  },
  toneName: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

module.exports = ToneSentence
