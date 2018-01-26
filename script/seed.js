const { User, WatchWord, Conversation, db } = require('../server/db/models')

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
  wordOrPhrase: 'Does that make sense?'
}, {
  wordOrPhrase: 'Am I making sense?'
}, {
  wordOrPhrase: 'I’m sorry'
}, {
  wordOrPhrase: 'I would just like to say'
}, {
  wordOrPhrase: 'I’m not sure but'
}];

const conversations = [{
  name: 'Report phone call',
  length: 34
} , {
  name: 'Quarterly report presentation with board',
  length: 62
} , {
  name: 'Buyers meeting',
  length: 44
} , {
  name: 'Phone call with direct reports',
  length: 23
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
