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
  },
  date: {
    type: Sequelize.DATE,
    allowNull: true,
    defaultValue: '2018-01-29 20:16:52.64-05'
  }
},
{
    scopes: {
      withTone: () => ({
      include: [{
        model: db.model('tone')
      }]
    })
  }
});

module.exports = Conversation
