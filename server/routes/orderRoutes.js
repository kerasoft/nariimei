import express from 'express'
import {
    createOrder,
    getMyOrders,
    getOrderById,
    updatePayStatus,
    UpdateDeliveryStatus,
    getOrders,
    getPaymentStatus,
} from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/').post(protect, createOrder).get(protect, admin, getOrders)
router.route('/user').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').get(protect, getPaymentStatus).put(protect, updatePayStatus)
router.route('/:id/delivery').put(protect, admin, UpdateDeliveryStatus)

export default router