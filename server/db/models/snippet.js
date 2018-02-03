const Sequelize = require('sequelize');
const db = require('../db');

const Snippet = db.define('snippet', {
  text: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  word: {
    type: Sequelize.STRING,
    allowNull: true
  },
  index: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
});

module.exports = Snippet;
