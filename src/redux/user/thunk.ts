import {Action, ThunkDispatch} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {User} from "./types";
import {createUser, getUser} from "./services";
import {authedUser, loading, userDetails} from "./userSlice";
import {getRequestsThunk, getUserProjectsThunk} from "../projects/thunks";
import {getCommentsThunk, getPostsThunk} from "../posts/thunks";
import {postsLoadingHandler} from "../posts/postsSlice";
import {s3} from '../../services/s3';

export function createUserThunk(data: User) {
    return (dispatch: ThunkDispatch<RootState, any, Action>) => {
        dispatch(createUser(data));
    }
}


export function getCurrentUserThunk(username: string) {
    return (dispatch: ThunkDispatch<RootState, any, Action>, getState: () => RootState) => {
        const {userStore} = getState()
        const authUser = userStore.authUser;
        dispatch(getUser(username)).then((res: any) => {
            const getParams = {
                Bucket: 'gmeet-images',
                Key: `${username}/profile.png`,
            };
            const {rows} = res.payload.data;
            s3.getSignedUrlPromise('getObject', getParams
            ).then((url) => {
                dispatch(userDetails({...rows[0], userImage: url}))
                const authObjectUpdate = {...authUser, userImage: url}
                dispatch(authedUser(authObjectUpdate))
                dispatch(loading(false))
            })
        })
    }
}

export function getImageProfileUserThunk(username: string) {
    return (dispatch: ThunkDispatch<RootState, any, Action>) => {
        dispatch(getUser(username)).then((res: any) => {
            const getParams = {
                Bucket: 'gmeet-images',
                Key: `${username}/profile.png`,
            };
            const {rows} = res.payload.data;
            s3.getSignedUrlPromise('getObject', getParams
            ).then((url) => {
                dispatch(userDetails({...rows[0], userImage: url}))
                dispatch(loading(false))
            })
        })
    }
}

export function getAllUserData(username: string) {
    return async (dispatch: ThunkDispatch<RootState, any, Action>) => {
        await dispatch(getUserProjectsThunk(username))
        dispatch(getRequestsThunk());
        await dispatch(getPostsThunk(username));
        dispatch(getCommentsThunk(username)).then(() => {
            dispatch(postsLoadingHandler(false))
        });
        dispatch(getImageProfileUserThunk(username));
    }
}
