import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchTop: '',
  search: '',
};

export const searchSlice = createSlice({
  name: 'searchSlice',
  initialState,
  reducers: {
    changeSearchTop(state, action) {
      state.searchTop = action.payload;
    },
    resetSearchTop(state) {
      state.search = state.searchTop;
      state.searchTop = '';
    },
    changeSearch(state, action) {
      state.search = action.payload;
    },
    resetSearch(state) {
      state.search = '';
    },
  },
  extraReducers: {},
});

export const { changeSearchTop, resetSearchTop, changeSearch, resetSearch } =
  searchSlice.actions;

export const selectSearchTop = (state) => state.search.searchTop;
export const selectSearch = (state) => state.search.search;

export default searchSlice.reducer;
