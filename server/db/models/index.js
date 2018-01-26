const User = require('./user')
const WatchWord = require('./watchWord')
const db = require('../db.js')

// model associations

// all models exported here so that any time a module needs a model, we can require it from 'db/models'
module.exports = {
  User, WatchWord, db
}
