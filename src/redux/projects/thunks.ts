import {
    getProjectImage, uploadProjectImage,
    // uploadProjectImage
} from "./services";
import {
    createProjectLoading,
    deleteLoading,
    joinLoading, projectArr, projectDetails, projectDetailsLoading, projectLoading,
    projectRequests, projectValues,
    requestsLoading, topProjectsHandler, topProjectsLoading,
    userProjects
} from "./projectSlice";
import {Action, ThunkDispatch} from "@reduxjs/toolkit";
import {ActiveModal} from "../modals/modalSlice";
import {projectRequest} from "./types";
import {RootState} from "../store";
import {getAUserAsset, sendNotificationThunk} from "../user/thunk";
import {authedUser} from "../user/userSlice";
import axios from "axios";
import {IcreateProject} from "../types";
import {notify} from "../../helpers/notify";
import {deleteService, getService, postService, putService} from "../../services/callTypes";


export function sendNotification(user_id: string, text: string) {
    return (dispatch: ThunkDispatch<RootState, any, Action>) => {
      return dispatch(sendNotificationThunk(user_id, text))
    }
}

export function deleteProjectThunk(project_id: string) {
    return async (dispatch: ThunkDispatch<RootState, any, Action>, getState: () => RootState) => {
        const projectsReducer = getState();
        const userProjectsData = projectsReducer.projectStore.userProjects;
        return await deleteService('projects', {
            project_id: project_id
        }).then(() => {
            dispatch(deleteLoading(false))
            dispatch(ActiveModal(''))
            if (userProjectsData) {
                dispatch(userProjects(userProjectsData.filter(project => project.project_id !== project_id)))
            }
        })
          .catch(() => {
               notify('An error has occurred')
                dispatch(deleteLoading(false))
            })
    }
}

export function joinProjectsThunk(data: projectRequest) {
    return async (dispatch: ThunkDispatch<RootState, any, Action>, getState: () => RootState) => {
        const {userStore, projectStore} = getState();
        const {authUser} = userStore;
        const {selectedProject} = projectStore;
        return await postService('projects', {
         ...data
        }).then(async () => {
            dispatch(joinLoading(false))
            dispatch(ActiveModal(''))
            dispatch(authedUser({...authUser, requests: [
                    ...authUser.requests, {...data}
                ]}))
            notify('Request submitted successfully')
            await sendNotification(authUser.attributes.sub, `${authUser.username} has requested to join your project ${selectedProject.name}`)
        }).catch(() => {
            dispatch(joinLoading(false))
            return notify('An error has occurred')
        })
    }
}

export function getTopProjectsThunk() {
    return async (dispatch: ThunkDispatch<RootState, any, Action>) => {
        dispatch(topProjectsLoading(true))
        return await getService('projects/top').then((res) => {
            return res.data.rows;
        }).then((res: []) => {
            dispatch(topProjectsHandler(res))
            dispatch(topProjectsLoading(false))
        }).catch(() => {
            dispatch(topProjectsLoading(false))
            return notify('An error has occurred')
        })
    }
}

export function createProjectThunk(data: IcreateProject) {
    return async (dispatch: ThunkDispatch<RootState, any, Action>, getState: () => RootState) => {
        const {userStore, projectStore} = getState();
        const {authUser} = userStore;
        const {projectForm} = projectStore;
        return await postService('projects', {
         ...data
        }).then(async (res: any) => {
            dispatch(ActiveModal(''))
            dispatch(createProjectLoading(false))
            dispatch(projectValues({...projectForm, name: '', description: '', searchterm: '', imageFile: {}, imageSrc: ''}))
            notify(`Project ${data.name} added successfully`);
            await dispatch(getProjectsThunk(''));
            await sendNotification(authUser.attributes.sub, `${authUser.username} has created a new project: ${data.name}`)
            return res.data.rows;
        }).catch(() => {
            return notify('An error has occurred')
        })
    }
}

export function getProjectDetails(name: string, username: string) {
    return async (dispatch: ThunkDispatch<RootState, any, Action>, getState: () => RootState) => {
        dispatch(projectDetailsLoading(true));
        await Promise.all([
            dispatch(getProjectsThunk(name)),
            dispatch(getAUserAsset(username))
        ]).then((res) => {
            const projectReducer = getState();
            const projectData = projectReducer.projectStore.projects[0]
            dispatch(projectDetails({...projectData, userImage: res[1]}))
            dispatch(projectDetailsLoading(false));
        });
    }
}

export function getUserProjectsThunk(username: string) {
    return async (dispatch: ThunkDispatch<RootState, any, Action>) => {
        dispatch(projectLoading(true))
        return await getService(`user/projects?owner=${username}`).then((res) => {
            return res.data.rows;
        }).then(async (res: []) => {
            const updatedProjects = res.map(async (value: any) => {
                return {...value, image: await dispatch(getProjectImage(value.project_id)).then((res: any) => {
                        return res.payload.imageUrl;
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
        const updateImage = dispatch(uploadProjectImage({project_id: data.project_id, file: projectForm.imageFile}))
        const updateProject = putService('project', {
            project_id: data.project_id,
            name: data.name,
            description: data.description,
        })
        await Promise.all([updateProject, updateImage])
            .then(() => {
                const updateUserProjects = projectsArr?.map((value) => {
                    return value.project_id === selectedProject.project_id ?
                        {...value,
                            name: projectForm.name,
                            description: projectForm.description,
                            image: projectForm.imageSrc.length > 0 ? projectForm.imageSrc : value.image
                        } : value
                })
                if (updateUserProjects) {
                    dispatch(userProjects(updateUserProjects));
                }
            })
    }
}

export function getProjectsThunk(value?: string) {
    return async (dispatch: ThunkDispatch<RootState, any, Action>, getState: () => RootState) => {
        dispatch(projectLoading(true));
        await Promise.all([
            dispatch(getRequestsThunk()),
            getService(`projects?searchterm=${value ? value : ''}`)
        ]).then(async (res) => {
            const allProjects = res[1].data.rows;
            const updatedProjects = allProjects.map(async (value: any) => {
                return {...value, image: await dispatch(getProjectImage(value.project_id)).then((res: any) => {
                        return res.payload.imageUrl;
                    })}
            })
            const projects = await Promise.all(updatedProjects)
            dispatch(projectArr(projects))
            dispatch(projectLoading(false));
        }).catch((err) => {
            dispatch(projectLoading(false));
            notify(err);
        })
    }
}

export function getRequestsThunk() {
    return async (dispatch: ThunkDispatch<RootState, any, Action>, getState: () => RootState) => {
        const userReducer = getState();
        const {authUser} = userReducer.userStore;
        dispatch(requestsLoading(true));
        return await getService(`requests`).then((res) => {
            return res.data.rows;
        }).then((res) => {
            const userRequests = res.filter((value: any) => {
                return value.user === authUser.username;
            })
            dispatch(authedUser({...authUser, requests: userRequests}))
            dispatch(projectRequests(res))
            dispatch(requestsLoading(false))
        }).catch((err) => {
            return notify(err);
        })
    }
}
