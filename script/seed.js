const { User, WatchWord, Conversation, WatchWordOccurrence, Tone, Snippet, db } = require('../server/db/models')

const users = [{
  email: '12345@gmail.com',
  password: 'testpassword1',
  salt: 'not_sure?',
  googleId: '12345',
  firstName: 'Jacquelyn',
  lastName: 'Wax'
}, {
  email: '23456@gmail.com',
  password: 'testpassword2',
  salt: 'not_sure?',
  googleId: '23455',
  firstName: 'Hannah',
  lastName: 'Weber'
}, {
  email: '34567@gmail.com',
  password: 'testpassword3',
  salt: 'not_sure?',
  googleId: '34567',
  firstName: 'Ann',
  lastName: 'Layman'
} , {
  email: '45678@gmail.com',
  password: 'testpassword4',
  salt: 'not_sure?',
  googleId: '45678',
  firstName: 'Lyssa',
  lastName: 'Stiller'
}];

const watchWords = [{
  wordOrPhrase: 'I’m no expert but'
}, {
  wordOrPhrase: 'Just'
}, {
  wordOrPhrase: 'Does that make sense'
}, {
  wordOrPhrase: 'Am i making sense'
}, {
  wordOrPhrase: 'I’m sorry'
}, {
  wordOrPhrase: 'I would just like to say'
}, {
  wordOrPhrase: 'I’m not sure but'
}, {
  wordOrPhrase: 'I would just like to ask'
} , {
  wordOrPhrase: 'I was wondering'
}];

const conversations = [{
  name: 'Report phone call',
  length: 34, userId: 1, date: '2018-01-29 20:16:52.64-05'
} , {
  name: 'Quarterly report presentation with board',
  length: 62, userId: 1, date: '2017-12-21 15:16:52.64-05'
} , {
  name: 'Buyers meeting',
  length: 44, userId: 1, date: '2017-12-07 14:16:52.64-05'
} , {
  name: 'Phone call with direct reports',
  length: 23, userId: 1, date: '2017-11-29 15:16:52.64-05'
} , {
  name: 'Potential partnership phone call',
  length: 31, userId: 1, date: '2017-11-13 17:16:52.64-05'
} , {
  name: 'Presentation practice',
  length: 15, userId: 1, date: '2017-10-23 15:16:52.64-05'
} , {
  name: 'Technical interview practice',
  length: 33, userId: 1, date: '2017-10-13 17:16:52.64-05'
} , {
  name: 'Meeting with architects',
  length: 42, userId: 1, date: '2017-9-29 11:16:52.64-05'
} , {
  name: 'Report phone call',
  length: 34, userId: 2, date: '2018-01-22 20:16:52.64-05'
} , {
  name: 'Quarterly report presentation with board',
  length: 62, userId: 2, date: '2017-12-23 15:16:52.64-05'
} , {
  name: 'Buyers meeting',
  length: 44, userId: 2, date: '2017-12-05 14:16:52.64-05'
} , {
  name: 'Phone call with direct reports',
  length: 23, userId: 2, date: '2017-11-24 15:16:52.64-05'
} , {
  name: 'Potential partnership phone call',
  length: 31, userId: 2, date: '2017-11-12 17:16:52.64-05'
} , {
  name: 'Presentation practice',
  length: 15, userId: 2, date: '2017-10-13 15:16:52.64-05'
} , {
  name: 'Technical interview practice',
  length: 33, userId: 2, date: '2017-10-01 17:16:52.64-05'
} , {
  name: 'Meeting with architects',
  length: 42, userId: 2, date: '2017-9-27 11:16:52.64-05'
}];

