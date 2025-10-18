import authReducer from './authSlice'
import { configureStore } from '@reduxjs/toolkit';
import AdminProductSlice from './admin/products-slice/index'
import shoppingProductSlice from './shop/products-slice/index'
import shoppingCartSlice from './shop/cart-slice/index'
import shopAddressSlice from './shop/address-slice/index'
import shopOrderSlice from './shop/order-slice/index'

const store = configureStore({
  reducer : {
    auth : authReducer,
    adminProducts : AdminProductSlice,
    shopProducts : shoppingProductSlice,
    shopCart : shoppingCartSlice,
    shopAddress : shopAddressSlice,
    shopOrder : shopOrderSlice,
  },
})

export default store;