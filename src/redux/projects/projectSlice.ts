import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type {RootState} from "../store";
import {project, projectDetails as details, projectRequest, topProjects} from "./types";


// Define a type for the slice state
interface ProjectState {
    projects: project[],
    userProjects: project[],
    projectRequests: projectRequest[]
    topProjects: topProjects[]
    loading: boolean;
    createLoading: boolean;
    requestsLoading: boolean;
    editProjectLoading: boolean;
    error: boolean;
    selectedProject: project;
    deleteLoading: boolean;
    joinLoading: boolean;
    projectDetails: details,
    topProjectsLoading: boolean;
    projectDetailsLoading: boolean;
    projectForm: {
        name: string;
        imageSrc: any;
        gituser: string;
        imageFile: any,
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
    topProjects: [],
    projectDetails: {
        project_id: '',
        userImage: '',
        image: '',
        name: '',
        role: '',
        owner: '',
        description: '',
    },
    loading: false,
    topProjectsLoading: false,
    createLoading: false,
    projectDetailsLoading: false,
    requestsLoading: false,
    joinLoading: false,
    editProjectLoading: false,
    deleteLoading: false,
    selectedProject: {
        project_id: '',
        image: '',
        name: '',
        role: '',
        owner: '',
        description: '',
    },
    error: false,
    projectForm: {
        imageFile: {},
        imageSrc: '',
        name: '',
        description: '',
        searchterm: '',
        gituser: '',
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
        topProjectsLoading: (state, action: PayloadAction<boolean>) => {
          state.topProjectsLoading = action.payload;
        },
        projectDetailsLoading: (state, action: PayloadAction<boolean>) => {
            state.projectDetailsLoading = action.payload;
        },
        topProjectsHandler: (state, action: PayloadAction<topProjects[]>) => {
            state.topProjects = action.payload;
        },
        addProject: (state, action: PayloadAction<project>) => {
            state.projects = [action.payload, ...state.projects]
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
    // extraReducers: (builder) => {
    //     builder.addCase(getProjects.fulfilled, (state, action) => {
    //         state.projects = action.payload;
    //         state.loading = false;
    //         state.error = false;
    //     })
    //     builder.addCase(getProjects.pending, (state, action) => {
    //         state.loading = true;
    //         state.error = false;
    //     })
    //     builder.addCase(getProjects.rejected, (state, action) => {
    //         state.error = true;
    //         state.loading = false;
    //     })
    // }
})

export const {
    addProject,
    projectValues,
    projectRequests,
    topProjectsHandler,
    projectDetails,
    projectDetailsLoading,
    editProjectLoading,
    userProjects,
    projectArr,
    selectedProject,
    projectLoading,
    requestsLoading,
    topProjectsLoading,
    deleteLoading,
    joinLoading,
    createProjectLoading,
}
    = projectSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const projectReducer = (state: RootState) => state.projectStore;

export default projectSlice.reducer