const watchWordOccurrences = [{
  watchWordId: 1,
  countOfTimesUsed: 1,
  conversationId: 1
} , {
  watchWordId: 3,
  countOfTimesUsed: 4,
  conversationId: 1
} , {
  watchWordId: 2,
  countOfTimesUsed: 3,
  conversationId: 1
} , {
  watchWordId: 4,
  countOfTimesUsed: 2,
  conversationId: 1
} , {
  watchWordId: 5,
  countOfTimesUsed: 6,
  conversationId: 1
} , {
  watchWordId: 6,
  countOfTimesUsed: 1,
  conversationId: 1
} , {
  watchWordId: 7,
  countOfTimesUsed: 2,
  conversationId: 1
} , {
  watchWordId: 8,
  countOfTimesUsed: 1,
  conversationId: 1
} , {
  watchWordId: 9,
  countOfTimesUsed: 3,
  conversationId: 1
} , {
  watchWordId: 3,
  countOfTimesUsed: 5,
  conversationId: 2
} , {
  watchWordId: 2,
  countOfTimesUsed: 2,
  conversationId: 2
} , {
  watchWordId: 4,
  countOfTimesUsed: 1,
  conversationId: 2
} , {
  watchWordId: 5,
  countOfTimesUsed: 6,
  conversationId: 2
} , {
  watchWordId: 6,
  countOfTimesUsed: 3,
  conversationId: 2
} , {
  watchWordId: 7,
  countOfTimesUsed: 4,
  conversationId: 2
} , {
  watchWordId: 1,
  countOfTimesUsed: 3,
  conversationId: 2
} , {
  watchWordId: 3,
  countOfTimesUsed: 4,
  conversationId: 3
} , {
  watchWordId: 2,
  countOfTimesUsed: 2,
  conversationId: 3
} , {
  watchWordId: 4,
  countOfTimesUsed: 2,
  conversationId: 3
} , {
  watchWordId: 5,
  countOfTimesUsed: 3,
  conversationId: 3
} , {
  watchWordId: 6,
  countOfTimesUsed: 6,
  conversationId: 3
} , {
  watchWordId: 7,
  countOfTimesUsed: 4,
  conversationId: 3
} , {
  watchWordId: 1,
  countOfTimesUsed: 1,
  conversationId: 3
} , , {
  watchWordId: 8,
  countOfTimesUsed: 1,
  conversationId: 3
} , {
  watchWordId: 9,
  countOfTimesUsed: 1,
  conversationId: 3
} , {
  watchWordId: 3,
  countOfTimesUsed: 4,
  conversationId: 3
} , {
  watchWordId: 2,
  countOfTimesUsed: 2,
  conversationId: 3
} , {
  watchWordId: 4,
  countOfTimesUsed: 2,
  conversationId: 3
} , {
  watchWordId: 5,
  countOfTimesUsed: 3,
  conversationId: 3
} , {
  watchWordId: 6,
  countOfTimesUsed: 6,
  conversationId: 3
} , {
  watchWordId: 7,
  countOfTimesUsed: 4,
  conversationId: 3
} , {
  watchWordId: 1,
  countOfTimesUsed: 1,
  conversationId: 3
} , {
  watchWordId: 8,
  countOfTimesUsed: 1,
  conversationId: 3
} , {
  watchWordId: 9,
  countOfTimesUsed: 1,
  conversationId: 3
} , {
  watchWordId: 3,
  countOfTimesUsed: 4,
  conversationId: 3
} , {
  watchWordId: 2,
  countOfTimesUsed: 2,
  conversationId: 3
} , {
  watchWordId: 4,
  countOfTimesUsed: 2,
  conversationId: 3
} , {
  watchWordId: 5,
  countOfTimesUsed: 3,
  conversationId: 3
} , {
  watchWordId: 6,
  countOfTimesUsed: 6,
  conversationId: 3
} , {
  watchWordId: 7,
  countOfTimesUsed: 4,
  conversationId: 3
} , {
  watchWordId: 1,
  countOfTimesUsed: 1,
  conversationId: 3
} , , {
  watchWordId: 8,
  countOfTimesUsed: 1,
  conversationId: 3
} , {
  watchWordId: 9,
  countOfTimesUsed: 1,
  conversationId: 3
} , {
  watchWordId: 3,
  countOfTimesUsed: 2,
  conversationId: 4
} , {
  watchWordId: 2,
  countOfTimesUsed: 1,
  conversationId: 4
} , {
  watchWordId: 4,
  countOfTimesUsed: 1,
  conversationId: 4
} , {
  watchWordId: 5,
  countOfTimesUsed: 4,
  conversationId: 4
} , {
  watchWordId: 6,
  countOfTimesUsed: 2,
  conversationId: 4
} , {
  watchWordId: 7,
  countOfTimesUsed: 2,
  conversationId: 4
} , {
  watchWordId: 1,
  countOfTimesUsed: 3,
  conversationId: 4
} , {
  watchWordId: 8,
  countOfTimesUsed: 1,
  conversationId: 4
} , {
  watchWordId: 9,
  countOfTimesUsed: 2,
  conversationId: 4
} , {
  watchWordId: 3,
  countOfTimesUsed: 3,
  conversationId: 5
} , {
  watchWordId: 2,
  countOfTimesUsed: 4,
  conversationId: 5
} , {
  watchWordId: 4,
  countOfTimesUsed: 1,
  conversationId: 5
} , {
  watchWordId: 6,
  countOfTimesUsed: 2,
  conversationId: 5
} , {
  watchWordId: 7,
  countOfTimesUsed: 1,
  conversationId: 5
} , {
  watchWordId: 1,
  countOfTimesUsed: 2,
  conversationId: 5
} , {
  watchWordId: 9,
  countOfTimesUsed: 1,
  conversationId: 5
} , {
  watchWordId: 2,
  countOfTimesUsed: 3,
  conversationId: 6
} , {
  watchWordId: 4,
  countOfTimesUsed: 2,
  conversationId: 6
} , {
  watchWordId: 5,
  countOfTimesUsed: 2,
  conversationId: 6
} , {
  watchWordId: 6,
  countOfTimesUsed: 3,
  conversationId: 6
} , {
  watchWordId: 1,
  countOfTimesUsed: 4,
  conversationId: 6
} , {
  watchWordId: 8,
  countOfTimesUsed: 2,
  conversationId: 6
} , {
  watchWordId: 9,
  countOfTimesUsed: 3,
  conversationId: 6
} , {
  watchWordId: 3,
  countOfTimesUsed: 3,
  conversationId: 7
} , {
  watchWordId: 2,
  countOfTimesUsed: 1,
  conversationId: 7
} , {
  watchWordId: 4,
  countOfTimesUsed: 2,
  conversationId: 7
} , {
  watchWordId: 5,
  countOfTimesUsed: 3,
  conversationId: 7
} , {
  watchWordId: 6,
  countOfTimesUsed: 6,
  conversationId: 7
} , {
  watchWordId: 7,
  countOfTimesUsed: 4,
  conversationId: 7
} , {
  watchWordId: 1,
  countOfTimesUsed: 2,
  conversationId: 7
} , {
  watchWordId: 9,
  countOfTimesUsed: 3,
  conversationId: 7
} , {
  watchWordId: 3,
  countOfTimesUsed: 2,
  conversationId: 8
} , {
  watchWordId: 2,
  countOfTimesUsed: 1,
  conversationId: 8
} , {
  watchWordId: 4,
  countOfTimesUsed: 2,
  conversationId: 8
} , {
  watchWordId: 5,
  countOfTimesUsed: 5,
  conversationId: 8
} , {
  watchWordId: 6,
  countOfTimesUsed: 1,
  conversationId: 8
} , {
  watchWordId: 7,
  countOfTimesUsed: 4,
  conversationId: 8
} , {
  watchWordId: 1,
  countOfTimesUsed: 2,
  conversationId: 8
} , {
  watchWordId: 8,
  countOfTimesUsed: 2,
  conversationId: 8
}];

