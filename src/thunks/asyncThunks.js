import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTopSales = createAsyncThunk(
  'topSales/fetchPosts',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.get(process.env.REACT_APP_SHOP_TOP_SALES);
      return response.data;
    } catch (error) {
      return rejectWithValue('Что-то пошло не так. Обновите страницу');
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.get(process.env.REACT_APP_SHOP_CATEGORIES);
      return response.data;
    } catch (error) {
      return rejectWithValue('Категории не загрузились');
    }
  }
);

export const fetchCatalog = createAsyncThunk(
  'catalog/fetchCatalog',
  async (id, { rejectWithValue }) => {
    try {
      let response;
      if (id === 11) {
        response = await axios.get(process.env.REACT_APP_SHOP_CATALOG);
      } else {
        response = await axios.get(
          `${process.env.REACT_APP_SHOP_CATALOG_CATEGORY}=${id}`
        );
      }
      return response.data;
    } catch (error) {
      return rejectWithValue('Каталог не загрузился');
    }
  }
);

export const fetchMoreItems = createAsyncThunk(
  'catalog/fetchMoreItems',
  async ({ id, offset }, { rejectWithValue }) => {
    try {
      let response;
      if (id === 11) {
        response = await axios.get(
          `${process.env.REACT_APP_SHOP_CATALOG}?offset=${offset}`
        );
      } else {
        response = await axios.get(
          `${process.env.REACT_APP_SHOP_CATALOG_CATEGORY}=${id}?offset=${offset}`
        );
      }
      return response.data;
    } catch (error) {
      return rejectWithValue('Товары закончились или произошла ошибка>');
    }
  }
);
