import { createSlice } from '@reduxjs/toolkit';

import { fetchProductItem } from '../thunks/asyncThunks';

const initialState = {
  product: null,
  loading: false,
  error: { status: null, message: null },
  quantity: 0,
  size: null,
};

export const productItemSlice = createSlice({
  name: 'productItemSlice',
  initialState,
  reducers: {
    increment: (state) => {
      state.quantity < 10 ? (state.quantity += 1) : (state.quantity = 10);
    },
    decrement: (state) => {
      state.quantity > 0 ? (state.quantity -= 1) : (state.quantity = 0);
    },
    toggleSize: (state, action) => {
      state.size === action.payload
        ? (state.size = null)
        : (state.size = action.payload);
    },
    removeQuantity: (state) => {
      state.quantity = 0;
    },
  },
  extraReducers: {
    [fetchProductItem.pending]: (state) => {
      state.loading = true;
      state.error = { status: null, message: null };
    },
    [fetchProductItem.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = { status: null, message: null };
      state.product = action.payload;
    },
    [fetchProductItem.rejected]: (state, action) => {
      state.loading = false;
      state.error = { status: true, message: action.payload };
    },
  },
});

export const selectProduct = (state) => state.product.product;
export const selectLoading = (state) => state.product.loading;
export const selectError = (state) => state.product.error;
export const selectQuantity = (state) => state.product.quantity;
export const selectSize = (state) => state.product.size;

export const { increment, decrement, toggleSize, removeQuantity } =
  productItemSlice.actions;

export default productItemSlice.reducer;
