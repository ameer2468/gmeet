import {Action, ThunkDispatch} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {User} from "./types";
import {createUser, getUser, getUserImage, uploadUserAsset} from "./services";
import {authedUser, loading, userDetails, userImageHandler, userImageUpload} from "./userSlice";
import {getRequestsThunk, getUserProjectsThunk} from "../projects/thunks";
import {getCommentsThunk, getPostsThunk} from "../posts/thunks";
import {postsLoadingHandler} from "../posts/postsSlice";
import {notify} from "../../helpers/notify";

export function createUserThunk(data: User) {
    return (dispatch: ThunkDispatch<RootState, any, Action>) => {
        dispatch(createUser(data));
    }
}

export function getAssetThunk(username: string) {
    return async (dispatch: ThunkDispatch<RootState, any, Action>, getState: () => RootState) => {
        await dispatch(getUser(username)).then((res: any) => {
            const {userStore} = getState();
            const {authUser} = userStore;
            dispatch(getUserImage(username)).then((res: any) => {
                const imageUrl = res.payload.data.imageUrl;
                const authObjectUpdate = {...authUser, userImage: imageUrl}
                dispatch(authedUser(authObjectUpdate))
                dispatch(userImageHandler(false));
                dispatch(loading(false))
            })
        }).catch(() => {
            notify('An error has occurred')
        })
    }
}

export function getCurrentUserThunk(username: string) {
    return async (dispatch: ThunkDispatch<RootState, any, Action>) => {
        await dispatch(getUser(username)).then((res: any) => {
            const {rows} = res.payload.data;
            dispatch(getUserImage(username)).then((res: any) => {
                const imageUrl = res.payload.data.imageUrl;
                const updatedObject = {...rows[0], userImage: imageUrl}
                dispatch(userDetails(updatedObject))
                dispatch(userImageHandler(false));
                dispatch(loading(false))
            })
        }).catch(() => {
            notify('An error has occurred')
        })
    }
}

export function uploadUserAssetThunk() {
    return async (dispatch: ThunkDispatch<RootState, any, Action>, getState: () => RootState) => {
        const {userStore} = getState();
        const userInfo = userStore.userInfo;
        const authUser = userStore.authUser;
        const data = {
            file: userStore.imageUpload,
            username: userStore.authUser.username
        }
        dispatch(userImageHandler(true));
        await dispatch(uploadUserAsset(data));
        await dispatch(getUserImage(data.username)).then((res: any) => {
            const imageUrl = res.payload.data.imageUrl;
            const authObjectUpdate = {...authUser, userImage: imageUrl}
            const updatedObject = {...userInfo, userImage: imageUrl}
            dispatch(userDetails(updatedObject))
            dispatch(authedUser(authObjectUpdate))
            dispatch(userImageHandler(false));
            dispatch(userImageUpload(undefined));
        }).catch(() => {
            notify('An error has occurred')
        })
    }
}

export function getAllUserData(username: string) {
    return async (dispatch: ThunkDispatch<RootState, any, Action>) => {
        await dispatch(getUserProjectsThunk(username))
        dispatch(getRequestsThunk());
        await dispatch(getPostsThunk(username));
        await dispatch(getCommentsThunk(username));
        await dispatch(getCurrentUserThunk(username));
        dispatch(postsLoadingHandler(false))
    }
}
