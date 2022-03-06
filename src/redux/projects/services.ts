import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {editProject, IcreateProject, projectRequest} from "./types";
import {acceptRequest} from "../types";
import {deleteService, fileService, getService, postService, putService} from "../../services/callTypes";

const API_KEY = process.env.REACT_APP_API_KEY;

export const deleteProject = createAsyncThunk('projects/deleteproject', async (id: string) => {
    return await deleteService('projects', {
        project_id: id
    }).then((res) => {
        return res.data.rows;
    })
})

export const rejectJoinRequest = createAsyncThunk('projects/rejectrequest', async(id: string) => {
    return await deleteService(`requests`, {
        id: id
    }).then((res) => {
        return res.data.rows;
    })
})

export const joinProjectRequest = createAsyncThunk('project/joinproject', async (data: projectRequest) => {
        return await postService('project', {
            project_id: data.project_id,
            user: data.user,
            user_id: data.user_id,
            why: data.why,
            role: data.role,
            id: data.id
        });
})

export const acceptRequests = createAsyncThunk('requests/accept', async (data: acceptRequest) => {
    return await postService('requests', {
        project_id: data.project_id,
        id: data.id,
        user_id: data.user_id,
        role: data.role
    }).then((res) => {
        return res.data.rows;
    })
})

export const getProjectDetails = createAsyncThunk('projectDetails/data', async() => {
    return await axios.get(`${process.env.REACT_APP_API_URL}/projectdetails`, {
        headers: {
            'x-api-key': API_KEY as string,
            'Content-Type': 'application/json'
        }
    })
        .then((res) => {
        return res.data.rows
    })
})

export const getProjectImage = createAsyncThunk('project/image', async (project_id: string) => {
    return await getService(`project/image`, {project_id: project_id}).then((res) => {
        return res.data;
    })
})

export const getProjects = createAsyncThunk('project/data', async (searchTerm?: string) => {
    return await getService(`projects?searchterm=${searchTerm ? searchTerm : ''}`).then((res) => {
        return res.data.rows;
    })
})

export const getRequests = createAsyncThunk('requests', async () => {
    return await getService(`requests`).then((res) => {
        return res.data.rows;
    })
})

export const getProject = createAsyncThunk('projects/getproject', async (user: string) => {
    return await getService(`projects?user=${user}`).then((res) => {
        return res.data.rows;
    })
})

export const getUserProjects = createAsyncThunk('projects/getproject', async (user: string) => {
    return await getService(`user/projects?owner=${user}`).then((res) => {
        return res.data.rows;
    })
})

export const uploadProjectImage = createAsyncThunk('project/image', async(data: {project_id: string, file: any}) => {
    const file = data.file;
    return await postService('project/image', {
        project_id: data.project_id,
        fileType: file.type,
    }).then((res) => {
        const {fileUploadURL, fileType} = res.data;
        fileService(fileUploadURL,file, fileType)
    })
})

export const editProjects = createAsyncThunk('project/editproject', async (data: editProject) => {
    return await putService('project', {
        project_id: data.project_id,
        name: data.name,
        description: data.description,
    })
})


export const createProject = createAsyncThunk('projects/createproject', async (data: IcreateProject) => {
    return postService('projects', {
        project_id: data.project_id,
        name: data.name,
        description: data.description,
        owner: data.owner,
        user_id: data.user_id,
        role: data.role,
        members: data.members,
        requests: data.requests,
    }).then((res) => {
        return res.data.rows;
    })
})
