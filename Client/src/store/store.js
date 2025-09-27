import authReducer from './authSlice'
import { configureStore } from '@reduxjs/toolkit';
import AdminProductSlice from './admin/products-slice/index'
import shoppingProductSlice from './shop/products-slice/index'

const store = configureStore({
  reducer : {
    auth : authReducer,
    adminProducts : AdminProductSlice,
    shopProducts : shoppingProductSlice,
  }, 
})

export default store;