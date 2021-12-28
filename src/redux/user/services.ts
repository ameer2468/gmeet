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

export const getUserImage = createAsyncThunk('user/asset', async (username: string) => {
    return await axios.get(`${URL}/asset`, {
        headers: {
            'x-api-key': process.env.REACT_APP_API_KEY,
        },
        params: {
            username: username
        }
    })
})

export const uploadUserAsset = createAsyncThunk('user/asset', async (data: {username: string, file: File}) => {
    const file = data.file;
    return await axios.post(`${URL}/asset`, {
            username: data.username
        }, {
        headers: {
            'x-api-key': process.env.REACT_APP_API_KEY,
        }
        }).then((res) => {
        const url = res.data.fileUploadURL;
            axios.put(`${url}`, file)
        }).catch((err) => {
        console.log(err)
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