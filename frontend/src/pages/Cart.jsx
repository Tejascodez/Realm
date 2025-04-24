import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';

const Button = ({ children, variant, className, ...props }) => {
  const baseClasses = "px-4 py-2 rounded-3xl font-medium transition-all duration-300";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:shadow-lg hover:shadow-pink-500/30",
    outline: "border-2 border-pink-500 text-pink-400 hover:bg-pink-500/10",
    ghost: "text-pink-400 hover:text-white",
    danger: "bg-red-500 text-white hover:bg-red-600"
  };
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Cart = () => {
  const { 
    cart, 
    removeFromCart, 
    clearCart, 
    calculateTotal,
    addToCart,
    notification 
  } = useCart();
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate('/books');
  };

  // Sample rental books data
  const rentalBooks = [
    {
      id: 'rent1',
      title: 'The Future of AI',
      author: 'Dr. Sarah Johnson',
      ratings: 4.7,
      price: '$3.99/week',
      image: null
    },
    {
      id: 'rent2',
      title: 'Modern Web Development',
      author: 'Alex Chen',
      ratings: 4.9,
      price: '$4.99/week',
      image: null
    },
    {
      id: 'rent3',
      title: 'Financial Freedom',
      author: 'Michael Roberts',
      ratings: 4.5,
      price: '$2.99/week',
      image: null
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg ${
          notification.type === 'success' ? 'bg-green-500' : 
          notification.type === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
        }`}>
          <p className="text-white">{notification.message}</p>
        </div>
      )}

      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        {cart.length === 0 ? (
          <div className="bg-gray-900 rounded-2xl p-12 text-center border border-gray-800">
            <div className="flex justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-gray-400 mb-8">Explore our collection and add books to your cart</p>
            <Button variant="primary" onClick={handleContinueShopping}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden mb-8">
                <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                  <h2 className="text-xl font-bold">Cart Items ({cart.length})</h2>
                  <Button variant="ghost" onClick={clearCart} className="text-sm">
                    Clear Cart
                  </Button>
                </div>
                
                {/* Added max-height and overflow-y-auto for scrollable cart items */}
                <div className="divide-y divide-gray-800 max-h-96 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="p-6 flex flex-col sm:flex-row sm:items-center">
                      <div className="sm:w-24 sm:h-24 bg-gray-800 rounded-lg mb-4 sm:mb-0 sm:mr-6 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-pink-400 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-lg font-bold">{item.title}</h3>
                        <p className="text-gray-400 text-sm mb-2">By {item.author}</p>
                        <div className="flex items-center mb-4">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} xmlns="http://www.w3.org/2000/svg" 
                                className={`h-4 w-4 ${i < Math.floor(item.ratings) ? "text-yellow-400" : "text-gray-600"}`} 
                                viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="ml-2 text-gray-400 text-sm">{item.ratings}/5.0</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-4 sm:mt-0">
                        <span className="text-lg font-bold text-pink-400">{item.price}</span>
                        <Button 
                          variant="danger" 
                          className="ml-6"
                          onClick={() => removeFromCart(item._id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                variant="outline" 
                onClick={handleContinueShopping}
                className="px-6 my-4"
              >
                Continue Shopping
              </Button>
              
              {/* Rental Books Section */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Out of Budget...? Try Renting🤝</h2>
                <p className="text-gray-400 mb-6">Save money with our affordable weekly rental options</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {rentalBooks.map((book) => (
                    <div key={book.id} className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20 hover:border-pink-500/30">
                      <div className="h-40 bg-gray-800 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-pink-400 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold mb-1 text-white truncate">{book.title}</h3>
                        <p className="text-sm text-gray-400 mb-2">By {book.author}</p>
                        <div className="flex items-center mb-3">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} xmlns="http://www.w3.org/2000/svg" 
                                className={`h-3 w-3 ${i < Math.floor(book.ratings) ? "text-yellow-400" : "text-gray-600"}`} 
                                viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="ml-1 text-gray-400 text-xs">{book.ratings}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-pink-400">{book.price}</span>
                          <Button variant="outline" className="text-xs px-3 py-1" >
                            Rent Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden sticky top-24">
                <div className="p-6 border-b border-gray-800">
                  <h2 className="text-xl font-bold">Order Summary</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Subtotal</span>
                      <span>${calculateTotal()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tax</span>
                      <span>${(parseFloat(calculateTotal()) * 0.075).toFixed(2)}</span>
                    </div>
                    <div className="pt-4 border-t border-gray-800 flex justify-between font-bold">
                      <span>Total</span>
                      <span className="text-pink-400">
                        ${(parseFloat(calculateTotal()) * 1.075).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-8">
                    <Button variant="primary" className="w-full py-3">
                      Place Order
                    </Button>
                  </div>

                  <div className="mt-6">
                    <div className="border-t border-gray-800 pt-6">
                      <h3 className="font-bold mb-4">Apply Promo Code</h3>
                      <div className="flex">
                        <input
                          type="text"
                          placeholder="Enter code"
                          className="flex-grow px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                        <button className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-r-lg hover:bg-gray-700 transition-colors">
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;