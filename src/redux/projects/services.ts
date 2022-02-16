import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {editProject, project, projectRequest} from "./types";
import {acceptRequest} from "../types";

const URL = process.env.REACT_APP_API_URL;

export const deleteProject = createAsyncThunk('projects/deleteproject', async (id: string) => {
    return await axios.delete(`${URL}/projects`, {
        headers: {
            'x-api-key': process.env.REACT_APP_API_KEY,
        },
        data: {
            project_id: id
        },
    })
})

export const TopProjects = createAsyncThunk('projects/topprojects', async () => {
    return await axios.get(`${URL}/projects/top`, {
        headers: {
            'x-api-key': process.env.REACT_APP_API_KEY,
        },
    })
})

export const rejectJoinRequest = createAsyncThunk('projects/rejectrequest', async(id: string) => {
    return await axios.delete(`${URL}/requests`, {
        headers: {
            'x-api-key': process.env.REACT_APP_API_KEY,
        },
        data: {
            id: id
        }
    })
})

export const joinProjectRequest =
    createAsyncThunk('project/joinproject', async (data: projectRequest) => {
    return await axios.post(`${URL}/project`, {
        project_id: data.project_id,
        user: data.user,
        user_id: data.user_id,
        why: data.why,
        role: data.role,
        id: data.id
    },{
        headers: {
            'x-api-key': process.env.REACT_APP_API_KEY,
        },
    })
})

export const acceptRequests = createAsyncThunk('requests/accept', async (data: acceptRequest) => {
    return await axios.post(`${URL}/requests`, {
        project_id: data.project_id,
        id: data.id,
        user_id: data.user_id,
        role: data.role
    }, {
        headers: {
            'x-api-key': process.env.REACT_APP_API_KEY,
            'Content-Type': 'application/json'
        }
    })
})

export const getProjectDetails = createAsyncThunk('projectDetails/data', async() => {
    return await axios.get(`${process.env.REACT_APP_API_URL}/projectdetails`, {
        headers: {
            'x-api-key': process.env.REACT_APP_API_KEY,
            'Content-Type': 'application/json'
        }
    })
        .then((res) => {
        return res.data.rows
    })
})

export const getProjects = createAsyncThunk('project/data', async (searchTerm?: string) => {
            return await axios.get(`${process.env.REACT_APP_API_URL}/projects?searchterm=${searchTerm ? searchTerm : ''}`, {
                headers: {
                    'x-api-key': process.env.REACT_APP_API_KEY,
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => {
                    return res.data.rows;
                });

})

export const getRequests = createAsyncThunk('requests', async () => {
    return await axios.get(`${process.env.REACT_APP_API_URL}/requests`, {
        headers: {
            'x-api-key': process.env.REACT_APP_API_KEY,
            'Content-Type': 'application/json'
        }
    })
        .then((res) => {
            return res.data.rows;
        });

})

export const getProject = createAsyncThunk('projects/getproject', async (user: string) => {
    return await axios.get(`${URL}/project/?user=${user}`, {
        headers: {
            'x-api-key': process.env.REACT_APP_API_KEY,
        }
    })
})
export const getUserProjects = createAsyncThunk('projects/getproject', async (user: string) => {
    return await axios.get(`${URL}/user/projects/?owner=${user}`, {
        headers: {
            'x-api-key': process.env.REACT_APP_API_KEY,
        }
    })
})

export const uploadProjectImage = createAsyncThunk('project/image', async(data: {project_id: string, file: any}) => {
    const file = data.file;
    return await axios.post(`${URL}/project/image`, {
        project_id: data.project_id,
        fileType: file.type
    }, {
        headers: {
            'x-api-key': process.env.REACT_APP_API_KEY,
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
            'x-api-key': process.env.REACT_APP_API_KEY,
        },
    })
})


export const createProject = createAsyncThunk('projects/createproject', async (data: project) => {
    return await axios.post(`${URL}/projects`, {
        project_id: data.project_id,
        name: data.name,
        description: data.description,
        owner: data.owner,
        user_id: data.user_id,
        role: data.role,
    },{
        headers: {
            'x-api-key': process.env.REACT_APP_API_KEY,
        },
    })
})
