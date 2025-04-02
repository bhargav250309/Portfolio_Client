import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../../utils/apiService";

const initialState = {
    projects: null,
    projectsRecord: [],
    isLoading: false,
    error: null,
};

export const createProject = createAsyncThunk('admin/projectCreate',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await fetch(`${config.baseUrl}/admin/create-project`, {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();

            if (result.success) {
                return result;
            } else {
                return rejectWithValue(result.message);
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const getProject = createAsyncThunk('admin/getProject',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${config.baseUrl}/admin/get-project`,{
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                },
            });
            const result = await response.json();
            if (result.success) {
                return result.data; // Assuming result.data holds the projects data
            } else {
                return rejectWithValue(result.message);
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const getProjectById = createAsyncThunk('admin/getprojectbyid',
    async (projectId, { rejectWithValue }) => {
        try {
            const response = await fetch(`${config.baseUrl}/admin/get-projectbyid/${projectId}`,{
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                },
            });
            const result = await response.json();
            if (result.success) {
                return result.data; // Assuming result.data holds the project data
            } else {
                return rejectWithValue(result.message);
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)


export const updateProject = createAsyncThunk('admin/updateproject',
    async ({ projectId, formData }, { rejectWithValue }) => { // Change to receive both `id` and `formData`
        try {
            const response = await fetch(`${config.baseUrl}/admin/update-project/${projectId}`, { // Pass the `id` here
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
            return rejectWithValue(error.message);
        }
    }
);


export const deleteProject = createAsyncThunk('admin/deleteproject',
    async (projectId, { rejectWithValue }) => {
        try {
            const response = await fetch(`${config.baseUrl}/admin/delete-project/${projectId}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            const result = await response.json();
            if (result.success) {
                return result;
            } else {
                return rejectWithValue(result);
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }

)


const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //////////// Create project
            .addCase(createProject.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.isLoading = false;
                state.projects = action.payload; // Handle success of creating project
            })
            .addCase(createProject.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload; // Handle error of creating project
            })

            //////////// Get all projects
            .addCase(getProject.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getProject.fulfilled, (state, action) => {
                state.isLoading = false;
                state.projectsRecord = action.payload;
            })
            .addCase(getProject.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload; // Handle error of fetching projects
            })

            //////////// Get projects by id 
            .addCase(getProjectById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getProjectById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.projectsRecord = state.projectsRecord;
            })
            .addCase(getProjectById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload; // Handle error of fetching project by id
            })

            //////////// update projects
            .addCase(updateProject.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateProject.fulfilled, (state, action) => {
                state.isLoading = false;
                state.projectsRecord = action.payload; // Handle success of updating project
            })
            .addCase(updateProject.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload; // Handle error of updating project
            })

            //////////// delete projects
            .addCase(deleteProject.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteProject.fulfilled, (state, action) => {
                state.isLoading = false;
                // Assuming the projectId is passed as an argument to deleteProject action
                const deletedProjectId = action.meta.arg;  // This gets the projectId passed to the delete action
                state.projectsRecord = state.projectsRecord.filter(
                    (project) => project._id !== deletedProjectId
                );
            })
            
            .addCase(deleteProject.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload; // Handle error of deleting project
            })
    }
});


export default projectSlice.reducer;
