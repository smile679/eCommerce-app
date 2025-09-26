import authReducer from './authSlice'
import { configureStore } from '@reduxjs/toolkit';
import AdminProductSlice from './admin/products-slice/index'

const store = configureStore({
  reducer : {
    auth : authReducer,
    adminProducts : AdminProductSlice,
  },
})

export default store;