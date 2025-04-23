// controllers/cartController.ts
import Cart from "../models/Cart.js";

// GET /api/cart/:userId
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/cart/:userId - add/update book
export const addToCart = async (req, res) => {
  const { bookId, title, author, price } = req.body;
  const userId = req.params.userId;

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.bookId.toString() === bookId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ bookId, title, author, price });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/cart/:userId/:bookId - remove item
export const removeFromCart = async (req, res) => {
  const { userId, bookId } = req.params;
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { items: { bookId } } },
      { new: true }
    );
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/cart/:userId - clear cart
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId: req.params.userId },
      { items: [] },
      { new: true }
    );
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
