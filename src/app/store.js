import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import { categoriesSlice } from '../slices/сategoriesSlice';
import topSalesSlice from '../slices/topSalesSlice';
import categoriesSlice from '../slices/categoriesSlice';
import catalogSlice from '../slices/catalogSlice';

const reducer = combineReducers({
  topSales: topSalesSlice,
  categories: categoriesSlice,
  catalog: catalogSlice,
});

export const store = configureStore({
  reducer,
});
