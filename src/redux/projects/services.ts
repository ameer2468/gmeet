import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {project} from "./types";

const URL = process.env.REACT_APP_API_URL;

export const deleteProject = createAsyncThunk('projects/deleteproject', async (id: string) => {
    return await axios.delete(`${URL}/projects`, {
        headers: {
            'x-api-key': process.env.REACT_APP_API_KEY,
        },
        data: {
            id: id
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


export const getProject = createAsyncThunk('projects/getproject', async (user: string) => {
    return await axios.get(`${URL}/project/?user=${user}`, {
        headers: {
            'x-api-key': process.env.REACT_APP_API_KEY,
        }
    })
})

export const createProject = createAsyncThunk('projects/createproject', async (data: project) => {
    return await axios.post(`${URL}/projects`, {
        id: data.id,
        name: data.name,
        description: data.description,
        owner: data.owner
    },{
        headers: {
            'x-api-key': process.env.REACT_APP_API_KEY,
        },
    })
})