import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {API} from '../../utils/apiUtils';

export const fetchProducts = createAsyncThunk('fetchProducts', async () => {
  try {
    const response = await axios.get(API + 'get-all-wine-subcategories');
    return response.data;
  } catch (error) {
    throw error;
  }
});

const ProductSlice = createSlice({
  name: 'products',
  initialState: {
    data: [],
    isLoader: false,
    isError: false,
  },
  extraReducers: builder => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.isLoader = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoader = false;
      state.data = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoader = false;
      state.isError = true;
    });
  },
});

export default ProductSlice.reducer;