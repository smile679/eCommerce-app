const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");

const initialState = {
  isLoading : false,
  orderList : [],
  orderDetails : null,
}

const getAllOrdersOfUsers = createAsyncThunk('orders/getAllOrdersOfUsers',
  async()=>{
    const response =await axios('http://localhost:5000/api/admin/orders/get')

    return response?.data
  }
)

const getOrderDetails = createAsyncThunk('orders/getAllOrdersOfUsers',
  async(id)=>{
    const response =await axios(`http://localhost:5000/api/admin/orders/details/${id}`)

    return response?.data
  }
)

const AdminOrderSlice = createSlice({
  name : "adminOrder",
  initialState,
  reducers : {},
  extraReducers : (builder)=>{
    builder.addCase(getAllOrdersOfUsers.pending,(state)=>{
      state.isLoading = true
    }).addCase(getAllOrdersOfUsers.fulfilled,(state, action)=>{
      state.isLoading = false
      state.orderList = action.payload?.data
    }).addCase(getAllOrdersOfUsers.rejected,(state)=>{
      state.isLoading = false
      state.orderList = []
    })
  }
})