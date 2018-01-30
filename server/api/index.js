const router = require('express').Router();
module.exports = router;


router.use('/speech-to-text', require('./watson-auth'));
router.use('/users', require('./users'));
router.use('/watchWords', require('./watchwords'));
router.use('/conversations', require('./conversations'));
router.use('/watchWordOccurrences', require('./watchWordOccurrences'));


router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
});
