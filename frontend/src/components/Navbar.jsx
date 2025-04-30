import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = ({ cartCount = 0 }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };
  
    checkAuth(); // initial check
  
    window.addEventListener('storage', checkAuth); // detect changes in other tabs
  
    // cleanup
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);
  
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div>
      <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent transition-all duration-500 hover:from-pink-300 hover:to-purple-300">
              REALM
            </h1>
          </Link>
          
          <div className="hidden md:flex space-x-8">
          {["Home", "Categories", "My Rentals"].map((item) => (
  <Link 
    key={item} 
    to={
      item === "Home"
        ? "/"
        : item === "Categories"
        ? "/category" // <-- Set default category route here
        : `/${item.toLowerCase().replace(' ', '-')}`
    }
    className="relative group text-gray-300 hover:text-white transition-all duration-300"
  >
    {item}
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-400 transition-all duration-300 group-hover:w-full"></span>
  </Link>
))}

          </div>
          
          <div className="flex items-center space-x-4">
            {isLoggedIn && (
              <Link to="/cart" className="text-gray-300 hover:text-white transition-all duration-300 relative">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6"
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}
            
            {isLoggedIn ? (
              <button 
                onClick={handleLogout}
                className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30"
              >
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button 
                  className="bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-2 rounded-full hover:from-pink-600 hover:to-purple-600 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/30"
                >
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;