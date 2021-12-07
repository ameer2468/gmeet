import {RootState} from "../store";
import {Action, ThunkDispatch} from "@reduxjs/toolkit";
import {addCommentService, addPostService, deletePostService, getPostsService} from "./services";
import {comment, post} from "../types";
import {postsArr, addPosts, postsLoadingHandler, deletePost, addComment, commentPostLoading} from "./postsSlice";
import {notify} from "../../helpers/notify";

export function addPostThunk(data: post) {
    return async (dispatch: ThunkDispatch<RootState, any, Action>) => {
        dispatch(postsLoadingHandler(true))
       await dispatch(addPostService(data)).then(() => {
           dispatch(postsLoadingHandler(false))
       }).catch(() => {
           return notify('An error has occurred')
       })
       dispatch(addPosts({
           post: data.post,
           post_id: data.post_id,
           date: data.date,
           user: data.user
       }))
    }
}

export function addCommentThunk(data: comment)  {
    return async (dispatch: ThunkDispatch<RootState, any, Action>) => {
        dispatch(commentPostLoading(true))
        await dispatch(addCommentService(data)).then(() => {
            dispatch(commentPostLoading(false))
        }).catch(() => {
            return notify('An error has occurred')
        })
        dispatch(addComment({
            id: data.id,
            post_id: data.post_id,
            date: data.date,
            user: data.user,
            comment: data.comment,
        }))
    }
 }

export function deletePostThunk(id: string) {
    return async (dispatch: ThunkDispatch<RootState, any, Action>) => {
        await dispatch(deletePostService(id)).then(() => {
            dispatch(deletePost(id));
        }).catch(() => {
            return notify('An error has occurred')
        })
    }
}

export function getPostsThunk(user: string) {
return async (dispatch: ThunkDispatch<RootState, any, Action>) => {
    dispatch(postsLoadingHandler(true))
    await dispatch(getPostsService(user)).then((res: any) => {
        dispatch(postsLoadingHandler(false))
        const {rows} = res.payload.data;
        dispatch(postsArr(rows))
    }).catch(() => {
        return notify('An error has occurred')
    });
}
}