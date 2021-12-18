import {Action, ThunkDispatch} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {User} from "./types";
import {createUser, getUser} from "./services";
import {loading, userDetails} from "./userSlice";
import {getRequestsThunk, getUserProjectsThunk} from "../projects/thunks";
import {getCommentsThunk, getPostsThunk} from "../posts/thunks";
import {postsLoadingHandler} from "../posts/postsSlice";


export function createUserThunk(data: User) {
    return (dispatch: ThunkDispatch<RootState, any, Action>) => {
        dispatch(createUser(data));
    }
}

export function getUserThunk(username: string) {
    return (dispatch: ThunkDispatch<RootState, any, Action>) => {
        dispatch(getUser(username)).then((res: any) => {
            const {rows} = res.payload.data;
            dispatch(userDetails(rows[0]))
            dispatch(loading(false))
        })
    }
}

export function getAllUserData(username: string) {
    return async (dispatch: ThunkDispatch<RootState, any, Action>) => {
        dispatch(getUserProjectsThunk(username))
        dispatch(getRequestsThunk());
        await dispatch(getPostsThunk(username));
        dispatch(getCommentsThunk(username)).then(() => {
            dispatch(postsLoadingHandler(false))
        });
        dispatch(getUserThunk(username));
    }
}