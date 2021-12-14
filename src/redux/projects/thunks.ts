import {deleteProject, getProjects, getRequests, getUserProjects, joinProjectRequest} from "./services";
import {
    deleteLoading,
    joinLoading, projectLoading,
    projectRequests,
    removeProject,
    requestsLoading,
    userProjects
} from "./projectSlice";
import {Action, ThunkDispatch} from "@reduxjs/toolkit";
import {ActiveModal} from "../modals/modalSlice";
import {project, projectRequest} from "./types";
import {RootState} from "../store";


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

export function joinProjectsThunk(data: projectRequest, projects: project[], notify: (text: string) => void) {
    return (dispatch: ThunkDispatch<RootState, any, Action>) => {
        dispatch(joinProjectRequest(data)).then( async() => {
            dispatch(joinLoading(false))
            dispatch(ActiveModal(''))
            dispatch(getRequestsThunk());
            notify('Request has been submitted')
         })
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


export function getProjectsThunk(value?: string) {
    return (dispatch: ThunkDispatch<RootState, any, Action>) => {
        dispatch(getProjects(value ? value : ''))
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
