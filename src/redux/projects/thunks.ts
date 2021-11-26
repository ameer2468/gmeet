import {deleteProject, getProjects, getRequests, joinProjectRequest} from "./services";
import {deleteLoading, joinLoading, projectArr, projectRequests, removeProject, requestsLoading} from "./projectSlice";
import {Action, ThunkDispatch, CombinedState} from "@reduxjs/toolkit";
import {ActiveModal} from "../modals/modalSlice";
import {project, projectRequest} from "./types";
import {RootState} from "../store";


export function deleteProjectThunk(project_id: string) {
    return (dispatch: ThunkDispatch<void, RootState, Action>) => {
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
    return (dispatch: ThunkDispatch<void, RootState, Action>) => {
        dispatch(joinProjectRequest(data)).then( () => {
            dispatch(joinLoading(false))
            dispatch(ActiveModal(''))
            dispatch(getRequestsThunk());
            dispatch(getProjectsThunk());
            dispatch(projectArr(projects.map((value) => {
                return value.project_id === data.project_id ?
                    {...value, requests: [...value.requests as [], data]} : value
            })))
         })
            .catch(() => {
                notify('An error has occurred')
            })
    }
}



export function getProjectsThunk(value?: string) {
    return (dispatch: ThunkDispatch<void, RootState, Action>) => {
        dispatch(getProjects(value ? value : ''))
    }
}

export function getRequestsThunk() {
    return (dispatch: ThunkDispatch<void, RootState, Action>) => {
        dispatch(getRequests()).then((res: { payload: any; }) => {
            const {payload} = res;
            dispatch(projectRequests(payload))
            dispatch(requestsLoading(false))
        });
    }
}
