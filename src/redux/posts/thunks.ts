import {RootState} from "../store";
import {Action, ThunkDispatch} from "@reduxjs/toolkit";
import {addPostService, getPostsService} from "./services";
import {post} from "../types";
import {postsArr, addPosts, postsLoadingHandler} from "./postsSlice";
import {notify} from "../../helpers/notify";

export function addPostThunk(data: post) {
    return async (dispatch: ThunkDispatch<RootState, any, Action>) => {
       await dispatch(addPostService(data)).catch(() => {
           return notify('An error has occurred')
       })
       dispatch(addPosts({
           post: data.post,
           post_id: data.post_id,
           user: data.user
       }))
    }
}

export function getPostsThunk(user: string) {
return async (dispatch: ThunkDispatch<RootState, any, Action>) => {
    dispatch(postsLoadingHandler(true))
    await dispatch(getPostsService(user)).then((res: any) => {
        dispatch(postsLoadingHandler(false))
        const {rows} = res.payload.data;
        dispatch(postsArr(rows))
    });
}
}