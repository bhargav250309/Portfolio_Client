import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import config from "../../utils/apiService";


const initialState = {
    getRecords: null,
    isLoading: false,
    error: null,
}

export const contacts = createAsyncThunk('admin/contacts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${config.baseUrl}/admin/get-contact-message`,{
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
)


export const deleteMessage = createAsyncThunk('admin/deleteMessage',
    async (contactId, { rejectWithValue }) => {
        try {
            const response = await fetch(`${config.baseUrl}/admin/delete-contact-message/${contactId}`, {
                method: 'DELETE',
            });
            const result = await response.json();
            if (result.success) {
                return result;
            } else {
                return rejectWithValue(result);
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

const getContacts = createSlice({
    name: 'getContacts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
           .addCase(contacts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(contacts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.getRecords = action.payload;
                state.error = null;
            })
            .addCase(contacts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })


            ///////// delete records
            .addCase(deleteMessage.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteMessage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.getRecords = state.getRecords?.filter(message => message._id!== action.payload._id);
                state.error = null;
            })
            .addCase(deleteMessage.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    },
})

export default getContacts.reducer;