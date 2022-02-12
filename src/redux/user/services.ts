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

export const postGlobalMessage = createAsyncThunk('post/global', async (data: {username: string, message: string, time: string}) => {
    return await axios.post(`${URL}/user/message`, {
        username: data.username,
        message: data.message,
        time: data.time
    }, {
        headers: {
            'x-api-key': process.env.REACT_APP_API_KEY,
        },
    })
})

export const getUserFollowers = createAsyncThunk('getUsers/user', async (id: string) => {
    return await axios.get(`${URL}/follower`, {
        headers: {
            'x-api-key': process.env.REACT_APP_API_KEY,
        },
        params: {
            user_id: id
        }
    })
})

export const getGlobalMessages = createAsyncThunk('getUsers/global', async () => {
    return await axios.get(`${URL}/user/message`, {
        headers: {
            'x-api-key': process.env.REACT_APP_API_KEY,
        },
    })
})

export const unFollowUserService = createAsyncThunk('user/create', async (id: string) => {
    return await axios.delete(`${URL}/follower`, {
        headers: {
            'x-api-key': process.env.REACT_APP_API_KEY,
        },
        data: {
            id: id
        }
    })
})

export const followUserService = createAsyncThunk('user/create', async (info: {id: string, user_id: string, follower_id: string}) => {
    return await axios.post(`${URL}/follower`, {
        id: info.id,
        user_id: info.user_id,
        follower_id: info.follower_id,
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
            username: username,
        }
    })
})

export const uploadUserAsset = createAsyncThunk('user/asset', async (data: {username: string, file: File}) => {
    const file = data.file;
    return await axios.post(`${URL}/asset`, {
            username: data.username,
            fileType: file.type,
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
        }).catch((err) => {
        console.log(err)
    })
    })

export const sendNotifications = createAsyncThunk('notifications/post', async (data: {user_id: string, message: string}) => {
    return await axios.post(`${URL}/notification`, {
        user_id: data.user_id,
        text: data.message
    }, {
        headers: {
            'x-api-key': process.env.REACT_APP_API_KEY,
        },
    })
})

export const getNotificationsService = createAsyncThunk('get/notifications', async (id: string) => {
    return await axios.get(`${URL}/notification`, {
        headers: {
            'x-api-key': process.env.REACT_APP_API_KEY,
        },
        params: {
            id: id
        }
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
