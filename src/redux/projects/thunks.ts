import {
    deleteProject,
    editProjects,
    getProjects,
    getRequests,
    getUserProjects,
    joinProjectRequest
} from "./services";
import {
    deleteLoading,
    joinLoading, projectDetails, projectDetailsLoading, projectLoading,
    projectRequests,
    removeProject,
    requestsLoading,
    userProjects
} from "./projectSlice";
import {Action, ThunkDispatch} from "@reduxjs/toolkit";
import {ActiveModal} from "../modals/modalSlice";
import {projectRequest} from "./types";
import {RootState} from "../store";
import {getAUserAsset} from "../user/thunk";


export function deleteProjectThunk(project_id: string) {
    return (dispatch: ThunkDispatch<RootState, any, Action>) => {
        dispatch(deleteProject(project_id))
            .then(() => {
                dispatch(removeProject(project_id))
                dispatch(deleteLoading(false))
                dispatch(ActiveModal(''))
                dispatch(getProjectsThunk());
            })
            .catch(() => {
                dispatch(deleteLoading(false))
            })
    }
}

export function joinProjectsThunk(data: projectRequest) {
    return (dispatch: ThunkDispatch<RootState, any, Action>) => {
        dispatch(joinProjectRequest(data)).then( async() => {
            dispatch(joinLoading(false))
            dispatch(ActiveModal(''))
            dispatch(getRequestsThunk());
         })
    }
}

export function getProjectDetails(id: string) {
    return (dispatch: ThunkDispatch<RootState, any, Action>, getState: () => RootState) => {
        dispatch(projectDetailsLoading(true));
        dispatch(getProjectsThunk('')).then(async () => {
            const projectReducer = getState();
            const {projectStore} = projectReducer;
            const project = projectStore.projects.filter((value) => {
                return value.project_id === id;
            })
            const username = project[0].owner;
            const userImage = await dispatch(getAUserAsset(username));
            dispatch(projectDetails({project: project[0], userImage: userImage}))
            dispatch(projectDetailsLoading(false));
        });
    }
}

export function getUserProjectsThunk(username: string) {
    return async (dispatch: ThunkDispatch<RootState, any, Action>) => {
        dispatch(projectLoading(true))
        await dispatch(getUserProjects(username)).then((res: any) => {
            const {payload} = res;
            dispatch(userProjects(payload.data.rows))
            dispatch(projectLoading(false))
        })
    }
}

export function editProjectThunk() {
    return async (dispatch: ThunkDispatch<RootState, any, Action>, getState: () => RootState ) => {
        const {projectStore} = getState();
        const {selectedProject, projectForm} = projectStore;
        const projectsArr = projectStore.userProjects;
        const data = {
            project_id: selectedProject.project_id,
            name: projectForm.name,
            description: projectForm.description
        }
        await dispatch(editProjects(data))
        const updateUserProjects = projectsArr.map((value) => {
            return value.project_id === selectedProject.project_id ?
                {...value, name: projectForm.name, description: projectForm.description} : value
        })
        dispatch(userProjects(updateUserProjects));
    }
}

export function getProjectsThunk(value?: string) {
    return async (dispatch: ThunkDispatch<RootState, any, Action>) => {
        await dispatch(getProjects(value ? value : ''))
    }
}

export function getRequestsThunk() {
    return (dispatch: ThunkDispatch<RootState, any, Action>) => {
        dispatch(getRequests()).then((res: { payload: any; }) => {
            const {payload} = res;
            dispatch(projectRequests(payload))
            dispatch(requestsLoading(false))
        });
    }
}
