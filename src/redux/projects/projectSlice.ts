import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import type {RootState} from "../store";
import {project} from "./types";

import axios from "axios";


export const getProjects = createAsyncThunk('project/data', async () => {
    const response = axios.get(`${process.env.REACT_APP_API_URL}/projects`, {
        headers: {
            'x-api-key': process.env.REACT_APP_API_KEY,
            'Content-Type': 'application/json'
        }
    })
        .then((res) => {
            return res.data.rows;
        });
    return response;
})



// Define a type for the slice state
interface ProjectState {
    projects: project[],
    loading: boolean;
    createLoading: boolean;
    error: boolean;
    selectedProject: project;
    deleteLoading: boolean;
    projectForm: {
        name: string;
        description: string;
    }
}

// Define the initial state using that type
const initialState: ProjectState = {
    projects: [],
    loading: false,
    createLoading: false,
    deleteLoading: false,
    selectedProject: {
        id: '',
        name: '',
        owner: '',
        description: ''
    },
    error: false,
    projectForm: {
        name: '',
        description: '',
    }
}

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        projectValues: (state, action: PayloadAction<any>) => {
            state.projectForm = action.payload;
        },
        selectedProject: (state, action: PayloadAction<project>) => {
            state.selectedProject = action.payload;
        },
        addProject: (state, action: PayloadAction<project>) => {
            state.projects.push(action.payload)
        },
        removeProject: (state, action: PayloadAction<string>) => {
            state.projects.filter((value) => value.id !== action.payload)
        },
        projectLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        deleteLoading: (state, action: PayloadAction<boolean>) => {
            state.deleteLoading = action.payload;
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
    selectedProject,
    projectLoading,
    deleteLoading,
    createProjectLoading,
}
    = projectSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const projectReducer = (state: RootState) => state.projectStore;

export default projectSlice.reducer