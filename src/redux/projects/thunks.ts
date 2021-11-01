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