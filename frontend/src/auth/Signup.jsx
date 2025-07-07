import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../pages/CartContext';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { showNotification } = useCart();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
      navigate('/login');
    } catch (err) {
      showNotification(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-950 to-gray-900 text-white">
      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 justify-center items-center relative p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-800/30 to-slate-900/30 z-0 rounded-3xl blur-2xl"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 animate-gradient">Realm</h1>
          <p className="mt-6 text-xl max-w-md mx-auto leading-relaxed">Join our community of passionate readers and discover your next favorite story.</p>
          <div className="mt-10 animate-float w-60 h-48 mx-auto bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl shadow-lg flex items-center justify-center text-7xl">📚</div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-slate-900/80 p-10 rounded-3xl shadow-xl backdrop-blur-md border border-slate-800 relative">
          <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField label="Full Name" name="name" value={formData.name} onChange={handleChange} type="text" />
            <InputField label="Email Address" name="email" value={formData.email} onChange={handleChange} type="email" />
            <InputField label="Password" name="password" value={formData.password} onChange={handleChange} type={showPassword ? 'text' : 'password'} toggle={() => setShowPassword(!showPassword)} show={showPassword} />
            <InputField label="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} type={showConfirmPassword ? 'text' : 'password'} toggle={() => setShowConfirmPassword(!showConfirmPassword)} show={showConfirmPassword} />

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 accent-blue-500"
              />
              <label className="text-sm">
                I agree to the{' '}
                <Link to="/terms" className="text-blue-400 hover:underline">Terms of Service</Link>{' '}and{' '}
                <Link to="/privacy" className="text-blue-400 hover:underline">Privacy Policy</Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 font-semibold transition disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Get Started'}
            </button>
          </form>

          <p className="text-sm text-center mt-8">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, type, toggle, show }) => (
  <div>
    <label className="block text-sm mb-1 font-medium">{label}</label>
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-3 pr-10 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      {toggle && (
        <button type="button" onClick={toggle} className="absolute right-3 top-3 text-gray-400 hover:text-blue-400">
          {show ? '🙈' : '👁️'}
        </button>
      )}
    </div>
  </div>
);

export default Signup;
