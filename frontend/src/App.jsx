
import './App.css'
import LandingPage from './LandingPage'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Books from './pages/Books'
import Login from './auth/Login'
import PaymentPage from './pages/Payment'
import Signup from './auth/Signup'
import Cart from './pages/Cart'
import { CartProvider } from './pages/CartContext'
import MyRentals from './pages/MyRental'
import Category from './pages/Category'

function App() {




  return (
    <>

    <CartProvider>
   <BrowserRouter>
     <Routes>
       <Route path="/" element={<LandingPage />} />
       <Route path="/login" element={<Login />} />
       <Route path="/register" element={<Signup />} />
        <Route path="/books" element={<Books />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/my-rentals" element={<MyRentals />} />
        <Route path="/category" element={<Category />} />
        <Route path="/payment" element={<PaymentPage />} />
     </Routes>
   </BrowserRouter>
    </CartProvider>
    </>
  )
}

export default App



