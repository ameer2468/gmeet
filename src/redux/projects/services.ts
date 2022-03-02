import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {editProject, IcreateProject, projectRequest} from "./types";
import {acceptRequest} from "../types";
import {loadToken} from "../../services/loadToken";
import {getService} from "../../services/callTypes";

const URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

export const deleteProject = createAsyncThunk('projects/deleteproject', async (id: string) => {
    const auth = await loadToken();
    return await axios.delete(`${URL}/projects`, {
        headers: {
            'x-api-key': API_KEY as string,
            Authorization: auth,
        },
        data: {
            project_id: id
        },
    })
})

export const TopProjects = createAsyncThunk('projects/topprojects', async () => {
    const auth = await loadToken();
    return await axios.get(`${URL}/projects/top`, {
        headers: {
            'x-api-key': API_KEY as string,
            Authorization: auth,
        },
    })
})

export const rejectJoinRequest = createAsyncThunk('projects/rejectrequest', async(id: string) => {
    const auth = await loadToken();
    return await axios.delete(`${URL}/requests`, {
        headers: {
            'x-api-key': API_KEY as string,
            Authorization: auth,
        },
        data: {
            id: id
        }
    })
})

export const joinProjectRequest =
    createAsyncThunk('project/joinproject', async (data: projectRequest) => {
        const auth = await loadToken();
    return await axios.post(`${URL}/project`, {
        project_id: data.project_id,
        user: data.user,
        user_id: data.user_id,
        why: data.why,
        role: data.role,
        id: data.id
    },{
        headers: {
            'x-api-key': API_KEY as string,
            Authorization: auth,
        },
    })
})

export const acceptRequests = createAsyncThunk('requests/accept', async (data: acceptRequest) => {
    const auth = await loadToken();
    return await axios.post(`${URL}/requests`, {
        project_id: data.project_id,
        id: data.id,
        user_id: data.user_id,
        role: data.role
    }, {
        headers: {
            'x-api-key': API_KEY as string,
            'Content-Type': 'application/json',
            Authorization: auth,
        }
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
    const auth = await loadToken();
    const file = data.file;
    return await axios.post(`${URL}/project/image`, {
        project_id: data.project_id,
        fileType: file.type
    }, {
        headers: {
            'x-api-key': API_KEY as string,
            Authorization: auth,
        }
    }).then((res) => {
        const {fileUploadURL, fileType} = res.data;
        axios.put(`${fileUploadURL}`, file, {
            headers: {
                'Content-Type': fileType,
            }
        })
    })
})

export const editProjects = createAsyncThunk('project/editproject', async (data: editProject) => {
    return await axios.put(`${URL}/project`, {
        project_id: data.project_id,
        name: data.name,
        description: data.description,
    },{
        headers: {
            'x-api-key': API_KEY as string,
        },
    })
})


export const createProject = createAsyncThunk('projects/createproject', async (data: IcreateProject) => {
    const auth = await loadToken();
    return await axios.post(`${URL}/projects`, {
        project_id: data.project_id,
        name: data.name,
        description: data.description,
        owner: data.owner,
        user_id: data.user_id,
        role: data.role,
        members: data.members,
        requests: data.requests,
    },{
        headers: {
            'x-api-key': API_KEY as string,
            Authorization: auth,
        },
    })
})
