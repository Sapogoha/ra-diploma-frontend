import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import topSalesSlice from '../slices/topSalesSlice';
import categoriesSlice from '../slices/categoriesSlice';
import catalogSlice from '../slices/catalogSlice';
import searchSlice from '../slices/searchSlice';
import productItemSlice from '../slices/productItemSlice';
import cartSlice from '../slices/cartSlice';

const persistConfig = {
  key: 'cart',
  storage,
  whitelist: [],
};

const cartPersistConfig = {
  key: 'cart',
  storage,
  whitelist: ['cart'],
  blacklist: ['newPrice', 'error', 'loading'],
};

const reducer = combineReducers({
  topSales: topSalesSlice,
  categories: categoriesSlice,
  catalog: catalogSlice,
  search: searchSlice,
  product: productItemSlice,
  cart: persistReducer(cartPersistConfig, cartSlice),
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
