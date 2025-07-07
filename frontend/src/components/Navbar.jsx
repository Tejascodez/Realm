import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ cartCount = 0 }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const authToken = localStorage.getItem('authToken');
      setIsLoggedIn(!!authToken);
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div>
      <nav className="sticky top-0 z-50 bg-[#0f172a]/90 backdrop-blur-md border-b border-gray-700">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent transition-all duration-500 hover:from-indigo-300 hover:to-cyan-300">
              REALM
            </h1>
          </Link>

          {/* Menu Items */}
          <div className="hidden md:flex space-x-8">
            {["Home", "Categories", "My Rentals"].map((item) => (
              <Link 
                key={item}
                to={
                  item === "Home"
                    ? "/"
                    : item === "Categories"
                    ? "/category"
                    : `/${item.toLowerCase().replace(' ', '-')}`
                }
                className="relative group text-gray-300 hover:text-white transition-all duration-300"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Right Side Icons / Buttons */}
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
                  <span className="absolute -top-2 -right-2 bg-cyan-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            {/* Auth Buttons */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-2 rounded-full hover:from-indigo-600 hover:to-cyan-600 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 text-white font-medium"
              >
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button
                  className="bg-gradient-to-r from-cyan-500 to-indigo-500 px-6 py-2 rounded-full hover:from-cyan-600 hover:to-indigo-600 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/30 text-white font-medium"
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
