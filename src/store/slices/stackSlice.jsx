import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import config from "../../utils/apiService";


const initialState = {
    stack: null,
    allStacks: [],
    isLoading: false,
    error: null,
}


export const createStack = createAsyncThunk('admin/createStack',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await fetch(`${config.baseUrl}/admin/create-stack`, {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            if (result.success) {
                return result;
            } else {
                return rejectWithValue(result.message);
            }
        }
        catch (error) {
            return rejectWithValue('Error creating stack');
        }
    }
)

export const getallStacks = createAsyncThunk('admin/getstack',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${config.baseUrl}/admin/get-aastack`,{
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
            return rejectWithValue('Error fetching stacks');
        }
    }
)

export const getStacksById = createAsyncThunk('admin/getStacksById',
    async (stackId, { rejectWithValue }) => {
        try {
            const response = await fetch(`${config.baseUrl}/admin/get-stack/${stackId}`,{
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                },
            });
            const result = await response.json();
            if (result.success) {
                // console.log(result.data)
                return result;
            } else {
                return rejectWithValue(result.message);
            }
        } catch (error) {
            return rejectWithValue('Error fetching stack');
        }
    }
)

export const updateStack = createAsyncThunk('admin/deletestack',
    async ({ formData, stackId }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${config.baseUrl}/admin/update-stack/${stackId}`, {
                method: 'PUT',
                body: formData,
            });
            const result = await response.json();
            if (result.success) {
                return result;
            } else {
                return rejectWithValue(result.message);
            }
        } catch (error) {
            return rejectWithValue('Error deleting stack');
        }
    }
)

const stack = createSlice({
    name: 'stack',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            //////////////// create stack
            .addCase(createStack.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createStack.fulfilled, (state, action) => {
                state.isLoading = false;
                state.stack = action.payload;
            })
            .addCase(createStack.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            //////////////// update stack
            .addCase(updateStack.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateStack.fulfilled, (state, action) => {
                state.isLoading = false;
                state.allStacks = action.payload;
            })
            .addCase(updateStack.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            //////////////// get all stack
            .addCase(getallStacks.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getallStacks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.allStacks = action.payload;
            })
            .addCase(getallStacks.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            //////////////// get stack by id
            .addCase(getStacksById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getStacksById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.allStacks = state.allStacks;
            })
            .addCase(getStacksById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    },
})

export default stack.reducer;