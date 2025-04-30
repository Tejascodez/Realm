import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../pages/CartContext'; // Adjust path if needed

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigate = useNavigate();
  const { showNotification } = useCart();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      showNotification('Passwords do not match', 'error');
      return;
    }

    if (!agreeTerms) {
      showNotification('Please agree to the Terms of Service', 'error');
      return;
    }

    setLoading(true);
    
    try {
      const res = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.message || 'Signup failed');
      
      showNotification('Account created successfully!', 'success');
      navigate('/'); // Redirect to login after successful signup
    } catch (err) {
      showNotification(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-black">
      {/* Left Section: Welcome */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-purple-700 to-pink-500 items-center justify-center p-10 text-white">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6">BookRent</h1>
          <p className="text-xl mb-10">Join our community of book lovers today.</p>
          
          {/* Single Large Icon/Image */}
          <div className="flex justify-center mt-6">
            <div className="text-9xl mb-4">📚</div>
          </div>
        </div>
      </div>
      
      {/* Right Section: Signup */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md bg-gray-900 p-8 rounded-xl shadow-lg border border-purple-500">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-bold">RealM</span>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-white text-center mb-8">Create Account</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-300 mb-2 font-medium">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-4 bg-gray-800 rounded-lg text-white border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 transition-all"
                  placeholder="John Doe"
                  required
                />
                <span className="absolute right-4 top-4 text-gray-400">
                  👤
                </span>
              </div>
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2 font-medium">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-4 bg-gray-800 rounded-lg text-white border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 transition-all"
                  placeholder="your@email.com"
                  required
                />
                <span className="absolute right-4 top-4 text-gray-400">
                  ✉️
                </span>
              </div>
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2 font-medium">Password</label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-4 bg-gray-800 rounded-lg text-white border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 transition-all"
                  placeholder="••••••••"
                  required
                />
                <span className="absolute right-4 top-4 text-gray-400">
                  🔒
                </span>
              </div>
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2 font-medium">Confirm Password</label>
              <div className="relative">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-4 bg-gray-800 rounded-lg text-white border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 transition-all"
                  placeholder="••••••••"
                  required
                />
                <span className="absolute right-4 top-4 text-gray-400">
                  🔒
                </span>
              </div>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 text-pink-500 bg-gray-800 border-gray-700 rounded focus:ring-pink-500"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-300">
                I agree to the{' '}
                <Link to="/terms" className="text-pink-400 hover:text-pink-300">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-pink-400 hover:text-pink-300">
                  Privacy Policy
                </Link>
              </label>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-medium rounded-lg transition-all flex items-center justify-center mt-6"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
            
            <div className="text-center mt-6">
              <p className="text-gray-300">
                Already have an account?{' '}
                <Link to="/" className="text-pink-400 hover:text-pink-300 font-medium">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;