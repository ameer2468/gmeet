import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type {RootState} from "../store";
import {project, projectRequest} from "./types";
import {getProjects} from "./services";


// Define a type for the slice state
interface ProjectState {
    projects: project[],
    userProjects: project[],
    projectRequests: projectRequest[]
    loading: boolean;
    createLoading: boolean;
    requestsLoading: boolean;
    editProjectLoading: boolean;
    error: boolean;
    selectedProject: project;
    deleteLoading: boolean;
    joinLoading: boolean;
    projectDetails: any;
    projectDetailsLoading: boolean;
    projectForm: {
        name: string;
        description: string;
        searchterm: string;
        role: string;
        why: string;
    }
}

// Define the initial state using that type
const initialState: ProjectState = {
    projects: [],
    userProjects: [],
    projectRequests: [],
    projectDetails: {},
    loading: false,
    createLoading: false,
    projectDetailsLoading: false,
    requestsLoading: false,
    joinLoading: false,
    editProjectLoading: false,
    deleteLoading: false,
    selectedProject: {
        project_id: '',
        name: '',
        role: '',
        owner: '',
        description: '',
    },
    error: false,
    projectForm: {
        name: '',
        description: '',
        searchterm: '',
        role: '',
        why: ''
    }
}

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        projectValues: (state, action: PayloadAction<any>) => {
            state.projectForm = action.payload;
        },
        projectArr: (state, action: PayloadAction<any[]>) => {
          state.projects = action.payload;
        },
        projectRequests: (state, action: PayloadAction<projectRequest[]>) => {
            state.projectRequests = action.payload;
        },
        userProjects: (state, action: PayloadAction<project[]>) => {
          state.userProjects = action.payload;
        },
        selectedProject: (state, action: PayloadAction<project>) => {
            state.selectedProject = action.payload;
        },
        projectDetails: (state, action: PayloadAction<any>) => {
            state.projectDetails = action.payload;
        },
        projectDetailsLoading: (state, action: PayloadAction<boolean>) => {
            state.projectDetailsLoading = action.payload;
        },
        addProject: (state, action: PayloadAction<project>) => {
            state.projects = [action.payload, ...state.projects]
        },
        removeProject: (state, action: PayloadAction<string>) => {
            state.userProjects = state.userProjects.filter((value) => value.project_id !== action.payload)
        },
        projectLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        editProjectLoading: (state, action: PayloadAction<boolean>) => {
            state.editProjectLoading = action.payload;
        },
        requestsLoading: (state, action: PayloadAction<boolean>) => {
            state.requestsLoading = action.payload;
        },
        deleteLoading: (state, action: PayloadAction<boolean>) => {
            state.deleteLoading = action.payload;
        },
        joinLoading: (state, action: PayloadAction<boolean>) => {
            state.joinLoading = action.payload;
        },
        createProjectLoading: (state, action: PayloadAction<boolean>) => {
            state.createLoading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getProjects.fulfilled, (state, action) => {
            state.projects = action.payload;
            state.loading = false;
            state.error = false;
        })
        builder.addCase(getProjects.pending, (state, action) => {
            state.loading = true;
            state.error = false;
        })
        builder.addCase(getProjects.rejected, (state, action) => {
            state.error = true;
            state.loading = false;
        })
    }
})

export const {
    addProject,
    projectValues,
    removeProject,
    projectRequests,
    projectDetails,
    projectDetailsLoading,
    editProjectLoading,
    userProjects,
    projectArr,
    selectedProject,
    projectLoading,
    requestsLoading,
    deleteLoading,
    joinLoading,
    createProjectLoading,
}
    = projectSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const projectReducer = (state: RootState) => state.projectStore;

export default projectSlice.reducer