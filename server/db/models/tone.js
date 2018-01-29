const Sequelize = require('sequelize');
const db = require('../db');

const Tone = db.define('tone', {
  anger: {
    type: Sequelize.DECIMAL,
    validate: {min: 0.0, max: 1},
    defaultValue: 0
  },
  fear: {
    type: Sequelize.DECIMAL,
    validate: {min: 0.0, max: 1},
    defaultValue: 0
  },
  joy: {
    type: Sequelize.DECIMAL,
    validate: {min: 0.0, max: 1},
    defaultValue: 0
  },
  sadness: {
    type: Sequelize.DECIMAL,
    validate: {min: 0.0, max: 1},
    defaultValue: 0
  },
  analytical: {
    type: Sequelize.DECIMAL,
    validate: {min: 0.0, max: 1},
    defaultValue: 0
  },
  confident: {
    type: Sequelize.DECIMAL,
    validate: {min: 0.0, max: 1},
    defaultValue: 0
  },
  tentative: {
    type: Sequelize.DECIMAL,
    validate: {min: 0.0, max: 1},
    defaultValue: 0
  },
});

module.exports = Tone
