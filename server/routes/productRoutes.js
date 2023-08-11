import express from 'express'
import {products} from '../data/products.js'
import asyncHandler from '../middleware/asyncHandler.js'

const router = express.Router()

router.get('/', (req, res)=>{
    res.status(200).json(products)
})

router.get('/:id', (req, res)=>{
    let product = products.find(product=>product._id === req.params.id)
    res.status(200).json(product)
})

export default router