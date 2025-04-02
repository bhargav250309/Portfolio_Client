import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../../utils/apiService";

const initialState = {
    user: null,
    isLoading: false,
    error: null,
}

export const getUserInfo = createAsyncThunk('admin/getUserInfo',
    async (_, { rejectWithValue }) => {
        try {

            const userResponse = await fetch(`${config.baseUrl}/admin/get-userinfo`,{
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                },
            });

            const result = await userResponse.json();
            // console.log(result)

            if (result.success) {
                return result.data;
            } else {
                return rejectWithValue(result.message);
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)


export const updateUserInfo = createAsyncThunk('admin/updateUserInfo',
    async ({ formData, userId }, { rejectWithValue }) => {
        
        try {
            const response = await fetch(`${config.baseUrl}/admin/update-userinfo/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            console.log('Result:', result);

            if (result.success) {
                return result;
            } else {
                return rejectWithValue(result.message);
            }
        } catch (error) {
            console.log('Error:', error);
            return rejectWithValue(error.message);
        }
    }
);



const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateUserInfo.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateUserInfo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(updateUserInfo.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(getUserInfo.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(getUserInfo.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
})

export default userInfoSlice.reducer;