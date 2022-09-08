import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTopSales = createAsyncThunk(
  'topSales/fetchPosts',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(process.env.REACT_APP_SHOP_TOP_SALES);
      if (!response.ok) {
        throw new Error('Что-то пошло не так. Категории не загрузились');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue('Что-то пошло не так. Обновите страницу');
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(process.env.REACT_APP_SHOP_CATEGORIES);
      if (!response.ok) {
        throw new Error('Что-то пошло не так. Категории не загрузились');
      }
      const data = await response.json();
      return data;
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
        response = await fetch(
          `${process.env.REACT_APP_SHOP_CATALOG}${query ? `?q=${query}` : ''}`
        );
      } else {
        response = await fetch(
          `${process.env.REACT_APP_SHOP_CATALOG_CATEGORY}=${id}${
            query ? `&q=${query}` : ''
          }`
        );
      }
      if (!response.ok) {
        throw new Error('Что-то пошло не так. Каталог не загрузился');
      }

      const data = await response.json();
      return data;
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
        response = await fetch(
          `${process.env.REACT_APP_SHOP_CATALOG}${
            query ? `?q=${query}&offset=${offset}` : `?offset=${offset}`
          }`
        );
      } else {
        response = await fetch(
          `${process.env.REACT_APP_SHOP_CATALOG}${
            query
              ? `?q=${query}&categoryId=${id}&offset=${offset}`
              : `?categoryId=${id}&offset=${offset}`
          }`
        );
      }

      if (!response.ok) {
        throw new Error('Что-то пошло не так. Товары не загрузились');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue('Произошла ошибка загрузки');
    }
  }
);

export const refreshPrice = createAsyncThunk(
  'catalog/refreshPrice',
  async ({ id, oldPrice, size }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SHOP_CATALOG}/${id}`
      );

      if (!response.ok) {
        throw new Error('Что-то пошло не так. Мы не знаем, изменилась ли цена');
      }

      const data = await response.json();

      return oldPrice === data.price
        ? 'same price'
        : {
            id: data.id,
            title: data.title,
            price: data.price,
            size,
          };
    } catch (error) {
      return rejectWithValue('Данные о товаре не загрузились');
    }
  }
);
