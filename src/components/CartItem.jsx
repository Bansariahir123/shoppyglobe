
import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/cartSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="cart-item-card">
      <img className="cart-item-image" src={item.thumbnail} alt={item.title} />
      <div className="cart-item-details">
        <h4 className="cart-item-title">{item.title}</h4>
        <p className="cart-item-price">Price: ${item.price}</p>
        <div className="cart-item-quantity">
          <button onClick={() => dispatch(updateQuantity({ id: item.id, amount: -1 }))}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => dispatch(updateQuantity({ id: item.id, amount: 1 }))}>+</button>
        </div>
        <button className="remove-item-button" onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
      </div>
    </div>
  );
};

export default CartItem;
