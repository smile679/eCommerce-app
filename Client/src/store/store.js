import authReducer from './authSlice'
import { configureStore } from '@reduxjs/toolkit';
import AdminProductSlice from './admin/products-slice/index'
import shoppingProductSlice from './shop/products-slice/index'
import shoppingCartSlice from './shop/cart-slice/index'

const store = configureStore({
  reducer : {
    auth : authReducer,
    adminProducts : AdminProductSlice,
    shopProducts : shoppingProductSlice,
    shopCart : shoppingCartSlice,
  }, 
})

export default store;