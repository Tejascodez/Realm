import { createContext, useState, useContext, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // Load cart from localStorage on initial render
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      setCart([]);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cart]);

  // Show notification
  const showNotification = (message, type) => {
    setNotification({
      show: true,
      message,
      type,
    });

    // Hide notification after 3 seconds
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  // Add to cart functionality
  const addToCart = (book) => {
    console.log("Attempting to add book:", book);
    if (!book || !book._id) {
      console.error("Invalid book object:", book);
      showNotification("Failed to add item to cart", "error");
      return;
    }

    // Check if book is already in cart - using _id from MongoDB
    const isBookInCart = cart.some(item => item._id === book._id);

    if (isBookInCart) {
      showNotification('This book is already in your cart', 'warning');
      return;
    }

    // Add book with quantity property
    setCart([...cart, { ...book, quantity: 1 }]);
    showNotification(`${book.title} added to cart`, 'success');
  };

  // Remove from cart functionality
  const removeFromCart = (bookId) => {
    console.log("removeFromCart called with:", bookId);
    console.log("typeof bookId:", typeof bookId);
    console.log("Current cart state:", cart);

    // Handle both string IDs and object references
    let idToRemove = bookId;

    // If a book object was passed instead of an ID string
    if (typeof bookId === 'object' && bookId !== null) {
      idToRemove = bookId._id || bookId.id;
      console.log("Extracted ID from book object:", idToRemove);
    }

    if (!idToRemove) {
      console.error("Invalid book ID for removal:", bookId);
      showNotification("Failed to remove item from cart", "error");
      return;
    }

    const initialCartLength = cart.length;

    // Remove the item regardless of whether it uses id or _id
    const updatedCart = cart.filter(item => {
      const itemId = item._id || item.id;
      return itemId !== idToRemove;
    });

    // Check if anything was actually removed
    if (updatedCart.length === initialCartLength) {
      console.warn("No item with ID found in cart:", idToRemove);
      showNotification("Item not found in cart", "warning");
      return;
    }

    setCart(updatedCart);
    showNotification('Item removed from cart', 'success');
  };

  // Update quantity functionality
  const updateQuantity = (bookId, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedCart = cart.map(item =>
      item._id === bookId ? { ...item, quantity: newQuantity } : item
    );

    setCart(updatedCart);
  };

  // Clear cart functionality
  const clearCart = () => {
    setCart([]);
    showNotification('Cart cleared', 'success');
  };

  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      // Handle different price formats
      let price;
      if (typeof item.price === 'string') {
        price = parseFloat(item.price.replace(/[^\d.-]/g, ''));
      } else {
        price = parseFloat(item.price || 0);
      }

      const quantity = item.quantity || 1;
      return total + (isNaN(price) ? 0 : price * quantity);
    }, 0).toFixed(2);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        calculateTotal,
        notification,
        showNotification, // Add showNotification to the context
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);