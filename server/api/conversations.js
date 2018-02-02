const router = require('express').Router();
const { Conversation, UserWatchWord, WatchWordOccurrence, Tone, Snippet, ToneSentence } = require('../db/models');
const wordCounter = require('../utils/wordCounter');

const toneAnalysis = require('../utils/toneAnalysis');

const { createAllSnippetsWithWatchWords } = require("../utils/createSnippets");


module.exports = router;

// get a single conversation with all associated watchWordOccurences and snippets
router.get("/:conversationId", (req, res, next) => {
  Conversation.findById(req.params.conversationId, {
    include: [Tone, UserWatchWord, Snippet, ToneSentence]
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
    }, include: [Tone, UserWatchWord, Snippet, ToneSentence]

  })
    .then(conversations => res.json(conversations))
    .catch(next);
});

router.post("/", (req, res, next) => {
  if (!req.user) {
    res.status(403).send("forbidden");
    return;
  }
  let conversationData = req.body;

  // get all of the conversation data out of the request
  const conversationName = conversationData.name;
  const conversationText = conversationData.text;
  const conversationLengthTime = conversationData.lengthTime;
  const conversationUserId = req.user.id

  let savedWordFrequencies;
  let createdConversation;
  let savedTones;
  let savedToneSentences;

  // get the counts of the watch words
  wordCounter.countWords(conversationText, conversationUserId)
    // save wordFrequencies for later
    // kick off tone analysis from util function file
    .then(wordFrequencies => {
      savedWordFrequencies = wordFrequencies
      return toneAnalysis.analyzeTone(conversationText);
    })
    // take analyzed tones we get back and the sentences and save for later
    // create conversation instance using info from the body in the request
    .then(tones => {
      savedTones = tones.processedTones;
      savedToneSentences = tones.tentativeSentences;
      return Conversation.create({
        name: conversationName,
        length: conversationLengthTime,
        userId: conversationUserId
      });
    })
    // save newConversation for use later
    // add conversation id from newly created conversation to tones object
    // create tone instance from analyzed tones
    .then(newConversation => {
      createdConversation = newConversation;
      savedTones.conversationId = newConversation.id;
      return Tone.create(savedTones); // create row of tones
    })
    .then(createdTones => {
      //tonesRow = createdTones;
      // right now we know that all of the savedToneSentences pertain to tentative tone, will have to change later if we want more than one tone
      const toneSentencesObjects = savedToneSentences.map(function(sentence) {
        return {
          sentence,
          toneName: "tentative", //later we may just want tone id, could update model to include id instead of name
          conversationId: createdConversation.id
        };
      });
      return ToneSentence.bulkCreate(toneSentencesObjects);
    })

    // create array based on the wordFrequencies created from the function in util wordCount file (above)
    // create a watchwordoccurrence for each watchWord found
    .then(() => {
      const wordCountsArray = Object.keys(savedWordFrequencies).map(wordId => {
        return {
          countOfTimesUsed: savedWordFrequencies[wordId],
          userWatchWordId: +wordId,
          conversationId: createdConversation.id
        };
      });
      return WatchWordOccurrence.bulkCreate(wordCountsArray);
    })
    // find the conversation that was just created by its id and eagerly load all associations
    .then(() => {
      return createAllSnippetsWithWatchWords(
        conversationText,
        createdConversation.id,
        req.user.id
      );
    })
    .then(snippetsArr => {
      console.log("SNIPPETS ARRAY", snippetsArr);
      return Snippet.bulkCreate(snippetsArr);
    })
    .then(() => {
      return Conversation.findById(createdConversation.id, {
        include: [{ all: true }]
      });
    })
    // send the convo back to the client
    .then(conversation => {
      res.status(201).json(conversation);
    });
});

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
          include: [Tone, UserWatchWord, Snippet]
        });
      })
      .then(conversation => {
        req.session.chosenConversation = conversation;
        res.json(conversation);
      });
  }
});

router.put("/:conversationId", (req, res, next) => {
  const watchWordOccNew = req.body.userWatchWords.map(obj => obj.watchWordOccurrence)
  console.log("NEW WWO", watchWordOccNew);
  const snippetDelete = Snippet.destroy({
    where: { conversationId: req.params.conversationId }
  })
  const wordOccDelete = WatchWordOccurrence.destroy( {
    where: {conversationId: req.params.conversationId}
  })
  Promise.all([snippetDelete, wordOccDelete])
    .then((stuff) => WatchWordOccurrence.bulkCreate(watchWordOccNew))
    .then(() => Conversation.findById(req.params.conversationId))
    .then(foundConvo => foundConvo.update(req.body))
    // Conversation.findById(req.params.conversationId)
    // .then(foundConvo =>
    //   foundConvo.update(req.body))
    // .then(updatedConvo =>
    //   Snippet.destroy({
    //     where: {conversationId: updatedConvo.id}
    // }))
    .then(updatedConvo => res.json(updatedConvo));
});
