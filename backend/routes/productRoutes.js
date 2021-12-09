import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Product from '../models/productModel.js'

// Fetch All Products - Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const product = await Product.find({})
    res.json(product)
  })
)

// Fetch Product By Id - Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
      res.json(product)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })
)

export default router