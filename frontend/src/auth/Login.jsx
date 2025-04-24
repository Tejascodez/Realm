import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../pages/CartContext'; // Adjust path if needed

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { showNotification } = useCart();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/users/login', {
        email,
        password,
      });

      const { token, _id, name, email: userEmail } = response.data;
      console.log('Login response:', response.data);

      if (!token || !_id) {
        throw new Error('Invalid login response: Missing token or user data');
      }

      const user = { _id, name, email: userEmail };

      // Store token and user in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      console.log('Stored in localStorage:', {
        token: localStorage.getItem('token'),
        user: localStorage.getItem('user'),
      });

      showNotification('Login successful!', 'success');
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      const message = error.response?.data?.message || 'Login failed. Please try again.';
      showNotification(message, 'error');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-900 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-6">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-gray-400 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-gray-800 rounded-lg text-white"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-400 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-gray-800 rounded-lg text-white"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-pink-500 hover:bg-pink-600 text-black font-medium rounded-lg"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
