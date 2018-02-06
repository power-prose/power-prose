const router = require('express').Router()
const { User, UserWatchWord } = require('../db/models')
module.exports = router

router.post('/login', (req, res, next) => {
  User.findOne({where: {email: req.body.email}})
    .then(user => {
      if (!user) {
        res.status(401).send('User not found')
      } else if (!user.correctPassword(req.body.password)) {
        res.status(401).send('Incorrect password')
      } else {
        req.login(user, err => (err ? next(err) : res.json(user)))
      }
    })
    .catch(next)
})

router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      req.login(user, err => (err ? next(err) : res.json(user)))
      return user;
    })
    .then(user => {
      UserWatchWord.bulkCreate([
        { wordOrPhrase: 'just', userId: user.id },
        { wordOrPhrase: 'Does that make sense', userId: user.id },
        { wordOrPhrase: 'no expert', userId: user.id },
        { wordOrPhrase: 'Am I making sense', userId: user.id },
        { wordOrPhrase: 'Sorry', userId: user.id },
        { wordOrPhrase: 'just like to say', userId: user.id },
        { wordOrPhrase: 'not sure', userId: user.id },
        { wordOrPhrase: 'I was wondering', userId: user.id }
      ])
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists')
      } else {
        next(err)
      }
    })
})

router.post('/logout', (req, res) => {
  console.log('!!!!!', req.session)
  req.logout()
  req.session.destroy()
  console.log('!!!!!', req.session)
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
