import {comment, post} from "../types";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {deleteService, getService, postService, putService} from "../../services/callTypes";

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

export const addCommentService = createAsyncThunk('comments/addcomment', async(data: comment) => {
    return await postService(`comments`,
        {
            id: data.id,
            post_id: data.post_id,
            comment: data.comment,
            date: data.date,
            posted_by: data.posted_by
        })
})

export const getCommentsService = createAsyncThunk('posts/getcomments', async (user: string) => {
    return await getService(`comments`, {
        user: user
    })
})

export const deleteCommentService = createAsyncThunk('posts/deletecomment', async(id: string) => {
    return await deleteService(`comments`, {
            post_id: id
    })
})

export const deletePostService = createAsyncThunk('posts/delete', async(id: string) => {
    return await deleteService(`posts`, {
            post_id: id
    })
})

export const editPostService = createAsyncThunk('posts/editpost', async(data: {post_id: string, post: string}) => {
    return await putService(`posts`, {
        post_id: data.post_id,
        post: data.post
    })
})

export const getPostsService = createAsyncThunk('posts/getposts', async (user: string) => {
    return await getService(`posts`, {
        user: user
    })
})
