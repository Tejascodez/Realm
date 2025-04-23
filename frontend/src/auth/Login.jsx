import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Login failed')
  
      // ✅ Save token
      localStorage.setItem('token', data.token)
  
      // ✅ Optional: trigger manual storage event to update UI
      window.dispatchEvent(new Event('storage'))
  
      alert('Login successful')
      navigate('/books')
    } catch (err) {
      alert(err.message)
    }
  }
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleSubmit} className="bg-pink-600 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
        <input
          className="w-full p-3 mb-4 rounded bg-black text-white border border-pink-400"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full p-3 mb-4 rounded bg-black text-white border border-pink-400"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-black text-pink-500 border border-pink-500 py-3 rounded hover:bg-pink-500 hover:text-black transition-all"
        >
          Log In
        </button>
        <p className="mt-4 text-center text-sm">
          Don't have an account? <Link to="/signup" className="text-white underline">Sign Up</Link>
        </p>
      </form>
    </div>
  )
}
