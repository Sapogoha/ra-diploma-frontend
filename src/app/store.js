import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import { categoriesSlice } from '../slices/сategoriesSlice';
import topSalesSlice from '../slices/topSalesSlice';

const reducer = combineReducers({
  topSales: topSalesSlice,
});

export const store = configureStore({
  reducer,
});
