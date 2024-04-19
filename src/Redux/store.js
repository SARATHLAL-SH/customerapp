import { configureStore } from "@reduxjs/toolkit";
import {userReducer} from '../Redux/slices/userDataSlice'

console.log("userReducer:", userReducer);

export const store = configureStore({
    reducer:{
        user:userReducer
    }
})