
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { placeOrder } from '../redux/cartSlice';
const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items); // Get cart items from Redux state
  const totalPrice = useSelector((state) => state.cart.totalPrice); // Get total price from Redux state
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const handlePlaceOrder = () => {
    dispatch(placeOrder());
    navigate('/'); // Redirect to home after placing the order
    
  };

  return (
    <div className="checkout-container">
      <h1 className="checkout-name">Order Summary</h1>
      {cartItems.length === 0 ? (
        <p>No items to checkout.</p>
      ) : (
        <div className="cart-items-checkout">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item-card-checkout">
              <h4>{item.title}</h4>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price.toFixed(2)}</p>
            </div>
          ))}
          <h3 className="total-price-checkout">Total Price: ${totalPrice.toFixed(2)}</h3>
          <button className="place-order-button" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;

