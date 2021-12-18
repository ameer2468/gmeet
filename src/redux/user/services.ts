import {createAsyncThunk} from "@reduxjs/toolkit";
import {User} from "./types";
import axios from "axios";

const URL = process.env.REACT_APP_API_URL;

export const createUser = createAsyncThunk('user/create', async (data: User) => {
    return await axios.post(`${URL}/user`, {
        id: data.id,
        username: data.username,
        profession: data.profession,
        website: data.website,
    },{
        headers: {
            'x-api-key': process.env.REACT_APP_API_KEY,
        },
    })
})

export const getUser = createAsyncThunk('getUsers/user', async (username: string) => {
    return await axios.get(`${URL}/user`, {
        headers: {
            'x-api-key': process.env.REACT_APP_API_KEY,
        },
        params: {
            username: username
        }
    })
})