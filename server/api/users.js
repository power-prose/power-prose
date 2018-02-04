const router = require('express').Router();
const { User, UserWatchWord, Conversation } = require('../db/models');

module.exports = router;

// get a single user by id, eagerly loading watchWords and conversations
router.get('/:userId', (req, res, next) => {
  User.findById(req.params.userId, { include: [UserWatchWord, Conversation] })
    .then(user => res.json(user))
    .catch(next)
});

router.put('/:userId', (req, res, next) => {
  User.update(req.body,
    {
      where: {
        id: req.params.userId,
      }, returning: true
    })
    .then((updatedUser) => res.json(updatedUser[1][0]))
    .catch(next);
})
