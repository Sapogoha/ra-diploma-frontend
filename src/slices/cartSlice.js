import { createSlice } from '@reduxjs/toolkit';

const savedCart = localStorage.getItem('cart');
const empty = {
  cart: [],
  sum: 0,
};
const initialState = savedCart ? JSON.parse(savedCart) : empty;

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
        state.sum += action.payload.price * action.payload.quantity;
      } else {
        state.cart = [...state.cart, action.payload];
        state.sum += action.payload.price * action.payload.quantity;
      }
      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeFromCart(state, action) {
      const toDelete = state.cart.find((item) => item.id === action.payload);
      state.sum -= toDelete.quantity * toDelete.price;
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      state.cart.length > 0
        ? localStorage.setItem('cart', JSON.stringify(state))
        : localStorage.removeItem('cart', JSON.stringify(state));
    },

    emptyCart(state) {
      state.cart = [];
      state.sum = 0;
      localStorage.removeItem('cart', JSON.stringify(state));
    },
  },
});

export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;

export const selectCart = (state) => state.cart.cart;
export const selectNumberOfItems = (state) => state.cart.cart.length;
export const selectSum = (state) => state.cart.sum;

export default cartSlice.reducer;
