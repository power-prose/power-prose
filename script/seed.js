const { User, UserWatchWord, Conversation, WatchWordOccurrence, Tone, Snippet, ToneSentence, db } = require('../server/db/models')

const users = [{
  email: 'julie@gmail.com',
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
}, {
  email: '45678@gmail.com',
  password: 'testpassword4',
  salt: 'not_sure?',
  googleId: '45678',
  firstName: 'Lyssa',
  lastName: 'Stiller'
}];

const userWatchWords = [{
  wordOrPhrase: "no expert",
  userId: 1,
  active: false
}, {
  wordOrPhrase: 'Just',
  userId: 1
}, {
  wordOrPhrase: 'Does that make sense',
  userId: 1
}, {
  wordOrPhrase: 'Am I making sense',
  userId: 1
}, {
  wordOrPhrase: "sorry",
  userId: 1
}, {
  wordOrPhrase: 'just like to say',
  userId: 1
}, {
  wordOrPhrase: "not sure",
  userId: 1
}, {
  wordOrPhrase: 'just like to ask',
  userId: 1
}, {
  wordOrPhrase: 'I was wondering',
  userId: 2
}];

const conversations = [{
  name: 'Report phone call',
  length: 34, userId: 1, date: '2018-01-29 20:16:52.64-05'
}, {
  name: 'Quarterly report presentation with board',
  length: 62, userId: 1, date: '2017-12-21 15:16:52.64-05'
}, {
  name: 'Buyers meeting',
  length: 44, userId: 1, date: '2017-12-07 14:16:52.64-05'
}, {
  name: 'Phone call with direct reports',
  length: 23, userId: 1, date: '2017-11-29 15:16:52.64-05'
}, {
  name: 'Potential partnership phone call',
  length: 31, userId: 1, date: '2017-11-13 17:16:52.64-05'
}, {
  name: 'Presentation practice',
  length: 15, userId: 1, date: '2017-10-23 15:16:52.64-05'
}, {
  name: 'Technical interview practice',
  length: 33, userId: 1, date: '2017-10-13 17:16:52.64-05'
}, {
  name: 'Meeting with architects',
  length: 42, userId: 1, date: '2017-9-29 11:16:52.64-05'
}, {
  name: 'Report phone call',
  length: 34, userId: 2, date: '2018-01-22 20:16:52.64-05'
}, {
  name: 'Quarterly report presentation with board',
  length: 62, userId: 2, date: '2017-12-23 15:16:52.64-05'
}, {
  name: 'Buyers meeting',
  length: 44, userId: 2, date: '2017-12-05 14:16:52.64-05'
}, {
  name: 'Phone call with direct reports',
  length: 23, userId: 2, date: '2017-11-24 15:16:52.64-05'
}, {
  name: 'Potential partnership phone call',
  length: 31, userId: 2, date: '2017-11-12 17:16:52.64-05'
}, {
  name: 'Presentation practice',
  length: 15, userId: 2, date: '2017-10-13 15:16:52.64-05'
}, {
  name: 'Technical interview practice',
  length: 33, userId: 2, date: '2017-10-01 17:16:52.64-05'
}, {
  name: 'Meeting with architects',
  length: 42, userId: 2, date: '2017-9-27 11:16:52.64-05'
}];

