const express = require('express')
const { Stock } = require('../models/Stock')
const { Request } = require('../models/Request')
const { Property } = require('../models/Property')
const { authMiddleware } = require('../middleware/authMiddleware')
const { uploadMiddleware } = require('../middleware/uploadMiddleware')

const router = express.Router()

router.post('/properties/submit', [authMiddleware, uploadMiddleware.any()], async (req, res) => {

  try {

    const prevRequest = await Request.findOne({ transactionId: req.body.transactionId })
    if (!prevRequest) {
      const propertyObject = {
        ...req.body,
        images: [],
        tokenId: 1,
        initialStock: {
          owner: req.user._id,
          value: req.body.fractions,
          type: 'unlisted'
        }
      }
      delete propertyObject.transactionId

      for (file of req.files) {
        if (file.mimetype === 'application/json')
          propertyObject.propertyInfo = process.env.DOMAIN + process.env.PROPERTIES_INFO_DIR.slice(7) + '/' + file.filename
        else
          propertyObject.images.push({ image: process.env.DOMAIN + process.env.PROFILES_PROPERTIES_DIR.slice(7) + '/' + file.filename })
      }

      const requestObject = {
        owner: req.user._id,
        type: 'submitProperty',
        transactionId: req.body.transactionId,
        address: req.user.address,
        createdOn: (new Date()).getTime(),
        property: propertyObject
      }

      const request = new Request(requestObject)

      await request.save()
      res.status(201).send()
    }

  } catch (error) {
    res.status(400).send({
      error: error
    })
  }

})

router.get('/properties/:id', authMiddleware, async (req, res) => {

  const propertyID = req.params.id

  try {
    const property = await Property.findOne({ _id: propertyID })

    if (!property)
      throw new Error('Failed to get property information .')

    await property.populate({
      path: 'stocks',
      populate: {
        path: 'stock',
        model: 'Stock',
        populate: {
          path: 'owner',
          model: 'User'
        }
      }
    })

    res.send({
      property: {
        id: property._id,
        name: property.name,
        description: property.description,
        price: property.price,
        fractions: property.fractions,
        images: property.images.map((image) => image.image),
        unlistedStocks: property.stocks.filter((stock) => stock.stock.type === 'unlisted').map((stock) => {
          const owner = stock.stock.owner._doc
          stock = stock.stock
          return {
            owner: {
              fullname: owner.fullname,
              username: owner.username,
              image: owner.image
            },
            stocksCount: stock.value,
            id: stock._id
          }
        }),
        listedStocks: property.stocks.filter((stock) => stock.stock.type === 'listed').map((stock) => {
          const owner = stock.stock.owner._doc
          stock = stock.stock
          return {
            owner: {
              fullname: owner.fullname,
              username: owner.username,
              image: owner.image
            },
            stocksCount: stock.value,
            id: stock._id
          }
        })
      }
    })

  } catch (error) {
    res.status(400).send({
      error: error.message
    })
  }

})

module.exports.propertyRouter = router