import axios from "axios";
import {comment, post} from "../types";
import {createAsyncThunk} from "@reduxjs/toolkit";


const API_URL = process.env.REACT_APP_API_URL;

export const addPostService = createAsyncThunk('posts/addpost', async(data: post) =>  {
    return await axios.post(`${API_URL}/posts`,
        {
        post: data.post,
        post_id: data.post_id,
        date: data.date,
        user: data.user
    }, {
        headers: {
            'x-api-key': process.env.REACT_APP_API_KEY,
            'Content-Type': 'application/json'
        }
    })
})

export const addCommentService = createAsyncThunk('comments/addcomment', async(data: comment) =>  {
    return await axios.post(`${API_URL}/posts`,
        {
            id: data.id,
            post_id: data.post_id,
            comment: data.comment,
            date: data.date,
            user: data.user
        }, {
            headers: {
                'x-api-key': process.env.REACT_APP_API_KEY,
                'Content-Type': 'application/json'
            }
        })
})

export const deletePostService = createAsyncThunk('posts/delete', async(id: string) => {
    return await axios.delete(`${API_URL}/posts`, {
        headers: {
            'x-api-key': process.env.REACT_APP_API_KEY,
        },
        data: {
            post_id: id
        }
    })
})

export const getPostsService = createAsyncThunk('posts/getposts', async (user: string) => {
    return await axios.get(`${API_URL}/posts/?user=${user}`, {
        headers: {
            'x-api-key': process.env.REACT_APP_API_KEY,
        }
    })
})