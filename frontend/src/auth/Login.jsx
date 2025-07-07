import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import login from '../assets/Login.jpg';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/users/login', formData);
      localStorage.setItem('authToken', response.data.token);
      toast.success('Login successful! Redirecting...');
      setTimeout(() => navigate('/books'), 2000);
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 to-slate-900 text-white">
      <div className="bg-slate-900/90 shadow-xl rounded-3xl flex overflow-hidden max-w-4xl w-full">
        {/* Left - Image */}
        <div className="hidden md:flex w-1/2 bg-slate-800">
          <img src={login} alt="Login Visual" className="w-full object-cover" />
        </div>

        {/* Right - Form */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-3xl font-bold text-center mb-6 text-cyan-300">Welcome to Realm</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-800 text-white border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-800 text-white border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400 hover:text-blue-400"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2 accent-blue-500"
                />
                Remember me
              </label>
              <a href="#" className="text-blue-400 hover:underline">Forgot password?</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-md font-semibold hover:from-blue-500 hover:to-cyan-500 transition disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            <p className="text-sm text-center text-slate-400 mt-6">
              Don’t have an account?
              <a href="/register" className="text-blue-400 ml-1 hover:underline">Sign up</a>
            </p>
          </form>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
        pauseOnHover
      />
    </div>
  );
};

export default Login;
