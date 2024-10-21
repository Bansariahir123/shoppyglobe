

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductItem from './ProductItem';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../redux/cartSlice';
import searchIcon from '../assets/search-icon.png'; // Adjust the path as necessary

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all'); // For category filtering
  const searchTerm = useSelector((state) => state.cart.searchTerm); // Fetch searchTerm from Redux state
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        setProducts(response.data.products);
      } catch (err) {
        setError('Failed to fetch products');
      }
    };
    fetchProducts();
  }, []);

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value)); // Dispatch search term to Redux
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Filter products by both search term and selected category
  const filteredProducts = products
    .filter((product) => product.title.toLowerCase().includes(searchTerm.toLowerCase())) // Search filter
    .filter((product) => selectedCategory === 'all' || product.category === selectedCategory); // Category filter

  return (
    <div>
      <h1 className="explore-heading">
        {Array.from("Explore the Products...").map((char, index) => (
          <span key={index} style={{ animationDelay: `${index * 100}ms`, marginRight: char === " " ? "8px" : "0" }}>
            {char}
          </span>
        ))}
      </h1>
      {error && <p>{error}</p>}

      {/* Search Input */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={handleSearchChange} // Handle search input
        />
        <img src={searchIcon} alt="Search" className="search-icon" />
      </div>

      {/* Category Filter */}
      <div className="category-filter">
        <button onClick={() => handleCategoryChange('all')}>All</button>
        <button onClick={() => handleCategoryChange('beauty')}>Beauty</button>
        <button onClick={() => handleCategoryChange('fragrances')}>Fragrances</button>
        <button onClick={() => handleCategoryChange('furniture')}>Furniture</button>
        <button onClick={() => handleCategoryChange('groceries')}>Groceries</button>

      </div>

      {/* Product List */}
      <div>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
