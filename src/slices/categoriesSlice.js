import { createSlice } from '@reduxjs/toolkit';

import { fetchCategories } from '../thunks/asyncThunks';

const initialState = {
  categories: [],
  activeCategoryId: null,
  loading: false,
  error: { status: null, message: null },
};

export const categoriesSlice = createSlice({
  name: 'categoriesSlice',
  initialState,
  reducers: {
    chooseActiveCategory(state, action) {
      state.activeCategoryId = action.payload;
    },
  },
  extraReducers: {
    [fetchCategories.pending]: (state) => {
      state.loading = true;
      state.error = { status: null, message: null };
    },
    [fetchCategories.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = { status: null, message: null };
      state.categories = [{ id: 11, title: 'Все' }, ...action.payload];
      state.activeCategoryId = 11;
    },
    [fetchCategories.rejected]: (state, action) => {
      state.loading = false;
      state.error = { status: true, message: action.payload };
    },
  },
});

export const selectCategories = (state) => state.categories.categories;
export const selectActiveCategory = (state) =>
  state.categories.activeCategoryId;
export const selectLoading = (state) => state.categories.loading;
export const selectError = (state) => state.categories.error;

export const { chooseActiveCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
