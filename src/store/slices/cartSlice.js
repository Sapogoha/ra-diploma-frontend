import { createSlice } from '@reduxjs/toolkit';

import { refreshPrice } from '../thunks/asyncThunks';

const initialState = {
  cart: [],
  newPrice: null,
  loading: false,
  error: { status: null, message: null },
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
    removeFromCart(state, action) {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      state.newPrice = null;
    },

    clearCart(state) {
      state.cart = [];
      state.newPrice = null;
    },
    updateProduct(state, action) {
      const index = state.cart.findIndex(
        (item) =>
          item.id === action.payload.id && item.size === action.payload.size
      );

      if (index >= 0) {
        state.cart[index].price = action.payload.price;
        state.newPrice = null;
      }
    },
  },
  extraReducers: {
    [refreshPrice.pending]: (state) => {
      state.loading = true;
      state.error = { status: null, message: null };
    },
    [refreshPrice.fulfilled]: (state, action) => {
      if (action.payload.id)
        state.newPrice = {
          id: action.payload.id,
          price: action.payload.price,
          title: action.payload.title,
        };
      state.loading = false;
      state.error = { status: null, message: null };
    },
  },
  [refreshPrice.rejected]: (state, action) => {
    state.loading = false;
    state.error = { status: true, message: action.payload };
  },
});

export const { addToCart, removeFromCart, clearCart, updateProduct } =
  cartSlice.actions;

export const selectCart = (state) => state.cart.cart;
export const selectNumberOfItems = (state) => state.cart.cart.length;
export const selectNewPrice = (state) => state.cart.newPrice;
export const selectLoading = (state) => state.categories.loading;
export const selectError = (state) => state.categories.error;

export default cartSlice.reducer;
