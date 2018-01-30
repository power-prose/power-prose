const { User, WatchWord, Conversation, WatchWordOccurrence, Snippet, db } = require('../server/db/models')

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
  wordOrPhrase: 'i’m no expert but',
  countOfTimesUsed: 2
} , {
  wordOrPhrase: 'just',
  countOfTimesUsed: 3
} , {
  wordOrPhrase: 'does that make sense',
  countOfTimesUsed: 3
} , {
  wordOrPhrase: 'am I making sense',
  countOfTimesUsed: 2
} , {
  wordOrPhrase: 'i’m sorry',
  countOfTimesUsed: 4
} , {
  wordOrPhrase: 'i would just like to say',
  countOfTimesUsed: 1
} , {
  wordOrPhrase: 'i’m not sure but',
  countOfTimesUsed: 4
} , {
  wordOrPhrase: 'i’m no expert but',
  countOfTimesUsed: 3
} , {
  wordOrPhrase: 'just',
  countOfTimesUsed: 5
} , {
  wordOrPhrase: 'does that make sense',
  countOfTimesUsed: 2
} , {
  wordOrPhrase: 'am i making sense',
  countOfTimesUsed: 1
} , {
  wordOrPhrase: 'i’m sorry',
  countOfTimesUsed: 6
} , {
  wordOrPhrase: 'i would just like to say',
  countOfTimesUsed: 3
} , {
  wordOrPhrase: 'i’m not sure but',
  countOfTimesUsed: 4
} , {
  wordOrPhrase: 'i’m no expert but',
  countOfTimesUsed: 3
} , {
  wordOrPhrase: 'just',
  countOfTimesUsed: 4
} , {
  wordOrPhrase: 'does that make sense',
  countOfTimesUsed: 3
} , {
  wordOrPhrase: 'am I making sense',
  countOfTimesUsed: 2
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