const watchWordOccurrences = [{
  userWatchWordId: 1,
  countOfTimesUsed: 1,
  conversationId: 1
}, {
  userWatchWordId: 3,
  countOfTimesUsed: 4,
  conversationId: 1
}, {
  userWatchWordId: 2,
  countOfTimesUsed: 3,
  conversationId: 1
}, {
  userWatchWordId: 4,
  countOfTimesUsed: 2,
  conversationId: 1
}, {
  userWatchWordId: 5,
  countOfTimesUsed: 6,
  conversationId: 1
}, {
  userWatchWordId: 6,
  countOfTimesUsed: 1,
  conversationId: 1
}, {
  userWatchWordId: 7,
  countOfTimesUsed: 2,
  conversationId: 1
}, {
  userWatchWordId: 8,
  countOfTimesUsed: 1,
  conversationId: 1
}, {
  userWatchWordId: 9,
  countOfTimesUsed: 3,
  conversationId: 1
}, {
  userWatchWordId: 3,
  countOfTimesUsed: 5,
  conversationId: 2
}, {
  userWatchWordId: 2,
  countOfTimesUsed: 2,
  conversationId: 2
}, {
  userWatchWordId: 4,
  countOfTimesUsed: 1,
  conversationId: 2
}, {
  userWatchWordId: 5,
  countOfTimesUsed: 6,
  conversationId: 2
}, {
  userWatchWordId: 6,
  countOfTimesUsed: 3,
  conversationId: 2
}, {
  userWatchWordId: 7,
  countOfTimesUsed: 4,
  conversationId: 2
}, {
  userWatchWordId: 1,
  countOfTimesUsed: 3,
  conversationId: 2
}, {
  userWatchWordId: 3,
  countOfTimesUsed: 4,
  conversationId: 3
}, {
  userWatchWordId: 2,
  countOfTimesUsed: 2,
  conversationId: 3
}, {
  userWatchWordId: 4,
  countOfTimesUsed: 2,
  conversationId: 3
}, {
  userWatchWordId: 5,
  countOfTimesUsed: 3,
  conversationId: 3
}, {
  userWatchWordId: 6,
  countOfTimesUsed: 6,
  conversationId: 3
}, {
  userWatchWordId: 7,
  countOfTimesUsed: 4,
  conversationId: 3
}, {
  userWatchWordId: 1,
  countOfTimesUsed: 1,
  conversationId: 3
}, , {
  userWatchWordId: 8,
  countOfTimesUsed: 1,
  conversationId: 3
}, {
  userWatchWordId: 9,
  countOfTimesUsed: 1,
  conversationId: 3
}, {
  userWatchWordId: 3,
  countOfTimesUsed: 2,
  conversationId: 4
}, {
  userWatchWordId: 2,
  countOfTimesUsed: 1,
  conversationId: 4
}, {
  userWatchWordId: 4,
  countOfTimesUsed: 1,
  conversationId: 4
}, {
  userWatchWordId: 5,
  countOfTimesUsed: 4,
  conversationId: 4
}, {
  userWatchWordId: 6,
  countOfTimesUsed: 2,
  conversationId: 4
}, {
  userWatchWordId: 7,
  countOfTimesUsed: 2,
  conversationId: 4
}, {
  userWatchWordId: 1,
  countOfTimesUsed: 3,
  conversationId: 4
}, {
  userWatchWordId: 8,
  countOfTimesUsed: 1,
  conversationId: 4
}, {
  userWatchWordId: 9,
  countOfTimesUsed: 2,
  conversationId: 4
}, {
  userWatchWordId: 3,
  countOfTimesUsed: 3,
  conversationId: 5
}, {
  userWatchWordId: 2,
  countOfTimesUsed: 4,
  conversationId: 5
}, {
  userWatchWordId: 4,
  countOfTimesUsed: 1,
  conversationId: 5
}, {
  userWatchWordId: 6,
  countOfTimesUsed: 2,
  conversationId: 5
}, {
  userWatchWordId: 7,
  countOfTimesUsed: 1,
  conversationId: 5
}, {
  userWatchWordId: 1,
  countOfTimesUsed: 2,
  conversationId: 5
}, {
  userWatchWordId: 9,
  countOfTimesUsed: 1,
  conversationId: 5
}, {
  userWatchWordId: 2,
  countOfTimesUsed: 3,
  conversationId: 6
}, {
  userWatchWordId: 4,
  countOfTimesUsed: 2,
  conversationId: 6
}, {
  userWatchWordId: 5,
  countOfTimesUsed: 2,
  conversationId: 6
}, {
  userWatchWordId: 6,
  countOfTimesUsed: 3,
  conversationId: 6
}, {
  userWatchWordId: 1,
  countOfTimesUsed: 4,
  conversationId: 6
}, {
  userWatchWordId: 8,
  countOfTimesUsed: 2,
  conversationId: 6
}, {
  userWatchWordId: 9,
  countOfTimesUsed: 3,
  conversationId: 6
}, {
  userWatchWordId: 3,
  countOfTimesUsed: 3,
  conversationId: 7
}, {
  userWatchWordId: 2,
  countOfTimesUsed: 1,
  conversationId: 7
}, {
  userWatchWordId: 4,
  countOfTimesUsed: 2,
  conversationId: 7
}, {
  userWatchWordId: 5,
  countOfTimesUsed: 3,
  conversationId: 7
}, {
  userWatchWordId: 6,
  countOfTimesUsed: 6,
  conversationId: 7
}, {
  userWatchWordId: 7,
  countOfTimesUsed: 4,
  conversationId: 7
}, {
  userWatchWordId: 1,
  countOfTimesUsed: 2,
  conversationId: 7
}, {
  userWatchWordId: 9,
  countOfTimesUsed: 3,
  conversationId: 7
}, {
  userWatchWordId: 3,
  countOfTimesUsed: 2,
  conversationId: 8
}, {
  userWatchWordId: 2,
  countOfTimesUsed: 1,
  conversationId: 8
}, {
  userWatchWordId: 4,
  countOfTimesUsed: 2,
  conversationId: 8
}, {
  userWatchWordId: 5,
  countOfTimesUsed: 5,
  conversationId: 8
}, {
  userWatchWordId: 6,
  countOfTimesUsed: 1,
  conversationId: 8
}, {
  userWatchWordId: 7,
  countOfTimesUsed: 4,
  conversationId: 8
}, {
  userWatchWordId: 1,
  countOfTimesUsed: 2,
  conversationId: 8
}, {
  userWatchWordId: 8,
  countOfTimesUsed: 2,
  conversationId: 8
}, {
  userWatchWordId: 3,
  countOfTimesUsed: 4,
  conversationId: 9
}, {
  userWatchWordId: 2,
  countOfTimesUsed: 2,
  conversationId: 9
}, {
  userWatchWordId: 4,
  countOfTimesUsed: 2,
  conversationId: 9
}, {
  userWatchWordId: 5,
  countOfTimesUsed: 3,
  conversationId: 9
}, {
  userWatchWordId: 6,
  countOfTimesUsed: 6,
  conversationId: 9
}, {
  userWatchWordId: 7,
  countOfTimesUsed: 4,
  conversationId: 9
}, {
  userWatchWordId: 1,
  countOfTimesUsed: 1,
  conversationId: 9
}, {
  userWatchWordId: 8,
  countOfTimesUsed: 1,
  conversationId: 9
}, {
  userWatchWordId: 9,
  countOfTimesUsed: 1,
  conversationId: 9
}, {
  userWatchWordId: 3,
  countOfTimesUsed: 4,
  conversationId: 10
}, {
  userWatchWordId: 2,
  countOfTimesUsed: 2,
  conversationId: 10
}, {
  userWatchWordId: 4,
  countOfTimesUsed: 2,
  conversationId: 10
}, {
  userWatchWordId: 5,
  countOfTimesUsed: 3,
  conversationId: 10
}, {
  userWatchWordId: 6,
  countOfTimesUsed: 6,
  conversationId: 10
}, {
  userWatchWordId: 7,
  countOfTimesUsed: 4,
  conversationId: 10
}, {
  userWatchWordId: 1,
  countOfTimesUsed: 1,
  conversationId: 10
}, {
  userWatchWordId: 8,
  countOfTimesUsed: 1,
  conversationId: 10
}, {
  userWatchWordId: 9,
  countOfTimesUsed: 1,
  conversationId: 10
}];

