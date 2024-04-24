import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {API} from '../../utils/apiUtils';

export const fetchCartProducs = createAsyncThunk('fetchCartProducts', async () => {
  try {
    const response = await axios.get(API + 'get-add-cart-all');
    return response.data;
  } catch (error) {
    throw error;
  }
});

const CartItemSlice = createSlice({
  name: 'cartItems',
  initialState: {
    data: [],
    isLoader: false,
    isError: false,
  },
  extraReducers: builder => {
    builder.addCase(fetchCartProducs.pending, (state, action) => {
      state.isLoader = true;
    });
    builder.addCase(fetchCartProducs.fulfilled, (state, action) => {
      state.isLoader = false;
      state.data = action.payload;
    });
    builder.addCase(fetchCartProducs.rejected, (state, action) => {
      state.isLoader = false;
      state.isError = true;
    });
  },
});

export default CartItemSlice.reducer;