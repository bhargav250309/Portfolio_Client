import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../../utils/apiService";

const initialState = {
  aboutUser: null,
  isLoading: false,
  error: null,
};

export const getAboutUser = createAsyncThunk("admin/getAboutUser", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${config.baseUrl}/admin/get-aboutUser`,{
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
      },
  });
    const result = await response.json();
    if (result.success) {
      return result.data;
    } else {
      return rejectWithValue(result.message);
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});


const aboutUserSlice = createSlice({
  name: "aboutUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get about user actions
      .addCase(getAboutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAboutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.aboutUser = action.payload;
        state.error = null;
      })
      .addCase(getAboutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
    
  },
});

export default aboutUserSlice.reducer;
