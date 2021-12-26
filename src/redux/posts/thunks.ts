import {RootState} from "../store";
import {Action, ThunkDispatch} from "@reduxjs/toolkit";
import {
    addCommentService,
    addPostService,
    deleteCommentService,
    deletePostService,
    getCommentsService,
    getPostsService
} from "./services";
import {comment, post} from "../types";
import {
    postsArr,
    addPosts,
    deletePost, addPostHandler,
} from "./postsSlice";
import {notify} from "../../helpers/notify";

export function addPostThunk(data: post) {
    return async (dispatch: ThunkDispatch<RootState, any, Action>) => {
        dispatch(addPostHandler(true));
       await dispatch(addPostService(data)).then(() => {
           dispatch(addPosts({
               post: data.post,
               post_id: data.post_id,
               date: data.date,
               user: data.user,
               comments: []
           }))
           dispatch(addPostHandler(false));
       }).catch(() => {
           return notify('An error has occurred')
       })
    }
}

export function getCommentsThunk(user: string) {
    return async (dispatch: ThunkDispatch<RootState, any, Action>, getState: () => RootState) => {
        const {postsStore} = getState();
        const {posts} = postsStore;
        await dispatch(getCommentsService(user)).then((res: any) => {
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
        const {postsStore} = getState();
        const originalPosts = postsStore.posts;
        dispatch(addCommentService(data)).then(() => {
            const newComment = {
               ...data
            }
            const updateArr = originalPosts.map((value) => {
                return value.post_id === data.post_id ?
                    {...value, comments: [...value.comments, newComment ]} : value;
            })
            dispatch(postsArr(updateArr))
        }).catch((err) => {
            return notify(err.message)
        })
    }
 }

export function deleteCommentThunk(id: string, username: string) {
    return async (dispatch: ThunkDispatch<RootState, any, Action>) => {
        await dispatch(deleteCommentService(id)).then(() => {
                dispatch(getCommentsThunk(username))
        }).catch(() => {
            return notify('An error has occurred')
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
    await dispatch(getPostsService(user)).then((res: any) => {
        const {rows} = res.payload.data;
        dispatch(postsArr(rows))
    }).catch(() => {
        return notify('An error has occurred')
    });
}
}
