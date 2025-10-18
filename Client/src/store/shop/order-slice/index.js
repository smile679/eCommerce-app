import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  approvalURI : null,
  isLoading : false,
  orderId : null,
}

const createNewOrder = createAsyncThunk('/orders/createNewOrder',
  async(orderData)=>{
    const response = await axios.post("http://localhost:5000/api/shop/order/create",
        orderData,
    )

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
      state.approvalURI = action.payload?.approvalURL
      state.orderId = action.payload?.orderId
    }).addCase(createNewOrder.rejected,(state)=>{
      state.isLoading = false
      state.approvalURI = null
      state.orderId = null
    })
  }
})

export default shoppingOrderSlice;