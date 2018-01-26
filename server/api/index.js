const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/watchWords', require('./watchWords'))
router.use('/conversations', require('./conversations'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
