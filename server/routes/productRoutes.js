import express from 'express'
import Product from '../models/productModel.js'
import asyncHandler from '../middleware/asyncHandler.js'

const router = express.Router()

router.get('/', asyncHandler(async(req, res)=>{
    let products = await Product.find({})
    res.status(200).json(products)
}))

router.get('/:id', asyncHandler(async(req, res)=>{
    let product = await Product.findById(req.params.id)
    res.status(200).json(product)
}))

export default router