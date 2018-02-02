const router = require('express').Router();
const { UserWatchWord } = require('../db/models');

module.exports = router;

// get all userWatchWords for one user via req.params
router.get('/:userId', (req, res, next) => {
  UserWatchWord.findAll({
    where: {
      userId: req.params.userId
    }
  })
    .then(words => res.json(words))
    .catch(next)
});

router.get('/:userId/active', (req, res, next) => {
  UserWatchWord.findAll({
    where: {
      userId: req.params.userId,
      active: true
    }
  })
    .then(words => res.json(words))
    .catch(next)
});

// delete a user's userWatchWord instance
router.put('/:userWatchWordId', (req, res, next) => {
  UserWatchWord.update(req.body,
    {
      where: {
        id: req.params.userWatchWordId,
      }, returning: true
    })
    .then((updatedWord) => res.json(updatedWord[1][0]))
    .catch(next);
})

// add new a userWatchWord for one user
router.post('/', (req, res, next) => {
  const watchWordData = req.body;
  const wordOrPhrase = watchWordData.wordOrPhrase;
  const userId = req.user.id
  UserWatchWord.create({
    wordOrPhrase,
    userId
  })
    .then(newWord => res.json(newWord))
    .catch(next);
})

