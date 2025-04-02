import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import config from "../../utils/apiService";


const initialState = {
    user: null,
    error: null,
    token: null,
    isLoading: false,
}


export const registerUser = createAsyncThunk('auth/register',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await fetch(`${config.baseUrl}/auth/register`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                }
            );

            const result = await response.json();

            if (result.success) {
                return result;
            } else {
                return rejectWithValue(result.message)
            }
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const loginUser = createAsyncThunk('auth/login',
    async(formData, { rejectWithValue }) => {
        try {
            
            const response = await fetch(`${config.baseUrl}/auth/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                }
            );

            const result = await response.json();

            if (result.success) {
                sessionStorage.setItem('token', result.token);
                return result;
            } else {
                return rejectWithValue(result.message)
            }
                
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logOut: (state) => {
            sessionStorage.removeItem('token');
            state.user = null;
            state.token = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Register user thunks
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                // state.user = action.payload.user;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Login user thunks
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
})

export const { logOut } = authSlice.actions;

export default authSlice.reducer;