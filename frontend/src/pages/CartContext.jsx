// CartContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Show notification
  const showNotification = (message, type) => {
    setNotification({
      show: true,
      message,
      type
    });
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  // Add to cart functionality
  const addToCart = (book) => {
    // Check if book is already in cart
    const isBookInCart = cart.some(item => item.id === book.id);
    
    if (isBookInCart) {
      showNotification('This book is already in your cart', 'warning');
      return;
    }
    
    setCart([...cart, book]);
    showNotification(`${book.title} added to cart`, 'success');
  };

  // Remove from cart functionality
  const removeFromCart = (bookId) => {
    const updatedCart = cart.filter(item => item.id !== bookId);
    setCart(updatedCart);
    showNotification('Item removed from cart', 'success');
  };

  // Clear cart functionality
  const clearCart = () => {
    setCart([]);
    showNotification('Cart cleared', 'success');
  };

  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return total + price;
    }, 0).toFixed(2);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      calculateTotal,
      notification
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);