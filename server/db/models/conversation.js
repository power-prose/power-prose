const Sequelize = require('sequelize');
const db = require('../db');

const Conversation = db.define('conversation', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  length: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = Conversation