const tones = [{
  anger: .1,
  fear: .6,
  joy: .7,
  sadness: .5,
  analytical: .6,
  confident: .2,
  tentative: .6,
  conversationId: 1
}, {
  anger: .1,
  fear: .6,
  joy: .7,
  sadness: .5,
  analytical: .6,
  confident: .2,
  tentative: .6,
  conversationId: 2
}, {
  anger: .1,
  fear: .6,
  joy: .7,
  sadness: .5,
  analytical: .6,
  confident: .2,
  tentative: .6,
  conversationId: 3
}, {
  anger: .3,
  fear: .7,
  joy: .3,
  sadness: .4,
  analytical: .4,
  confident: .2,
  tentative: .5,
  conversationId: 4
}, {
  anger: .2,
  fear: .3,
  joy: .6,
  sadness: .5,
  analytical: .8,
  confident: .3,
  tentative: .4,
  conversationId: 5
}, {
  anger: .1,
  fear: .2,
  joy: .4,
  sadness: .4,
  analytical: .2,
  confident: .3,
  tentative: .4,
  conversationId: 6
}, {
  anger: .1,
  fear: .6,
  joy: .6,
  sadness: .4,
  analytical: .8,
  confident: .3,
  tentative: .8,
  conversationId: 7
}, {
  anger: .1,
  fear: .6,
  joy: .7,
  sadness: .5,
  analytical: .6,
  confident: .2,
  tentative: .6,
  conversationId: 8
}, {
  anger: .7,
  fear: .3,
  joy: .3,
  sadness: .3,
  analytical: .7,
  confident: .4,
  tentative: .5,
  conversationId: 9
}, {
  anger: .4,
  fear: .4,
  joy: .8,
  sadness: .4,
  analytical: .7,
  confident: .4,
  tentative: .5,
  conversationId: 10
}];

