// src/components/Header.jsx

// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cartIcon from '../assets/cart-icon.png'; 

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items); // Get the number of items in the cart

  return (
    <header>
      <nav>
        <h1>ShoppyGlobe</h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li>
            <Link to="/cart" className="cart-link">
              <img src={cartIcon} alt="Cart" className="cart-icon" /> 
              <span className="cart-length">{cartItems.length}</span> {/* Display number of items */}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
