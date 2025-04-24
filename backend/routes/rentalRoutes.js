import { Router } from 'express';
const router = Router();
import { auth } from '../middleware/authMiddleware.js';

import { createRentalOrder, getRentalOrders, getRentalOrderById, deleteRentalOrder } from '../controllers/rentalController.js';

// POST /api/rental-orders - Create a new rental order
router.post('/add', auth,  createRentalOrder);

// GET /api/rental-orders - Get all rental orders
router.get('/', getRentalOrders);

// GET /api/rental-orders/:id - Get a rental order by ID
router.get('/:id', getRentalOrderById);

// DELETE /api/rental-orders/:id - Delete a rental order by ID
router.delete('/:id', deleteRentalOrder);

export default router;
