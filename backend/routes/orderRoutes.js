import express from 'express'
import {
  createOrder,
  getAllOrders,
  getOrdersByUser,
  getOrderById,
  updateOrderStatus,
} from '../controllers/OrderController.js'

const router = express.Router()

// Create a new order
router.post('/', createOrder)

// Get all orders (admin or for debugging)
router.get('/', getAllOrders)

// Get all orders for a specific user
router.get('/user/:userId', getOrdersByUser)

// Get a specific order by ID
router.get('/:orderId', getOrderById)

// Update status of an order (delivered, refunded, etc.)
router.put('/:orderId/status', updateOrderStatus)

export default router