const tones = [{
  anger: .1,
  fear: .6,
  joy: .7,
  sadness: .5,
  analytical: .6,
  confident: .2,
  tentative: .6
  conversationId: 1
} , {
  anger: .1,
  fear: .6,
  joy: .7,
  sadness: .5,
  analytical: .6,
  confident: .2,
  tentative: .6
  conversationId: 2
} , {
  anger: .1,
  fear: .6,
  joy: .7,
  sadness: .5,
  analytical: .6,
  confident: .2,
  tentative: .6
  conversationId: 3
} , {
  anger: .3,
  fear: .7,
  joy: .3,
  sadness: .4,
  analytical: .4,
  confident: .2,
  tentative: .5
  conversationId: 4
} , {
  anger: .2,
  fear: .3,
  joy: .6,
  sadness: .5,
  analytical: .8,
  confident: .3,
  tentative: .4
  conversationId: 5
} , {
  anger: .1,
  fear: .2,
  joy: .4,
  sadness: .4,
  analytical: .2,
  confident: .3,
  tentative: .4
  conversationId: 6
} , {
  anger: .1,
  fear: .6,
  joy: .6,
  sadness: .4,
  analytical: .8,
  confident: .3,
  tentative: .8
  conversationId: 7
} , {
  anger: .1,
  fear: .6,
  joy: .7,
  sadness: .5,
  analytical: .6,
  confident: .2,
  tentative: .6
  conversationId: 8
}];

const snippets = [{
  text: ' ... i’m no expert but I think we might want to consider ...'
} , {
  text: '... i’m no expert but what I would suggest is ... '
} , {
  text: '... i just want to say that i’m on board with that ...'
} , {
  text: '... i’m just not sure that’s the best approach'
} , {
  text: ' ... i’m just not sure that’s the way to go'
}];

// const tones = [{
//   conversationId: 1, joy: 0.8, anger: 0.7
// }]

const seed = () =>
  Promise.all(users.map(user =>
    User.create(user))
  )
  .then(() =>
  Promise.all(watchWords.map(watchWord =>
    WatchWord.create(watchWord))
  ))
  .then(() =>
  Promise.all(conversations.map(conversation =>
    Conversation.create(conversation))
  ))
  .then(() =>
  Promise.all(watchWordOccurrences.map(watchWordOccurrence =>
    WatchWordOccurrence.create(watchWordOccurrence))
  ))
  .then(() =>
  Promise.all(tones.map(tone =>
    Tone.create(tone))
  ))
  .then(() =>
  Promise.all(snippets.map(snippet =>
    Snippet.create(snippet))
  // ))
  // .then(() =>
  // Promise.all(tones.map(tone =>
  //   tone.create(tone))
  ));

const main = () => {
  console.log('Syncing db...');
  db.sync({force: true})
    .then(() => {
      console.log('Seeding databse...');
      return seed();
    })
    .catch(err => {
      console.log('Error while seeding');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();
