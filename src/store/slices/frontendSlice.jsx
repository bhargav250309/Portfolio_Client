import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import config from "../../utils/apiService"


const initialState = {
    data : [],
    isLoading : false,
    error : null
}

export const getFrontendData = createAsyncThunk('user',
    async (_, { rejectWithValue }) => {
       try {
        const response = await fetch(`${config.baseUrl}/user/getinfo`);
        const result = await response.json();
        if (result.success) {
            return result.data;
        } else {
            return rejectWithValue(result.message);
        }
       } catch (error) {
         rejectWithValue(error.message)
       }
    }
)

const projectSlice = createSlice({
    name: 'frontendData',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(getFrontendData.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(getFrontendData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        .addCase(getFrontendData.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
    }
  
})

export default projectSlice.reducer;