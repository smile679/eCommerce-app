import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  isLoading : false,
  orderList : [],
  orderDetails : null,
}

export const getAllOrdersForAdmin = createAsyncThunk('orders/getAllOrdersForAdmin', 
  async()=>{
    const response =await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/orders/get`)

    return response?.data
  }
)

export const getOrderDetailsForAdmin = createAsyncThunk('orders/getAllOrdersOfUsers',
  async(id)=>{
    const response =await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/orders/details/${id}`)

    return response?.data
  }
)

export const updateOrderStatus = createAsyncThunk('orders/updateOrderStatus',
  async({id , orderStatus})=>{
    const response =await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/orders/update/${id}`,
      { orderStatus },
    )

    return response?.data
  }
)

const AdminOrderSlice = createSlice({
  name : "adminOrderSlice",
  initialState,
  reducers : {
    resetAdminOrderDetails : (state)=>{
      state.orderDetails = null
    }
  },
  extraReducers : (builder)=>{
    builder.addCase(getAllOrdersForAdmin.pending,(state)=>{
      state.isLoading = true
    }).addCase(getAllOrdersForAdmin.fulfilled,(state, action)=>{
      state.isLoading = false
      state.orderList = action.payload?.data
    }).addCase(getAllOrdersForAdmin.rejected,(state)=>{
      state.isLoading = false
      state.orderList = []
    }).addCase(getOrderDetailsForAdmin.pending,(state)=>{
      state.isLoading = true
    }).addCase(getOrderDetailsForAdmin.fulfilled,(state, action)=>{
      state.isLoading = false
      state.orderDetails = action.payload?.data
    }).addCase(getOrderDetailsForAdmin.rejected,(state)=>{
      state.isLoading = false
      state.orderDetails =null
    })
  }
})


export const { resetAdminOrderDetails } =  AdminOrderSlice.actions
export default AdminOrderSlice.reducer