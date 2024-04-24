import { configureStore } from "@reduxjs/toolkit";
import CartReducer from '../Redux/slices/cartItemSlice'
import ProductReducer from '../Redux/slices/subCategorySlice'



export const store = configureStore({
    reducer:{
        cartItem:CartReducer,
        products:ProductReducer
    }
})