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
  wordOrPhrase: 'i’m no expert but'
}, {
  wordOrPhrase: 'just'
}, {
  wordOrPhrase: 'does that make sense'
}, {
  wordOrPhrase: 'am i making sense'
}, {
  wordOrPhrase: 'i’m sorry'
}, {
  wordOrPhrase: 'i would just like to say'
}, {
  wordOrPhrase: 'i’m not sure but'
}];

const conversations = [{
  name: 'Report phone call',
  length: 34, userId: 1
} , {
  name: 'Quarterly report presentation with board',
  length: 62, userId: 1
} , {
  name: 'Buyers meeting',
  length: 44, userId: 1
} , {
  name: 'Phone call with direct reports',
  length: 23, userId: 1
} , {
  name: 'Potential partnership phone call',
  length: 31
} , {
  name: 'Presentation practice',
  length: 15
} , {
  name: 'Technical interview practice',
  length: 33
} , {
  name: 'Meeting with architects',
  length: 42
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
