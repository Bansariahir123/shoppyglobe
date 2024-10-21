// src/redux/productSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: '', // Category filter state
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCategoryFilter: (state, action) => {
      state.category = action.payload; // Update the category filter
    },
  },
});

export const { setCategoryFilter } = productSlice.actions;
export default productSlice.reducer;
