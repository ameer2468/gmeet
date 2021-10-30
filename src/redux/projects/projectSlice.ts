import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import type {RootState} from "../store";
import {project} from "./types";

import axios from "axios";


export const data = createAsyncThunk('project/data', async () => {
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
    error: boolean;
    projectForm: {
        name: string;
        description: string;
    }
}

// Define the initial state using that type
const initialState: ProjectState = {
    projects: [],
    loading: false,
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
        addProject: (state: any, action: PayloadAction<project>) => {
           state.projects.push(action.payload)
        },
        projectLoading: (state, action: PayloadAction<boolean>) => {
          state.loading = action.payload;
        },
        projectValues: (state, action: PayloadAction<any>) => {
            state.projectForm = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(data.fulfilled, (state: any, action) => {
            state.projects = action.payload;
            state.loading = false;
            state.error = false;
        })
        builder.addCase(data.pending, (state, action) => {
            state.loading = true;
            state.error = false;
        })
        builder.addCase(data.rejected, (state, action) => {
            state.error = true;
            state.loading = false;
        })
    }
})

export const { addProject, projectValues, projectLoading } = projectSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const projectReducer = (state: RootState) => state.projectStore;

export default projectSlice.reducer