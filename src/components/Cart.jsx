// src/components/Cart.jsx


import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';
import { clearCart } from '../redux/cartSlice';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items); // Get cart items from Redux state
  const totalPrice = useSelector((state) => state.cart.totalPrice); // Get total price from Redux state
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleProceedToCheckout = () => {
    navigate('/checkout'); // Navigate to Checkout page
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty.</p> // Check if cart is empty
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <div className="cart-summary">
            <h3 className="total-price">Total Price: ${totalPrice.toFixed(2)}</h3>
            <div className="cart-buttons">
            <button className="clear-cart-button" onClick={() => dispatch(clearCart())}>Clear Cart</button>
            <button className="checkout-button" onClick={handleProceedToCheckout}>Proceed to Checkout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
