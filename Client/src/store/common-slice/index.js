import { createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
  isLoading : false,
  featureImagesList : [],
}


export const addFeatureImage = createAsyncThunk('/feature/addFeatureImage',
  async(image)=>{
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/common/feature/add`,
      { image },
    )

    return response?.data
  }
)

export const getFeatureImages = createAsyncThunk('/feature/getFeatureImages',
  async()=>{
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/common/feature/get`)

    return response?.data
  }
)

const commonSlice = createSlice({
  name : 'feature',
  initialState,
  reducers: {},
  extraReducers : (builder)=>{
    builder.addCase(addFeatureImage.pending, (state)=>{
      state.isLoading = true
    }).addCase(addFeatureImage.fulfilled, (state, action)=>{
      state.isLoading = false;
      state.featureImagesList = action?.payload?.data
    }).addCase(addFeatureImage.rejected, (state)=>{
      state.isLoading = false,
      state.featureImagesList = []
    })
    .addCase(getFeatureImages.pending, (state)=>{
      state.isLoading = true
    }).addCase(getFeatureImages.fulfilled, (state, action)=>{
      state.isLoading = false;
      state.featureImagesList = action?.payload?.data
    }).addCase(getFeatureImages.rejected, (state)=>{
      state.isLoading = false,
      state.featureImagesList = []
    })
  }
})


export default commonSlice.reducer;