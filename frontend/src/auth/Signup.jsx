import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../pages/CartContext';

const Signup = () => {
  // ... (keep existing state and logic)
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
      navigate('/login'); // Redirect to login after successful signup
    } catch (err) {
      showNotification(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-96 h-96 bg-purple-500/30 rounded-full -top-48 -left-48 blur-3xl animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-pink-500/30 rounded-full -bottom-48 -right-48 blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Left Section: Welcome */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-purple-700 to-pink-500 items-center justify-center p-10 text-white relative">
        <div className="text-center relative z-10">
          <h1 className="text-6xl font-bold mb-6 font-[Poppins] tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-pink-100">
            RealM 
          </h1>
          <p className="text-xl mb-10 opacity-90 font-light">
            Discover your next favorite story. Join our community of passionate readers.
          </p>
          
          <div className="flex justify-center mt-6">
            <div className="text-9xl mb-4 animate-float">
              📚
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Section: Signup */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-10 relative">
        <div className="w-full max-w-md bg-gray-900/95 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-purple-500/30 relative overflow-hidden">
          {/* Animated Border Glow */}
          <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/30 to-pink-500/30 rounded-2xl blur-xl animate-border-glow"></div>
          
          {/* Logo Container */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg hover:rotate-12 transition-transform duration-300">
              <span className="text-white text-2xl font-bold tracking-tighter">RealM</span>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-white text-center mb-8 font-[Poppins]">
            Create Your Account
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Input Fields */}
            {[
              { label: 'Full Name', name: 'name', type: 'text', icon: '👤' },
              { label: 'Email Address', name: 'email', type: 'email', icon: '✉️' },
              { label: 'Password', name: 'password', type: 'password', icon: '🔒' },
              { label: 'Confirm Password', name: 'confirmPassword', type: 'password', icon: '🔒' },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-gray-300/90 mb-2 font-medium text-sm tracking-wide">
                  {field.label}
                </label>
                <div className="relative group">
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="w-full p-4 bg-gray-800/50 rounded-xl text-white border-2 border-gray-700/50 focus:border-purple-500/80 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 placeholder-gray-500 group-hover:border-purple-500/30"
                    placeholder={field.type === 'password' ? '••••••••' : field.label}
                    required
                  />
                  <span className="absolute right-4 top-4 text-gray-400/80 group-hover:text-purple-400 transition-colors">
                    {field.icon}
                  </span>
                </div>
              </div>
            ))}
            
            {/* Terms Checkbox */}
            <div className="flex items-center space-x-3">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-5 h-5 appearance-none bg-gray-800/50 border-2 border-gray-700/50 rounded-md checked:bg-purple-500 checked:border-purple-500 focus:ring-2 focus:ring-purple-500/30 cursor-pointer transition-colors"
                />
                <svg 
                  className="absolute left-1 top-1 w-3 h-3 pointer-events-none opacity-0 transition-opacity duration-200"
                  style={{ display: agreeTerms ? 'block' : 'none' }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <label htmlFor="terms" className="text-sm text-gray-300/80 leading-tight">
                I agree to the{' '}
                <Link to="/terms" className="text-purple-400 hover:text-purple-300 transition-colors font-medium">
                  Terms
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-purple-400 hover:text-purple-300 transition-colors font-medium">
                  Privacy Policy
                </Link>
              </label>
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-600/90 hover:to-pink-500/90 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-purple-500/20 relative overflow-hidden"
            >
              {/* Animated Button Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              
              {loading ? (
                <span className="flex items-center justify-center space-x-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Creating Account...</span>
                </span>
              ) : (
                <span className="relative flex items-center justify-center space-x-2">
                  <span>Get Started</span>
                  <svg className="w-4 h-4 animate-bounce-x" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </span>
              )}
            </button>
            
            {/* Login Link */}
            <div className="text-center mt-6">
              <p className="text-gray-300/80">
                Already registered?{' '}
                <Link to="/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors group">
                  Sign In
                  <span className="block h-0.5 bg-purple-500/30 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
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