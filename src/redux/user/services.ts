import {createAsyncThunk} from "@reduxjs/toolkit";
import {User} from "./types";
import axios from "axios";
import {loadToken} from "../../services/loadToken";
import {deleteService, getService, postService, putService} from "../../services/callTypes";

const URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

export const createUser = createAsyncThunk('user/create', async (data: User) => {
    return await postService('user', {
        id: data.id,
        username: data.username,
        profession: data.profession,
        website: data.website,
    })
})

export const postGlobalMessage = createAsyncThunk('post/global', async (data: {username: string, message: string, time: string}) => {
    return await postService('user/message', {
        username: data.username,
        message: data.message,
        time: data.time
    })
})

export const getUserFollowers = createAsyncThunk('getUsers/user', async (id: string) => {
    return await getService('follower', {
        user_id: id
    })
})

export const getGlobalMessages = createAsyncThunk('getUsers/global', async () => {
    return getService('user/message');
})

export const unFollowUserService = createAsyncThunk('user/create', async (id: string) => {
    return await deleteService('follower', {
        id: id
    })
})

export const followUserService = createAsyncThunk('user/create', async (info: {id: string, user_id: string, follower_id: string}) => {
    return postService('follower', {
        id: info.id,
        user_id: info.user_id,
        follower_id: info.follower_id,
    })
})

export const getUserImage = createAsyncThunk('user/asset', async (username: string) => {
    return await getService('asset', {
        username: username,
    })
})

export const uploadUserAsset = createAsyncThunk('user/asset', async (data: {username: string, file: File}) => {
    const file = data.file;
    const auth = await loadToken();
    return await axios.post(`${URL}/asset`, {
            username: data.username,
            fileType: file.type,
        }, {
        headers: {
            'x-api-key': API_KEY as string,
            Authorization: auth
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
    const auth = await loadToken();
    return await axios.post(`${URL}/notification`, {
        user_id: data.user_id,
        text: data.message
    }, {
        headers: {
            'x-api-key': API_KEY as string,
            Authorization: auth
        },
    })
})

export const markAsReadService = createAsyncThunk('notifications/read', async (data: {user_id: string, timestamp: string}) => {
    return await putService('notification', {
        user_id: data.user_id,
        timestamp: data.timestamp
    })
})

export const getNotificationsService = createAsyncThunk('get/notifications', async (id: string) => {
    return await getService('notification', {
        id: id
    })
})


export const getUser = createAsyncThunk('getUsers/user', async (username: string) => {
    return await getService('user', {
        username: username
    })
})
