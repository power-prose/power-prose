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

// delete a user's userWatchWord instance
router.delete('/:userWatchWordId', (req, res, next) => {
  UserWatchWord.destroy({
    where: {
      id: req.params.userWatchWordId,
    }
  })
})

// add new a userWatchWord for one user
router.post('/:userId', (req, res, next) => {
  UserWatchWord.create(req.body)
    .then(userWatchWord => userWatchWord.userId = req.params.userId)
    .catch(next);
})