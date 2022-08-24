const express = require('express')
const { User } = require('../models/User')
const { authMiddleware } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/authentication/register', async (req, res) => {
  const user = new User({
    ...req.body,
    registeredOn: (new Date()).getTime()
  })

  try {
    await user.save()
    res.status(201).send()
  } catch (error) {
    res.status(400).send({
      error: error.message
    })
  }

})

router.post('/authentication/login', async (req, res) => {

  const username = req.body.username
  const password = req.body.password

  try {
    const user = await User.findByCredentials(username, password)
    const token = await user.generateAuthToken()
    res.send({
      user: {
        fullname: user.fullname,
        username: user.username,
        image: user.image
      },
      token
    })
  } catch (error) {
    res.status(400).send({
      error: error.message
    })
  }

})

router.post('/authentication/logout', authMiddleware, async (req, res) => {

  try {
    req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token)
    await req.user.save()
    res.send()
  } catch (error) {
    res.status(400).send({
      error: 'Failed to logout .'
    })
  }

})

module.exports.authenticationRouter = router