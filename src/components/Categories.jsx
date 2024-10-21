// src/components/Categories.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { setCategoryFilter } from '../redux/productSlice';

const Categories = ({ categories }) => {
  const dispatch = useDispatch();

  const handleCategoryClick = (category) => {
    dispatch(setCategoryFilter(category)); // Dispatch category filter action
  };

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category} onClick={() => handleCategoryClick(category)}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
