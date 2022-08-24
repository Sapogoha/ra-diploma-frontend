import { configureStore, combineReducers } from '@reduxjs/toolkit';

import topSalesSlice from '../slices/topSalesSlice';
import categoriesSlice from '../slices/categoriesSlice';
import catalogSlice from '../slices/catalogSlice';
import searchSlice from '../slices/searchSlice';

const reducer = combineReducers({
  topSales: topSalesSlice,
  categories: categoriesSlice,
  catalog: catalogSlice,
  search: searchSlice,
});

export const store = configureStore({
  reducer,
});
