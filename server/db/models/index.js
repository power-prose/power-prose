const User = require('./user');
const UserWatchWord = require('./userWatchWord');
const Conversation = require('./conversation');
const WatchWordOccurrence = require('./watchWordOccurrence');
const Snippet = require('./snippet')
const Tone = require('./tone');
const ToneSentence = require('./toneSentence');
const db = require('../db.js');

// ***** all models and the db are required to and exported from this file so that anytime a module needs a model, we can require it from 'db/models' ***** //

// ***** model associations ***** //
// association notes are here for developers' reference; we can delete once front end is complete if desired

// a user can have many watch words, and a single watch word can belong to many users
// UserWatchWords join table holds an instance for every association between a user and a watchWord
UserWatchWord.belongsTo(User)
User.hasMany(UserWatchWord)

// a user can have many conversations, and every conversation belongs to one user
// every conversation instance now has a foreignkey userId
User.hasMany(Conversation);
Conversation.belongsTo(User);

// a conversation can have many watchWordOccurences, and every watchWordOccurence belongs to one conversation
// every watchWordOccurrence instance now has a foreignkey conversationId
Conversation.belongsToMany(UserWatchWord, {through: WatchWordOccurrence});
UserWatchWord.belongsToMany(Conversation, {through: WatchWordOccurrence})

// a conversation can have many snippets
// every snippet instance now has a foreignkey conversationId
Conversation.hasMany(Snippet);
Snippet.belongsTo(Conversation);
Snippet.belongsTo(UserWatchWord);

Conversation.hasOne(Tone);
Tone.belongsTo(Conversation);

Conversation.hasMany(ToneSentence);
ToneSentence.belongsTo(Conversation);

module.exports = {
  User, UserWatchWord, Conversation, WatchWordOccurrence, Snippet, Tone, ToneSentence, db
};
