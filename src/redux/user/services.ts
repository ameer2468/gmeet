import {createAsyncThunk} from "@reduxjs/toolkit";
import {User} from "./types";
import axios from "axios";
import {loadToken} from "../../services/loadToken";

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
    const token = await loadToken();
    return await axios.get(`${URL}/user`, {
        headers: {
            'x-api-key': process.env.REACT_APP_API_KEY,
            Authorization: token
        },
        params: {
            username: username
        }
    })
})