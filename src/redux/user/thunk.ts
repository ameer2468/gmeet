import {Action, ThunkDispatch} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {User} from "./types";
import {
    createUser,
    followUserService, getNotificationsService,
    getUser,
    getUserFollowers,
    getUserImage, sendNotifications,
    unFollowUserService,
    uploadUserAsset
} from "./services";
import {authedUser, loading, notificationLoading, userDetails, userImageHandler, userImageUpload} from "./userSlice";
import {getRequestsThunk, getUserProjectsThunk} from "../projects/thunks";
import {getCommentsThunk, getPostsThunk} from "../posts/thunks";
import {notify} from "../../helpers/notify";
import {projectLoading} from "../projects/projectSlice";
import {commentPostLoading, postsLoadingHandler} from "../posts/postsSlice";

export function createUserThunk(data: User) {
    return (dispatch: ThunkDispatch<RootState, any, Action>) => {
        dispatch(createUser(data));
    }
}

export function getAUserAsset(username: string) {
    return async (dispatch: ThunkDispatch<RootState, any, Action>) => {
        const userImage: any = await dispatch(getUserImage(username));
        return userImage.payload.data.imageUrl;
    }
}

export function getAssetThunk(username: string) {
    return async (dispatch: ThunkDispatch<RootState, any, Action>, getState: () => RootState) => {
        await dispatch(getUser(username)).then(() => {
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

export function getUserFollowersThunk(id: string) {
    return async (dispatch: ThunkDispatch<RootState, any, Action>, getState: () => RootState) => {
        const userReducer = getState();
        const {userInfo} = userReducer.userStore;
       await dispatch(getUserFollowers(id)).then((res: any) => {
           const {followers, following} = res.payload.data;
           dispatch(userDetails({...userInfo, followers: followers, following: following}))
        });
    }
}

export function sendNotificationThunk(user_ids: [], message: string) {
    return async (dispatch: ThunkDispatch<RootState, any, Action>) => {
        dispatch(sendNotifications({user_ids, message}));
    }
}

export function getNotifications(id: string) {
    return async (dispatch: ThunkDispatch<RootState, any, Action>, getState: () => RootState) => {
        const userReducer = getState();
        const {authUser} = userReducer.userStore;
        dispatch(notificationLoading(true));
        await dispatch(getNotificationsService(id)).then(async (res: any) => {
            const {rows} = res.payload.data;
            await dispatch(authedUser({...authUser, notifications: rows}))
            dispatch(notificationLoading(false));
        });
    }
}

export function followUserThunk(info: {id: string, user_id: string, follower_id: string}) {
    return async (dispatch: ThunkDispatch<RootState, any, Action>, getState: () => RootState) => {
        const userReducer = getState();
        const {authUser} = userReducer.userStore;
        const data = {...info}
        dispatch(followUserService(data))
            .then((res: any) => {
                const {data} = res.payload;
                dispatch(authedUser({...authUser,
                    following: [...authUser.following, data]
                }))
            })
            .catch(() => {
            notify('An error has occurred')
        })
    }
}

export function unFollowUserThunk(id: string) {
    return async (dispatch: ThunkDispatch<RootState, any, Action>, getState: () => RootState) => {
        const userReducer = getState();
        const {authUser} = userReducer.userStore;
        dispatch(unFollowUserService(id))
            .then(() => {
                dispatch(authedUser({...authUser,
                    following: authUser.following.filter((item: any) => item.id !== id),
                }))
            })
            .catch(() => {
            notify('An error has occurred')
        })
    }
}

export function getCurrentUserThunk(username: string) {
    return async (dispatch: ThunkDispatch<RootState, any, Action>) => {
        dispatch(loading(true));
        await dispatch(getUser(username)).then(async (res: any) => {
            const {rows} = res.payload.data;
            await dispatch(getUserImage(username)).then((res: any) => {
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
        dispatch(getUserImage(data.username)).then((res: any) => {
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
    return async (dispatch: ThunkDispatch<RootState, any, Action>, getState: () => RootState) => {
        const userReducer = getState();
        const {id} = userReducer.userStore.userInfo;
        dispatch(projectLoading(true));
        dispatch(postsLoadingHandler(true))
        dispatch(commentPostLoading(true));
        await dispatch(getCurrentUserThunk(username));
        await dispatch(getUserProjectsThunk(username))
        await dispatch(getRequestsThunk());
       await dispatch(getUserFollowersThunk(id));
       await dispatch(getPostsThunk(username)).then(async () => {
           await dispatch(getCommentsThunk(username));
           dispatch(postsLoadingHandler(false))
       })
    }
}
