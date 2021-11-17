import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {project} from "./types";
import {v4 as uuidv4} from "uuid";

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

export const joinProjectRequest =
    createAsyncThunk('project/joinproject', async (data: any) => {
    return await axios.post(`${URL}/project`, {
        project_id: data.project_id,
        user: data.user,
        why: data.why,
        speciality: data.speciality,
        id: uuidv4()
    },{
        headers: {
            'x-api-key': process.env.REACT_APP_API_KEY,
        },
    })
})

export const getProjects = createAsyncThunk('project/data', async (searchTerm?: string) => {
            return await axios.get(`${process.env.REACT_APP_API_URL}/projects?searchterm=${searchTerm}`, {
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

export const createProject = createAsyncThunk('projects/createproject', async (data: project) => {
    return await axios.post(`${URL}/projects`, {
        project_id: data.project_id,
        name: data.name,
        description: data.description,
        owner: data.owner,
    },{
        headers: {
            'x-api-key': process.env.REACT_APP_API_KEY,
        },
    })
})