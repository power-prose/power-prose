const router = require('express').Router();
const { Conversation, WatchWord, WatchWordOccurrence, Snippet, Tone } = require('../db/models');
const wordCounter = require('../utils/wordCounter');

const toneAnalysis = require('../utils/toneAnalysis');

module.exports = router;

// get a single conversation with all associated watchWordOccurences and snippets
router.get("/:conversationId", (req, res, next) => {
  Conversation.findById(req.params.conversationId, {
    include: [Tone, WatchWord]
  })
    .then(conversation => {
      req.session.chosenConversation = conversation;
      res.json(conversation);
    })
    .catch(next);
});

router.get("/user/:userId", (req, res, next) => {
  Conversation.findAll({
    where: {
      userId: req.params.userId
    }, include: [Tone, WatchWord]
  })
    .then(conversations => res.json(conversations))
    .catch(next)
})

router.post('/', (req, res, next) => {
  if (!req.user) {
    res.status(403).send("forbidden");
    return;
  }
  let conversationData = req.body

  // get all of the conversation data out of the request
  const conversationName = conversationData.name;
  const conversationText = conversationData.text;
  const conversationLengthTime = conversationData.lengthTime;
  const conversationUserId = req.user.id;

  // get the counts of the watch words
  const counts = wordCounter.countWords(conversationText)
  console.log("these the counts", counts);

  // determine the tones of the text

  toneAnalysis.analyzeTone(conversationText, (tones) => {
    let createdConversation;
    //save conversation with all watch words and tones included
    Conversation.create({
      name: conversationName,
      length: conversationLengthTime,
      userId: conversationUserId
    })
    .then(newConversation => {
      createdConversation = newConversation
      tones.conversationId = newConversation.id
      return Tone.create(tones)
    })
    .then(() => {
      const wordCountsArray = Object.keys(counts).map(word => {
        return {wordOrPhrase: word, countOfTimesUsed: counts[word], conversationId: createdConversation.id}
      })
      WatchWordOccurrence.bulkCreate(wordCountsArray)
      // for each word and count, create a new instance in the database along with conversationId
    })
    .then(() => {
      return Conversation.findById(createdConversation.id, { include: [{ all: true }] })
    })
    .then(conversation => {
      res.status(201).json(conversation)
    })
  })


})


router.get("/user/:userId/chosen", (req, res, next) => {
  if (req.session.chosenConversation) {
    res.json(req.session.chosenConversation);
  } else {
    Conversation.findAll({
      where: {
        userId: req.params.userId
      }
    })
      .then(conversations => {
        let max = Math.max(
          ...conversations.map(conversation => conversation.id)
        );
        return Conversation.findById(max, {
          include: [
            { model: WatchWordOccurrence, include: [{ model: Snippet }] }
          ]
        });
      })
      .then(conversation => {
        req.session.chosenConversation = conversation;
        res.json(conversation);
      });
  }
});
