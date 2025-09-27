import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"


const initialState ={
  isLoading : false,
  productList : [],
}

export const fetchAllFilteredProducts = createAsyncThunk('/shop/fetchProducts',
  async()=>{
    const result = await axios.get(`http://localhost:5000/api/shop/products/get`)
    return result?.data
  }
)

const shoppingProductSlice = createSlice({
  name : "shoppingProducts",
  initialState,
  reducer : {}, 
  extraReducers : (builder)=>{
    builder.addCase(fetchAllFilteredProducts.pending, (state)=>{
      state.isLoading = true
    }).addCase(fetchAllFilteredProducts.fulfilled, (state, action)=>{
      state.isLoading = false;
      state.productList = action?.payload?.success ? action?.payload?.data : null
    }).addCase(fetchAllFilteredProducts.rejected, (state)=>{
      state.isLoading = false,
      state.productList = []
    })
  }
})

export default shoppingProductSlice.reducer