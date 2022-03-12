import axios from "axios";
import {comment, post} from "../types";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {loadToken} from "../../services/loadToken";
import {postService} from "../../services/callTypes";


const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

export const addPostService = createAsyncThunk('posts/addpost', async(data: post) =>  {
    return await postService('posts', {
        post: data.post,
        post_id: data.post_id,
        date: data.date,
        user: data.user
    }).catch((err) =>{
        throw new Error(err)
    })
})

export const addCommentService = createAsyncThunk('comments/addcomment', async(data: comment) =>  {
    const auth = await loadToken();
    return await axios.post(`${API_URL}/comments`,
        {
            id: data.id,
            post_id: data.post_id,
            comment: data.comment,
            date: data.date,
            posted_by: data.posted_by
        }, {
            headers: {
                'x-api-key': API_KEY as string,
                Authorization: auth
            }
        })
})

export const getCommentsService = createAsyncThunk('posts/getcomments', async (user: string) => {
    const auth = await loadToken();
    return await axios.get(`${API_URL}/comments`, {
        headers: {
            'x-api-key': API_KEY as string,
            Authorization: auth
        },
        params: {
            user: user
        }
    })
})

export const deleteCommentService = createAsyncThunk('posts/deletecomment', async(id: string) => {
    const auth = await loadToken();
    return await axios.delete(`${API_URL}/comments`, {
        headers: {
            'x-api-key': API_KEY as string,
            Authorization: auth
        },
        data: {
            post_id: id
        }
    })
})

export const deletePostService = createAsyncThunk('posts/delete', async(id: string) => {
    const auth = await loadToken();
    return await axios.delete(`${API_URL}/posts`, {
        headers: {
            'x-api-key': API_KEY as string,
            Authorization: auth
        },
        data: {
            post_id: id
        }
    })
})

export const editPostService = createAsyncThunk('posts/editpost', async(data: {post_id: string, post: string}) => {
    const auth = await loadToken();
    return await axios.put(`${API_URL}/posts`, {
        post_id: data.post_id,
        post: data.post
    }, {
        headers: {
            'x-api-key': API_KEY as string,
            Authorization: auth
        }
    })
})

export const getPostsService = createAsyncThunk('posts/getposts', async (user: string) => {
    const token = await loadToken();
    return await axios.get(`${API_URL}/posts`, {
        headers: {
            'x-api-key': API_KEY as string,
            Authorization: token
        },
        params: {
            user: user
        }
    })
})
