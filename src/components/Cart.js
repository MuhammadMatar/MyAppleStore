import React from 'react';
import { removeItemFromCart } from '../services/cart'

const Cart = ({ user, cartItems, setCartItems }) => {
  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <div className="alert alert-info">
          Your cart is empty.
        </div>
      ) : (
        <div className="row">
          {cartItems.map((item, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <img src={item.imageUrl} className="card-img-top" alt={item.name} style={{ maxHeight: '200px', objectFit: 'cover' }} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.description}</p>
                  <p className="card-text font-weight-bold">${item.price}</p>
                  <button className="btn btn-danger w-100" onClick={() => removeItemFromCart(index, user, cartItems, setCartItems)}>Remove from Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
