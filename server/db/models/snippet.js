const Sequelize = require('sequelize');
const db = require('../db');

const Snippet = db.define('snippet', {
  text: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

module.exports = Snippet;
