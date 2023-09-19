import asyncHandler from "../middleware/asyncHandler.js";
import Order from '../models/orderModel.js'
import { getPaymentCF, orderCreateCF } from "../utils/cashfree.js";

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

        if(order.paymentMethod === 'Pay Online') {
            let cfOrder = {
                _id: order._id,
                totalPrice: order.totalPrice,
                user: {
                    _id:req.user._id,
                    email: req.user.email,
                    phone: '+916363483718'
                }
            }
            const {cfOrder:cfData} = await orderCreateCF(cfOrder)
            order.paymentSessionId = cfData.paymentSessionId
        }
        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
})

//@desc     Get user's orders
//@route    GET /api/orders/user
//@access   Private
const getMyOrders = asyncHandler(async(req, res)=>{
    const orders = await Order.find({user: req.user._id})
    if(orders){
        res.status(200).json(orders)
    } else {
        res.status(400)
        throw new Error('Something went wrong, try again')
    }
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
const updatePayStatus = asyncHandler(async(req, res)=>{
    const order = await Order.findById(req.params.id)
    if(order){
        order.isPaid = req.body.orderStatus
        await order.save()
        res.status(200).json({status: 'updated'})
    }
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
const getOrders = asyncHandler(async(req, res)=>{
    const orders = await Order.find({})
    if(orders){
        res.status(200).json(orders)
    } else {
        res.status(500)
        throw new Error('Server error, Unable to fetch orders')
    }
})

//@desc     Get Payment status of an order
//@route    GET /api/orders/:id/payment
//@access   Private
const getPaymentStatus = asyncHandler(async(req, res)=>{
    const status = await getPaymentCF(req.params.id)
    if(status){
        res.status(200).json(status.cfPaymentsEntities[0].paymentStatus)
    }else{
        res.status(400)
        throw new Error('Sorry, unable to fetch payment status at this time')
    }
})

export {
    createOrder,
    getMyOrders,
    getOrderById,
    updatePayStatus,
    UpdateDeliveryStatus,
    getOrders,
    getPaymentStatus,
}