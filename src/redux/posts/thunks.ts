import {RootState} from "../store";
import {Action, ThunkDispatch} from "@reduxjs/toolkit";
import {addCommentService, addPostService, deletePostService, getCommentsService, getPostsService} from "./services";
import {comment, post} from "../types";
import {
    postsArr,
    addPosts,
    postsLoadingHandler,
    deletePost,
    commentPostLoading,
} from "./postsSlice";
import {notify} from "../../helpers/notify";

export function addPostThunk(data: post) {
    return async (dispatch: ThunkDispatch<RootState, any, Action>) => {
        dispatch(postsLoadingHandler(true))
       await dispatch(addPostService(data)).then(() => {
           dispatch(postsLoadingHandler(false))
           dispatch(addPosts({
               post: data.post,
               post_id: data.post_id,
               date: data.date,
               user: data.user,
               comments: []
           }))
       }).catch(() => {
           return notify('An error has occurred')
       })
    }
}

export function getCommentsThunk(user: string) {
    return async (dispatch: ThunkDispatch<RootState, any, Action>, getState: () => RootState) => {
        const {postsStore} = getState();
        const {posts} = postsStore;
        dispatch(commentPostLoading(true))
        await dispatch(getCommentsService(user)).then((res: any) => {
            dispatch(commentPostLoading(false))
            const {rows} = res.payload.data;
            const updatePosts = posts.map((value: post) => {
                const getComments = rows.filter((data: comment) => data.post_id === value.post_id);
                return {...value, comments: getComments}
            })
            dispatch(postsArr(updatePosts as []))
        }).catch(() => {
            return notify('An error has occurred')
        });
    }
}

export function addCommentThunk(data: comment)  {
    return async (dispatch: ThunkDispatch<RootState, any, Action>, getState: () => RootState) => {
        const {userStore} = getState();
        const {username} = userStore.userInfo;
        dispatch(commentPostLoading(true))
        await dispatch(addCommentService(data)).then(() => {
            dispatch(commentPostLoading(false))
            dispatch(getCommentsThunk(username))
        }).catch((err) => {
            return notify(err.message)
        })
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