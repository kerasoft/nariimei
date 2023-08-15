import asyncHandler from "../middleware/asyncHandler.js"
import Product from "../models/productModel.js"

// @desc   Fetch all products
// @route  GET /api/products
// @access Public
const getAllProducts = asyncHandler(async(req, res)=>{
    let products = await Product.find({})
    res.status(200).json(products)
})

// @desc   Fetch a product
// @route  GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async(req, res)=>{
    let product = await Product.findById(req.params.id)
    res.json(product)
})

export {getProductById, getAllProducts}