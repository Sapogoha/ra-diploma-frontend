import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: '',
};

export const searchSlice = createSlice({
  name: 'searchSlice',
  initialState,
  reducers: {
    changeSearch(state, action) {
      state.search = action.payload;
    },
  },
  extraReducers: {},
});

export const { changeSearch } = searchSlice.actions;

export const selectSearch = (state) => state.search.search;

export default searchSlice.reducer;
