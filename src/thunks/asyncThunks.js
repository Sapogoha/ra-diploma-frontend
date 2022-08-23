import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTopSales = createAsyncThunk(
  'posts/fetchPosts',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.get(process.env.REACT_APP_SHOP_TOP_SALES);
      return response.data;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue('Что-то пошло не так. Обновите страницу');
    }
  }
);

// export const fetchCategories = createAsyncThunk(
//   'posts/fetchCategories',
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(process.env.REACT_APP_SHOP_CATEGORIES);
//       return response.data;
//     } catch (error) {
//       console.log(error.response);
//       return rejectWithValue('Каталог не загрузился');
//     }
//   }
// );
