const express = require('express')
const { Property } = require('../models/Property')
const { authMiddleware } = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/marketplace', authMiddleware, async (req, res) => {

  try {
    const properties = await Property.find({})
    res.send({
      properties: properties.map((property) => {
        return {
          id: property._id,
          name: property.name,
          description: property.description,
          price: property.price,
          images: property.images
        }
      })
    })
  } catch (error) {
    res.status(400).send({
      error: 'Failed to get properties information .'
    })
  }

})

module.exports.marketplaceRouter = router