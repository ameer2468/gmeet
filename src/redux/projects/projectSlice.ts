import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import type {RootState} from "../store";
import {project} from "./types";


const data = createAsyncThunk('get projects', () => {

})



// Define a type for the slice state
interface ProjectState {
    projects: []
    projectForm: {
        name: string;
        description: string;
        members: string;
    }
}

// Define the initial state using that type
const initialState: ProjectState = {
    projects: [],
    projectForm: {
        name: '',
        description: '',
        members: ''
    }
}

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        addProject: (state: any, action: PayloadAction<project>) => {
           state.projects.push(action.payload)
        },
        projectValues: (state, action: PayloadAction<any>) => {
            state.projectForm = action.payload;
        }
    },
})

export const { addProject, projectValues } = projectSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const projectReducer = (state: RootState) => state.projectStore;

export default projectSlice.reducer