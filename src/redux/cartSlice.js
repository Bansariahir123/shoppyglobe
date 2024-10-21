import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalPrice: 0,  // Add totalPrice to the state to track the total cost
  searchTerm: '', // Existing search term for filtering/searching products
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = state.items.find((item) => item.id === action.payload.id);
      if (product) {
        product.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalPrice += action.payload.price;  // Update total price when an item is added
    },
    removeFromCart: (state, action) => {
      const product = state.items.find((item) => item.id === action.payload);
      if (product) {
        state.totalPrice -= product.price * product.quantity;  // Subtract the total price when the item is removed
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },
    updateQuantity: (state, action) => {
      const product = state.items.find((item) => item.id === action.payload.id);
      if (product) {
        const oldTotal = product.price * product.quantity;  // Store the old total price for this product
        product.quantity += action.payload.amount;

        if (product.quantity <= 0) {
          state.items = state.items.filter((item) => item.id !== action.payload.id);
        }

        const newTotal = product.price * product.quantity;  // Calculate the new total price for this product
        state.totalPrice += newTotal - oldTotal;  // Adjust the total price based on the quantity change
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;  // Reset the total price when the cart is cleared
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload; // Update the search term
    },
    placeOrder: (state) => {
      alert("Order placed successfully!"); // Simple alert to notify order placement
      state.items = []; // Clear the cart after placing the order
      state.totalPrice = 0; // Reset total price after placing the order
    }
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, setSearchTerm, placeOrder } = cartSlice.actions;
export default cartSlice.reducer;
