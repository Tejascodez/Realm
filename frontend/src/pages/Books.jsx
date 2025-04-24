import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useCart } from './CartContext';
import axios from 'axios';


const Button = ({ children, variant, className, ...props }) => {
    const baseClasses = "px-4 py-2 rounded-3xl font-medium transition-all duration-300";

    const variantClasses = {
        primary: "bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:shadow-lg hover:shadow-pink-500/30",
        outline: "border-2 border-pink-500 text-pink-400 hover:bg-pink-500/10",
        ghost: "text-pink-400 hover:text-white"
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




const RentalModal = ({ book, onClose, onRent }) => {
  const [selectedDuration, setSelectedDuration] = useState(7); // Default to 7 days
  const navigate = useNavigate();
const {showNotification} = useCart();

  const rentalDurations = [
    { days: 3, label: '3 Days' },
    { days: 7, label: '7 Days' },
    { days: 9, label: '9 Days' },
    { days: 15, label: '15 Days' },
    { days: 30, label: '30 Days' },
  ];

  // Calculate rental price based on duration
  const calculateRentalPrice = (basePrice, days) => {
    let numericPrice;

    if (typeof basePrice === 'string') {
      numericPrice = parseFloat(basePrice.replace(/[$,]/g, '')) || 0;
    } else if (typeof basePrice === 'number') {
      numericPrice = basePrice;
    } else {
      console.warn('Book price is in an unexpected format:', basePrice);
      numericPrice = 0;
    }

    const dailyRate = numericPrice / 10; // Simplified calculation
    return (dailyRate * days).toFixed(2);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    console.log('Token:', token);
    console.log('User Data:', userData);
  
    let user = null; // Declare user properly
  
    // Parse user data from localStorage
    try {
      if (userData) {
        user = JSON.parse(userData);
      }
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
    }
  
    // Check if user data is valid
    if (!user || !user._id) {
      showNotification('User data is invalid. Please log in again.', 'error');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
      return;
    }
  
    // Calculate rental price based on selected duration
    const rentalPrice = parseFloat(calculateRentalPrice(book.price, selectedDuration));
  
    // Calculate expiration date
    const createdAt = new Date();
    const expiresAt = new Date(createdAt.getTime() + selectedDuration * 24 * 60 * 60 * 1000);
  
    // Handle book ID (support both _id and id)
    const payload = {
      userId: user._id,
      bookId: book._id || book.id,
      rentalDays: selectedDuration,
      price: rentalPrice,
      createdAt,
      expiresAt,
    };
  
    try {
      const response = await axios.post(
        'http://localhost:3000/api/rentals/add',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (onRent) {
        onRent({
          ...response.data,
          book,
        });
      }
  
      showNotification('Rental placed successfully!', 'success');
      onClose();
    } catch (error) {
      console.error('Error placing rental order:', error);
      const message = error.response?.data?.message || 'Rental failed. Please try again.';
      showNotification(message, 'error');
    }
  };
  
  // Close modal when clicking outside of content
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-900 rounded-2xl border border-gray-800 w-full max-w-lg overflow-hidden animate-fade-up">
        <div className="relative">
          {/* Header */}
          <div className="p-6 border-b border-gray-800 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Rent Book</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Book Details */}
          <div className="p-6 flex items-start border-b border-gray-800">
            <div className="bg-gray-800 rounded-lg h-32 w-24 flex items-center justify-center mr-6">
              {book.bookImage ? (
                <img
                  src={book.bookImage}
                  alt={`${book.title} cover`}
                  className="object-cover w-full h-full rounded-lg"
                />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-pink-400 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">{book.title}</h3>
              <p className="text-gray-400 text-sm mb-2">By {book.author}</p>
              <div className="flex items-center mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 ${i < Math.floor(book.ratings) ? 'text-yellow-400' : 'text-gray-600'}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-gray-400 text-sm">{book.ratings}/5.0</span>
              </div>
              <p className="text-pink-400 font-bold mb-1">Purchase price: {book.price}</p>
            </div>
          </div>

          <form onSubmit={handlePlaceOrder}>
            {/* Rental Duration Selection */}
            <div className="p-6 border-b border-gray-800">
              <h3 className="font-bold text-white mb-4">Select Rental Duration</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {rentalDurations.map((duration) => (
                  <label
                    key={duration.days}
                    className={`flex items-center py-3 px-4 rounded-lg border cursor-pointer transition-all ${
                      selectedDuration === duration.days
                        ? 'border-pink-500 bg-pink-500/10'
                        : 'border-gray-700 hover:border-pink-500/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="duration"
                      value={duration.days}
                      checked={selectedDuration === duration.days}
                      onChange={() => setSelectedDuration(duration.days)}
                      className="hidden"
                    />
                    <div
                      className={`w-4 h-4 rounded-full border mr-3 flex items-center justify-center ${
                        selectedDuration === duration.days ? 'border-pink-500' : 'border-gray-500'
                      }`}
                    >
                      {selectedDuration === duration.days && (
                        <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                      )}
                    </div>
                    <div>
                      <p className="text-white">{duration.label}</p>
                      <p className="text-pink-400 text-sm">${calculateRentalPrice(book.price, duration.days)}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Order Summary and Place Order Button */}
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Rental Total:</span>
                <span className="text-xl font-bold text-pink-400">
                  ${calculateRentalPrice(book.price, selectedDuration)}
                </span>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-400">Return Date:</span>
                <span className="text-white">
                  {new Date(Date.now() + selectedDuration * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-pink-500 hover:bg-pink-600 text-black font-medium rounded-lg transition-colors"
              >
                Place Rental Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


const Books = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [rentals, setRentals] = useState([]);
    const [showRentalModal, setShowRentalModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // Get cart and notification from context

    


    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('http://localhost:3000/api/books');

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const data = await response.json();

                // Set all books
                setBooks(data);

                // Select 3 random books as featured books (for carouse
            } catch (error) {
                console.error("Failed to fetch books:", error);
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchBooks();
    }, []);
    const { cart, addToCart, notification, showNotification } = useCart();

    // Check login status
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);

        // Load rentals from localStorage if available
        const savedRentals = localStorage.getItem('rentals');
        if (savedRentals) {
            setRentals(JSON.parse(savedRentals));
        }
    }, []);

    // Save rentals to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('rentals', JSON.stringify(rentals));
    }, [rentals]);

    // Open rental modal
    const openRentalModal = (book) => {
        setSelectedBook(book);
        setShowRentalModal(true);
    };

    // Close rental modal
    const closeRentalModal = () => {
        setShowRentalModal(false);
    };

    // Add the missing rentBook function
    const rentBook = (book) => {
        // Check if book is already rented
        const isBookRented = rentals.some(item => item.id === book.id);

        if (isBookRented) {
            // Use showNotification if it's available from context, otherwise handle directly
            if (showNotification) {
                showNotification('This book is already in your rentals', 'warning');
            } else {
                // Fallback if showNotification isn't exposed in your context
                alert('This book is already in your rentals');
            }
            return;
        }

        setRentals([...rentals, book]);

        // Use showNotification if it's available from context, otherwise handle directly
        if (showNotification) {
            showNotification(`${book.title} added to rentals for ${book.rentalDuration} days`, 'success');
        } else {
            // Fallback if showNotification isn't exposed in your context
            alert(`${book.title} added to rentals for ${book.rentalDuration} days`);
        }
    };



    const carouselBooks = [
        {
            id: 101,
            title: "In Good Company",
            author: "Ava Winters",
            price: "$5.99",
            ratings: 4.7,
            image: "https://m.media-amazon.com/images/I/81lgPIQzN5L._SY522_.jpg"
        },
        {
            id: 102,
            title: "Say you will Remember me",
            author: "Liam Harper",
            price: "$6.49",
            ratings: 4.5,
            image: "https://m.media-amazon.com/images/I/51wU-9LD7xL._SY445_SX342_QL70_FMwebp_.jpg"
        },
        {
            id: 103,
            title: "My Happy Place",
            author: "Sophia Bennett",
            price: "$4.99",
            ratings: 4.8,
            image: "https://ombooks.com/wp-content/uploads/2024/05/9780241995365.jpg"
        }
    ];

    return (
        <div className="bg-black text-white min-h-screen font-sans">
            {/* Navbar */}
            <Navbar cartCount={cart.length} />

            {/* Notification */}
            {notification.show && (
                <div className={`fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg ${notification.type === 'success' ? 'bg-green-500' :
                    notification.type === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}>
                    <p className="text-white">{notification.message}</p>
                </div>
            )}

            {/* Rental Modal */}
            {showRentalModal && selectedBook && (
                <RentalModal
                    book={selectedBook}
                    onClose={closeRentalModal}
                    onRent={rentBook}
                />
            )}

            {/* Carousel Section */}
            <section className="container mx-auto px-6 py-8">
                <Swiper
                    modules={[Pagination, Navigation]}
                    spaceBetween={0}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    navigation
                    loop={true}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    className="rounded-2xl overflow-hidden h-96"
                >
                    {carouselBooks.map((book) => (
                        <SwiperSlide key={book.id}>
                            <div className="relative w-full h-full bg-gradient-to-r from-gray-900 to-black">
                                {/* Dark overlay for better text visibility */}
                                <div className="absolute inset-0 bg-black/50 z-10"></div>

                                {/* Background image placeholder */}
                                <div className="absolute inset-0 bg-gradient-to-r from-pink-900/20 to-purple-900/20 z-0">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-40 w-40 text-pink-500/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="relative z-20 flex h-full">
                                    <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
                                        <div className="inline-block px-2 py-1 bg-pink-500/20 text-pink-400 rounded-full text-sm font-medium mb-4 w-fit">
                                            Featured Book
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white leading-tight">
                                            {book.title}
                                        </h2>
                                        <p className="text-gray-300 mb-4">By {book.author}</p>
                                        <div className="flex items-center mb-6">
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg key={i} xmlns="http://www.w3.org/2000/svg"
                                                        className={`h-5 w-5 ${i < Math.floor(book.ratings) ? "text-yellow-400" : "text-gray-600"}`}
                                                        viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                            <span className="ml-2 text-gray-400 text-sm">{book.ratings}/5.0</span>
                                        </div>
                                        <p className="text-xl font-bold text-pink-400 mb-6">{book.price}</p>
                                        <div className="flex space-x-4">
                                            <Button variant="primary" className="px-8" onClick={() => openRentalModal(book)}>
                                                Rent Now
                                            </Button>
                                            <Button variant="outline" onClick={() => addToCart(book)}>
                                                Add to Cart
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="hidden md:flex md:w-1/2 items-center justify-center p-8">
                                        <div className="w-64 h-80 rounded-lg shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300 overflow-hidden group">
                                            <img
                                                src={book.image}
                                                alt={book.title}
                                                className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>

            {/* Search Bar */}
            <div className="container mx-auto px-6 py-6">
                <div className="relative max-w-2xl mx-auto">
                    <input
                        type="text"
                        placeholder="Search for books..."
                        className="w-full px-6 py-3 rounded-full bg-gray-900 border border-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent placeholder-gray-400 transition-all duration-300 hover:bg-gray-800"
                    />
                    <button className="absolute right-2 top-2 bg-gradient-to-r from-pink-500 to-purple-500 p-2 rounded-full hover:scale-105 transition-transform duration-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Books Grid */}
            <section className="container mx-auto px-6 py-12">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold">Popular Books</h2>
                    <div className="flex space-x-2">
                        <button className="px-4 py-2 text-sm rounded-full bg-gray-900 border border-gray-800 text-gray-400 hover:border-pink-500 transition-all">
                            All
                        </button>
                        <button className="px-4 py-2 text-sm rounded-full bg-gray-900 border border-gray-800 text-gray-400 hover:border-pink-500 transition-all">
                            Fiction
                        </button>
                        <button className="px-4 py-2 text-sm rounded-full bg-gray-900 border border-gray-800 text-gray-400 hover:border-pink-500 transition-all">
                            Non-Fiction
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {books.map((book) => (
                        <div
                            key={book._id || book.id || `book-${book.title}-${book.author}`} // Use _id if available, fall back to id, then a composite key
                            className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden hover:border-pink-500/30 hover:shadow-lg hover:shadow-pink-500/10 transition-all duration-300 group"
                        >
                            <div className="w-full h-52 bg-gray-800 relative overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    {/* Updated image element with sizing classes */}
                                    <img
                                        src={book.coverImage}
                                        alt={book.title}
                                        className="w-full h-full object-contain max-w-[90%] max-h-[90%]"
                                    />
                                </div>
                                <div className="absolute top-4 right-4">
                                    <button className="bg-black/40 hover:bg-black/60 p-2 rounded-full transition-all">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-bold text-white">{book.title}</h3>
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="ml-1 text-sm text-gray-400">{book.ratings}</span>
                                    </div>
                                </div>
                                <p className="text-gray-400 text-sm mb-4">By {book.author}</p>

                                <div className="flex justify-between items-center">
                                    <span className="text-pink-400 font-bold">{book.price}</span>
                                    <div className="flex space-x-2">
                                        <Button onClick={() => addToCart(book)}>
                                            Add to Cart
                                        </Button>
                                        <Button variant="outline" onClick={() => openRentalModal(book)}>
                                            Rent
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>


            {/* Footer */}
            <footer className="bg-gray-900 border-t border-gray-800 py-8">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-6 md:mb-0">
                            <h2 className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                                BOOKHUB
                            </h2>
                            <p className="text-gray-400 mt-2">Your digital reading companion.</p>
                        </div>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors duration-300">
                                Terms
                            </a>
                            <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors duration-300">
                                Privacy
                            </a>
                            <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors duration-300">
                                Help
                            </a>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
                        &copy; {new Date().getFullYear()} BOOKHUB. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Books;