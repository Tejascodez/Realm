import RentalOrder from '../models/Rental.js';

// Create a new rental order
export const createRentalOrder = async (req, res) => {
  try {
    const { userId, bookId, rentalDays, price, createdAt, expiresAt } = req.body;

    // Input validation
    if (!userId || !bookId || !rentalDays || !price || !expiresAt) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const rentalOrder = new RentalOrder({
      userId,
      bookId,
      rentalDays,
      price,
      createdAt: createdAt || new Date(),
      expiresAt: new Date(expiresAt),
    });

    await rentalOrder.save();
    res.status(201).json(rentalOrder);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create rental order', details: error.message });
  }
};

// Get all rental orders
export const getRentalOrders = async (req, res) => {
  try {
    const orders = await RentalOrder.find()
      .populate('userId', 'name email') // Populate user details (adjust fields as needed)
      .populate('bookId', 'title author coverImage'); // Populate book details (adjust fields as needed)
// Ppulate book details (adjust fields as needed)
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch rental orders', details: error.message });
  }
};

// Get a rental order by ID
export const getRentalOrderById = async (req, res) => {
  try {
    const order = await RentalOrder.findById(req.params.id)
      .populate('userId', 'name email')
      .populate('bookId', 'title author');

    if (!order) {
      return res.status(404).json({ error: 'Rental order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch rental order', details: error.message });
  }
};

// Delete a rental order
export const deleteRentalOrder = async (req, res) => {
  try {
    const order = await RentalOrder.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Rental order not found' });
    }
    res.status(200).json({ message: 'Rental order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete rental order', details: error.message });
  }
};