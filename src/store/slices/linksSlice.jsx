import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import config from "../../utils/apiService";


const initialState = {
    links: null,
    isLoading: false,
    error: null,
}


export const getLinks = createAsyncThunk('admin/getLinks',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${config.baseUrl}/admin/get-links`,{
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
    }
);


const linkSlice = createSlice({
    name: 'links',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getLinks.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(getLinks.fulfilled, (state, action) => {
            state.isLoading = false;
            state.links = action.payload;
        })
        .addCase(getLinks.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
    }
})

export default linkSlice.reducer;