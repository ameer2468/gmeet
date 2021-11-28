import {RootState} from "../store";
import {Action, ThunkDispatch} from "@reduxjs/toolkit";
import {addPostService, getPostsService} from "./services";
import {post} from "../types";
import {postsArr} from "./postsSlice";
import {notify} from "../../helpers/notify";

export function addPostThunk(data: post) {
    return async (dispatch: ThunkDispatch<RootState, any, Action>) => {
       await dispatch(addPostService(data)).catch(() => {
           return notify('An error has occurred')
       })
       dispatch(postsArr({
           post: data.post,
           post_id: data.post_id,
           user: data.user
       }))
    }
}

export function getPostsThunk(user: string) {
return async (dispatch: ThunkDispatch<RootState, any, Action>) => {
    await dispatch(getPostsService(user)).then((res: any) => {
        console.log(res)
        // dispatch(postsArr(data))
    });
}
}