const toneSentences = [{
  sentence: 'Should we wait until Ann has a chance to chime in?.',
  toneName: 'tentative',
  conversationId: 1
}, {
  sentence: 'Does that make sense?',
  toneName: 'tentative',
  conversationId: 1
}, {
  sentence: `I'm not sure if this is right, but what if we go with option A?`,
  toneName: 'tentative',
  conversationId: 1
}, {
  sentence: `This is just a suggestion, but why don't we all take a turn to say what we like best about this idea?`,
  toneName: 'tentative',
  conversationId: 1
}, {
  sentence: `I'm probably not the best person to answer that question.`,
  toneName: 'tentative',
  conversationId: 1
}, {
  sentence: `What would everyone think of pursuing Kate's idea?`,
  toneName: 'tentative',
  conversationId: 1
}, {
  sentence: `I'm not sure what's best, but I can take some time to think about it.`,
  toneName: 'tentative',
  conversationId: 1
}, {
  sentence: `I'd like to hear what other think of this idea before really recommending it, but I think we might talk with Tom about what he suggested at our last meeting.`,
  toneName: 'tentative',
  conversationId: 1
}, {
  sentence: 'Should we wait until Ann has a chance to chime in?.',
  toneName: 'tentative',
  conversationId: 2
}, {
  sentence: 'Does that make sense?',
  toneName: 'tentative',
  conversationId: 2
}, {
  sentence: `This is just a suggestion, but why don't we all take a turn to say what we like best about this idea?`,
  toneName: 'tentative',
  conversationId: 2
}, {
  sentence: `I'm probably not the best person to answer that question.`,
  toneName: 'tentative',
  conversationId: 2
}, {
  sentence: `I'm not sure if this is right, but what if we go with option A?`,
  toneName: 'tentative',
  conversationId: 2
}, {
  sentence: `I'd like to hear what other think of this idea before really recommending it, but I think we might talk with Tom about what he suggested at our last meeting.`,
  toneName: 'tentative',
  conversationId: 2
}, {
  sentence: `What would everyone think of pursuing Kate's idea?`,
  toneName: 'tentative',
  conversationId: 2
}, {
  sentence: `I'm not sure what's best, but I can take some time to think about it.`,
  toneName: 'tentative',
  conversationId: 2
}, {
  sentence: `I'd like to hear what other think of this idea before really recommending it, but I think we might talk with Tom about what he suggested at our last meeting.`,
  toneName: 'tentative',
  conversationId: 2
}, {
  sentence: `I'm probably not the best person to answer that question.`,
  toneName: 'tentative',
  conversationId: 3
}, {
  sentence: 'Should we wait until Ann has a chance to chime in?.',
  toneName: 'tentative',
  conversationId: 3
}, {
  sentence: 'Does that make sense?',
  toneName: 'tentative',
  conversationId: 3
}, {
  sentence: `This is just a suggestion, but why don't we all take a turn to say what we like best about this idea?`,
  toneName: 'tentative',
  conversationId: 3
}, {
  sentence: `What would everyone think of pursuing Kate's idea?`,
  toneName: 'tentative',
  conversationId: 3
}, {
  sentence: `I'm not sure if this is right, but what if we go with option A?`,
  toneName: 'tentative',
  conversationId: 3
}, {
  sentence: `I'd like to hear what other think of this idea before really recommending it, but I think we might talk with Tom about what he suggested at our last meeting.`,
  toneName: 'tentative',
  conversationId: 3
}, {
  sentence: `I'd like to hear what other think of this idea before really recommending it, but I think we might talk with Tom about what he suggested at our last meeting.`,
  toneName: 'tentative',
  conversationId: 3
}, {
  sentence: `I'm not sure what's best, but I can take some time to think about it.`,
  toneName: 'tentative',
  conversationId: 3
}, {
  sentence: `I'm probably not the best person to answer that question.`,
  toneName: 'tentative',
  conversationId: 4
}, {
  sentence: 'Should we wait until Ann has a chance to chime in?.',
  toneName: 'tentative',
  conversationId: 4
}, {
  sentence: `This is just a suggestion, but why don't we all take a turn to say what we like best about this idea?`,
  toneName: 'tentative',
  conversationId: 4
}, {
  sentence: 'Does that make sense?',
  toneName: 'tentative',
  conversationId: 4
}, {
  sentence: `I'm not sure if this is right, but what if we go with option A?`,
  toneName: 'tentative',
  conversationId: 4
}, {
  sentence: `What would everyone think of pursuing Kate's idea?`,
  toneName: 'tentative',
  conversationId: 4
}, {
  sentence: `I'd like to hear what other think of this idea before really recommending it, but I think we might talk with Tom about what he suggested at our last meeting.`,
  toneName: 'tentative',
  conversationId: 4
}, {
  sentence: `I'm not sure what's best, but I can take some time to think about it.`,
  toneName: 'tentative',
  conversationId: 4
}, {
  sentence: `I'd like to hear what other think of this idea before really recommending it, but I think we might talk with Tom about what he suggested at our last meeting.`,
  toneName: 'tentative',
  conversationId: 4
}];



// const snippets = [{
//   text: ' ... i’m no expert but I think we might want to consider ...',
//   conversationId: 22,
//   userWatchWordId: 1
// } , {
//   text: '... i’m no expert but what I would suggest is ... ',
//   conversationId: 22,
//   userWatchWordId: 1
// } , {
//   text: '... i just want to say that i’m on board with that ...',
//   conversationId: 22,
//   watchWordId: 2
// } , {
//   text: '... i’m just not sure that’s the best approach',
//   conversationId: 22,
//   watchWordId: 7
// } , {
//   text: ' ... i’m just not sure that’s the way to go',
//   conversationId: 22,
//   watchWordId: 7
// }];


const seed = () =>
  Promise.all(users.map(user =>
    User.create(user))
  )
    .then(() =>
      Promise.all(userWatchWords.map(userWatchWord =>
        UserWatchWord.create(userWatchWord))
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
      Promise.all(toneSentences.map(toneSentence =>
        ToneSentence.create(toneSentence))
      ))
// .then(() =>
// Promise.all(snippets.map(snippet =>
//   Snippet.create(snippet))
// ));


const main = () => {
  console.log('Syncing db...');
  db.sync({ force: true })
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
