const Sequelize = require('sequelize');
const db = require('../db');

const Snippet = db.define('snippet', {
  text: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Snippet;
