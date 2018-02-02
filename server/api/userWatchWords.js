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