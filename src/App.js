import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import Navigation from './components/Navigation';
import Products from './components/Products';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import { fetchCart } from './services/cart'

const App = () => {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchCart(user, setCartItems, setLoading, setError);
    }
  }, [user]);

  return (
    <Router>
      <Navigation user={user} setUser={setUser} setCartItems={setCartItems} />
      <div>
        <Routes>
          <Route path="/" element={user ?
            <Products user={user} cartItems={cartItems} setCartItems={setCartItems} /> :
            <Navigate to="/login" />} />
          <Route path="/login" element={!user ? <Auth setUser={setUser} /> : <Navigate to="/" />} />
          <Route path="/products" element={<Products user={user} cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/cart" element={<Cart user={user} cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/checkout" element={<Checkout user={user} cartItems={cartItems} setCartItems={setCartItems} setLoading={setLoading} setError={setError}/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
