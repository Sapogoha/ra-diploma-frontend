import { configureStore, combineReducers } from '@reduxjs/toolkit';

import topSalesSlice from '../slices/topSalesSlice';
import categoriesSlice from '../slices/categoriesSlice';
import catalogSlice from '../slices/catalogSlice';
import searchSlice from '../slices/searchSlice';
import productItemSlice from '../slices/productItemSlice';
import cartSlice from '../slices/cartSlice';

const reducer = combineReducers({
  topSales: topSalesSlice,
  categories: categoriesSlice,
  catalog: catalogSlice,
  search: searchSlice,
  product: productItemSlice,
  cart: cartSlice,
});

export const store = configureStore({
  reducer,
});
