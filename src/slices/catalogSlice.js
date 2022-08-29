import { createSlice } from '@reduxjs/toolkit';

import { fetchCatalog, fetchMoreItems } from '../thunks/asyncThunks';

const initialState = {
  catalog: [],
  loading: false,
  loadingNewItems: false,
  error: { status: null, message: null },
  showFetchMoreButton: false,
  endOfList: false,
};

export const catalogSlice = createSlice({
  name: 'catalogSlice',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCatalog.pending]: (state) => {
      state.loading = true;
      state.error = { status: null, message: null };
      state.showFetchMoreButton = false;
      state.endOfList = false;
    },
    [fetchCatalog.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = { status: null, message: null };
      if (action.payload.length >= 6) {
        state.showFetchMoreButton = true;
        state.endOfList = false;
      } else {
        // state.showFetchMoreButton = false;
        state.endOfList = true;
      }
      // console.log(action.payload);
      state.catalog = action.payload;
    },
    [fetchCatalog.rejected]: (state, action) => {
      state.loading = false;
      state.error.status = true;
      state.error.message = action.payload;
      state.showFetchMoreButton = false;
      state.endOfList = false;
    },
    [fetchMoreItems.pending]: (state) => {
      state.loadingNewItems = true;
      state.error = { status: null, message: null };
      state.showFetchMoreButton = false;
      state.endOfList = false;
    },
    [fetchMoreItems.fulfilled]: (state, action) => {
      state.loadingNewItems = false;
      state.error = { status: null, message: null };
      const numberOfItems = action.payload.length;
      if (numberOfItems > 0) {
        state.catalog = [...state.catalog, ...action.payload];
        numberOfItems < 6
          ? (state.showFetchMoreButton = false)
          : (state.showFetchMoreButton = true);
      } else {
        state.endOfList = true;
        state.showFetchMoreButton = false;
      }
    },
    [fetchMoreItems.rejected]: (state, action) => {
      state.loadingNewItems = false;
      console.log(state.catalog);
      state.error.status = true;
      state.error.message = action.payload;
      state.showFetchMoreButton = false;
      state.endOfList = false;
    },
  },
});

export const selectCatalog = (state) => state.catalog.catalog;
export const selectLoading = (state) => state.catalog.loading;
export const selectError = (state) => state.catalog.error;
export const selectLoadingNewItems = (state) => state.catalog.loadingNewItems;
export const selectShowFetchMoreButton = (state) =>
  state.catalog.showFetchMoreButton;
export const selectEndOfList = (state) => state.catalog.endOfList;

export default catalogSlice.reducer;
