import {
    createProject,
    deleteProject,
    editProjects, getProjectImage,
    getProjects,
    getRequests,
    getUserProjects,
    joinProjectRequest, TopProjects, uploadProjectImage
} from "./services";
import {
    deleteLoading,
    joinLoading, projectArr, projectDetails, projectDetailsLoading, projectLoading,
    projectRequests,
    requestsLoading, topProjectsHandler, topProjectsLoading,
    userProjects
} from "./projectSlice";
import {Action, ThunkDispatch} from "@reduxjs/toolkit";
import {ActiveModal} from "../modals/modalSlice";
import {projectRequest} from "./types";
import {RootState} from "../store";
import {getAUserAsset} from "../user/thunk";
import {authedUser} from "../user/userSlice";
import axios from "axios";
import {IcreateProject} from "../types";
import {notify} from "../../helpers/notify";


export function deleteProjectThunk(project_id: string) {
    return (dispatch: ThunkDispatch<RootState, any, Action>, getState: () => RootState) => {
        const projectsReducer = getState();
        const userProjectsData = projectsReducer.projectStore.userProjects;
        dispatch(deleteProject(project_id))
            .then(() => {
                dispatch(deleteLoading(false))
                dispatch(ActiveModal(''))
                dispatch(userProjects(userProjectsData.filter(project => project.project_id !== project_id)))
            })
            .catch((err: any) => {
                console.log(err)
                dispatch(deleteLoading(false))
            })
    }
}

export function joinProjectsThunk(data: projectRequest) {
    return async (dispatch: ThunkDispatch<RootState, any, Action>, getState: () => RootState) => {
        const userReducer = getState();
        const {userStore} = userReducer;
        dispatch(joinProjectRequest(data)).then( async() => {
            dispatch(joinLoading(false))
            dispatch(ActiveModal(''))
            dispatch(authedUser({...userStore.authUser, requests: [
                    ...userStore.authUser.requests, {...data}
                ]}))
         })
    }
}

export function getTopProjectsThunk() {
    return async (dispatch: ThunkDispatch<RootState, any, Action>) => {
        dispatch(topProjectsLoading(true))
        await dispatch(TopProjects()).then((res: any) => {
            const {rows} = res.payload.data;
            dispatch(topProjectsHandler(rows))
            dispatch(topProjectsLoading(false))
        })
    }
}

export function createProjectThunk(data: IcreateProject) {
    return async (dispatch: ThunkDispatch<RootState, any, Action>) => {
        await dispatch(createProject(data));
    }
}

export function getProjectDetails(name: string) {
    return (dispatch: ThunkDispatch<RootState, any, Action>, getState: () => RootState) => {
        dispatch(projectDetailsLoading(true));
        dispatch(getProjectsThunk(name)).then(async () => {
            const projectReducer = getState();
            const projectData = projectReducer.projectStore.projects[0]
            const username =  projectData.owner;
            const userImage = await dispatch(getAUserAsset(username));
            dispatch(projectDetails({project: projectData, userImage: userImage}))
            dispatch(projectDetailsLoading(false));
        });
    }
}

export function getUserProjectsThunk(username: string) {
    return async (dispatch: ThunkDispatch<RootState, any, Action>) => {
        dispatch(projectLoading(true))
        await dispatch(getUserProjects(username)).then(async (res: any) => {
            const {payload} = res;
            const updatedProjects = payload.data.rows.map(async (value: any) => {
                return {...value, image: await dispatch(getProjectImage(value.project_id)).then((res: any) => {
                        return res.payload.data.imageUrl;
                    })}
            })
            const projects = await axios.all(updatedProjects)
            dispatch(userProjects(projects as any))
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
        await dispatch(uploadProjectImage({project_id: data.project_id, file: projectForm.imageFile}))
            .catch((err) => {
                notify(err)
            })
        const updateUserProjects = projectsArr.map((value) => {
            return value.project_id === selectedProject.project_id ?
                {...value, name: projectForm.name, description: projectForm.description} : value
        })
        dispatch(userProjects(updateUserProjects));
    }
}

export function getProjectsThunk(value?: string) {
    return async (dispatch: ThunkDispatch<RootState, any, Action>) => {
        dispatch(projectLoading(true));
        await dispatch(getRequestsThunk());
        dispatch(getProjects(value ? value : '')).then( async (res) => {
            const {payload} = res;
            const updatedProjects = payload.map(async (value: any) => {
                return {...value, image: await dispatch(getProjectImage(value.project_id)).then((res: any) => {
                    return res.payload.data.imageUrl;
                    })}
            })
            const projects = await axios.all(updatedProjects)
            dispatch(projectArr(projects))
            dispatch(projectLoading(false));
        })
    }
}

export function getRequestsThunk() {
    return (dispatch: ThunkDispatch<RootState, any, Action>, getState: () => RootState) => {
        const userReducer = getState();
        const {authUser} = userReducer.userStore;
        dispatch(requestsLoading(true));
        dispatch(getRequests()).then((res: { payload: any; }) => {
            const {payload} = res;
            const userRequests = payload.filter((value: any) => {
                return value.user === authUser.username;
            })
            dispatch(authedUser({...authUser, requests: userRequests}))
            dispatch(projectRequests(payload))
            dispatch(requestsLoading(false))
        }).catch((err) => {
            console.log(err)
        })
    }
}
