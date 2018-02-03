const router = require('express').Router();
const { WatchWord } = require('../db/models');

module.exports = router;

// get all watchWords => get all userWatchWords
router.get('/', (req, res, next) => {
  WatchWord.findAll()
    .then(words => res.json(words))
    .catch(next)
});

// get a single watchWord by id => /userWatchWordId
// i can't think of a use case now for eagerly loading associated users with a single watchWord, but we can easily add this to the route if desired
router.get('/:watchWordId', (req, res, next) => { // req.params.userId
  WatchWord.findById(req.params.watchWordId) // by user Id
    .then(word => res.json(word))
    .catch(next)
})
