import asyncHandler from "../middleware/asyncHandler.js";
import Order from '../models/orderModel.js'

//@desc     Create orders
//@route    POST /api/orders
//@access   Private
const createOrder = asyncHandler(async(req, res)=>{
    const {
        orderItems, 
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body

    if(orderItems && orderItems.length === 0){
        res.status(400)
        throw new Error('No order items')
    } else {
        const order = new Order({
            orderItems: orderItems.map(item=>({
                ...item,
                product: item._id,
                _id: undefined
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })

        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
})

//@desc     Get user's orders
//@route    GET /api/orders/user
//@access   Private
const getMyOrders = asyncHandler(async(req, res)=>{
    const orders = await Order.find({user: req.user._id})
})

//@desc     Get user's orders by ID
//@route    GET /api/orders/:id
//@access   Private
const getOrderById = asyncHandler(async(req, res)=>{
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    let isOrderOfAuthUser = (order?.user?._id.toString() === req.user._id.toString())
    if(order && isOrderOfAuthUser) {
        res.status(200).json(order)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

//@desc     Update order payment status
//@route    PUT /api/order/:id/pay
//@access   Private
const updatePayStatus = asyncHandler((req, res)=>{
    res.send('update order payment status')
})

//@desc     Update delivery status
//@route    PUT /api/orders/:id/delivery
//@access   Private / Admin
const UpdateDeliveryStatus = asyncHandler((req, res)=>{
    res.send('update delivery status')
})

//@desc     Get All orders
//@route    GET /api/orders
//@access   Private / Admin
const getOrders = asyncHandler((req, res)=>{
    res.send('get all orders')
})

export {
    createOrder,
    getMyOrders,
    getOrderById,
    updatePayStatus,
    UpdateDeliveryStatus,
    getOrders,
}