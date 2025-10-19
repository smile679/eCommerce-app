import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  isLoading : false,
  approvalURL : null,
  orderId : null,
  orderList : [],
  orderDetails : null,
}

export const createNewOrder = createAsyncThunk('/orders/createNewOrder',
  async(orderData)=>{
    const response = await axios.post("http://localhost:5000/api/shop/order/create",
        orderData,
    )

    return response?.data
  }
)

export const capturePayment = createAsyncThunk('/orders/capturePayment',
  async({ paymentId, payerId, orderId })=>{
    const response = await axios.post("http://localhost:5000/api/shop/order/capture",
        {
          paymentId,
          payerId,
          orderId
        },
    )

    return response?.data
  }
)

export const getAllOrdersByUserId = createAsyncThunk('/orders/getAllOrdersByUserId',
  async(userId)=>{
    const response = await axios.get(`http://localhost:5000/api/shop/order/list/${userId}`)

    return response?.data
  }
)

export const getOrderDetails = createAsyncThunk('/orders/getOrderDetails',
  async(id)=>{
    const response = await axios.get(`http://localhost:5000/api/shop/order/details/${id}`)

    return response?.data
  }
)

const shoppingOrderSlice = createSlice({
  name : 'order',
  initialState,
  reducers : {},
  extraReducers : (builder)=>{
    builder.addCase(createNewOrder.pending,(state)=>{
      state.isLoading = true
    }).addCase(createNewOrder.fulfilled,(state, action)=>{
      state.isLoading = false,
      state.approvalURL = action.payload?.approvalURL 
      state.orderId = action.payload?.orderId
      sessionStorage.setItem('currentOrderId', JSON.stringify(action?.payload?.orderId))
    }).addCase(createNewOrder.rejected,(state)=>{
      state.isLoading = false
      state.approvalURL = null
      state.orderId = null
    }).addCase(getAllOrdersByUserId.pending,(state)=>{
      state.isLoading = true
    }).addCase(getAllOrdersByUserId.fulfilled,(state, action)=>{
      state.isLoading = false,
      state.orderList = action.payload?.data
    }).addCase(getAllOrdersByUserId.rejected,(state)=>{
      state.isLoading = false
      state.orderList = [];
    }).addCase(getOrderDetails.pending,(state)=>{
      state.isLoading = true
    }).addCase(getOrderDetails.fulfilled,(state, action)=>{
      state.isLoading = false,
      state.orderDetails = action.payload?.data
    }).addCase(getOrderDetails.rejected,(state)=>{
      state.isLoading = false
      state.orderDetails = null;
    })
  }
})


export default shoppingOrderSlice.reducer;