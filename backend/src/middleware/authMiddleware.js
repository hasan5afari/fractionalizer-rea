const { User } = require('../models/User')
const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {

  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    const user = await User.findOne({ username: decoded.username, 'tokens.token': token })

    if (!user) {
      throw new Error('Authentification Failed .')
    }

    req.user = user
    req.token = token
    next()
  } catch (error) {
    res.status(401).send({
      error: error.message
    })
  }

}

module.exports.authMiddleware = authMiddleware