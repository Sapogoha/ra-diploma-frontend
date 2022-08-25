import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addToCart(state, action) {
      const index = state.cart.findIndex(
        (item) =>
          item.id === action.payload.id && item.size === action.payload.size
      );

      if (index >= 0) {
        state.cart[index].quantity += action.payload.quantity;
      } else {
        state.cart = [...state.cart, action.payload];
      }
    },
  },
  extraReducers: {},
});

export const { addToCart } = cartSlice.actions;

export const selectCart = (state) => state.cart.cart;

export default cartSlice.reducer;
