import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
      userData: null,
    },
    reducers: {
      setUser: (state, action) => {
        console.log("dis"+action.payload);
        state.userData = action.payload;
      },
    },
  });

  export const userReducer = userSlice.reducer; 
  export const { setUser } = userSlice.actions;
  
  