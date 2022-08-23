import { createSlice } from '@reduxjs/toolkit';

import { fetchTopSales } from '../thunks/asyncThunks';

const initialState = {
  items: [],
  loading: false,
  error: { status: null, message: null },
};

export const topSalesSlice = createSlice({
  name: 'topSalesSlice',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTopSales.pending]: (state) => {
      state.loading = true;
      state.error.status = null;
      state.error.message = null;
    },
    [fetchTopSales.fulfilled]: (state, action) => {
      state.loading = false;
      state.error.status = null;
      state.error.message = null;
      state.items = action.payload;
    },
    [fetchTopSales.rejected]: (state, action) => {
      state.loading = false;
      state.error.status = true;
      state.error.message = action.payload;
    },
  },
});

export const selectTopSales = (state) => state.topSales.items;
export const selectLoading = (state) => state.topSales.loading;
export const selectError = (state) => state.topSales.error;

export default topSalesSlice.reducer;
