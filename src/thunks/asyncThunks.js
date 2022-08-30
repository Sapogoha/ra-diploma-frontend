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
  async ({ id, query = null }, { rejectWithValue }) => {
    try {
      let response;
      if (id === 11) {
        response = await axios.get(
          `${process.env.REACT_APP_SHOP_CATALOG}${query ? `?q=${query}` : ''}`
        );
      } else {
        response = await axios.get(
          `${process.env.REACT_APP_SHOP_CATALOG_CATEGORY}=${id}${
            query ? `&q=${query}` : ''
          }`
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
  async ({ id, offset, query = null }, { rejectWithValue }) => {
    try {
      let response;
      if (id === 11) {
        response = await axios.get(
          `${process.env.REACT_APP_SHOP_CATALOG}${
            query ? `?q=${query}&offset=${offset}` : `?offset=${offset}`
          }`
        );
      } else {
        response = await axios.get(
          `${process.env.REACT_APP_SHOP_CATALOG}${
            query
              ? `?q=${query}&categoryId=${id}&offset=${offset}`
              : `?categoryId=${id}&offset=${offset}`
          }`
        );
      }
      return response.data;
    } catch (error) {
      return rejectWithValue('Произошла ошибка загрузки');
    }
  }
);

export const fetchProductItem = createAsyncThunk(
  'catalog/fetchProductItem',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SHOP_CATALOG}/${id}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue('Данные о товаре не загрузились');
    }
  }
);
