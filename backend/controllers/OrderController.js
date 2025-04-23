import Order from '../models/Order.js';

// Create a new order
export const createOrder = async (req, res) => {
  const { user, cartItems, totalAmount, paymentInfo } = req.body;

  try {
    const newOrder = await Order.create({
      user,
      cartItems,
      totalAmount,
      paymentInfo,
    });

    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ message: 'Error creating order', error: err.message });
  }
};

// Get all orders (admin or for debugging)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user').populate('cartItems.book');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders', error: err.message });
  }
};

// Get orders for a specific user
export const getOrdersByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ user: userId }).populate('cartItems.book');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user orders', error: err.message });
  }
};

// Get a specific order by ID
export const getOrderById = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId).populate('user').populate('cartItems.book');

    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching order', error: err.message });
  }
};

// Update order status (e.g., mark as delivered, refunded, etc.)
export const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Error updating order', error: err.message });
  }
};
