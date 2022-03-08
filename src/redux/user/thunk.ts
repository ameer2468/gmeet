import {Action, ThunkDispatch} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {User} from "./types";
import {
    createUser,
    followUserService,
    getGlobalMessages,
    getNotificationsService,
    getUser,
    getUserFollowers,
    getUserImage, markAsReadService,
    postGlobalMessage,
    sendNotifications,
    unFollowUserService,
    uploadUserAsset
} from "./services";
import {
    authedUser,
    globalMessagesHandler,
    loading,
    notificationLoading,
    userDetails,
    userFormHandler,
    userImageHandler,
} from "./userSlice";
import {fileUpload, userImage} from '../image/imageSlice';
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

export function getAssetThunk(user?: string) {
    return async (dispatch: ThunkDispatch<RootState, any, Action>, getState: () => RootState) => {
        const userReducer = getState();
        const {authUser} = userReducer.userStore;
        const {username} = authUser;
        dispatch(userImageHandler(true));
        const userInfo = await dispatch(getUser(user ? user : username))
        const getUserAsset = await dispatch(getUserImage(user ? user : username)).then((res: any) => {
            const imageUrl = res.payload.data.imageUrl;
            const authObjectUpdate = {...authUser, userImage: imageUrl}
            dispatch(authedUser(authObjectUpdate))
            dispatch(userImageHandler(false));
            dispatch(loading(false))
        })
        await Promise.all([getUserAsset, userInfo]);
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

export function sendNotificationThunk(user_id: string, message: string) {
    return async (dispatch: ThunkDispatch<RootState, any, Action>) => {
        dispatch(sendNotifications({user_id, message}));
    }
}

export function markAsReadThunk(user_id: string, timestamp: string) {
    return async (dispatch: ThunkDispatch<RootState, any, Action>, getState: () => RootState) => {
        const userStore = getState();
        const {authUser} = userStore.userStore;
        const updateNotifications = {
            ...authUser, notifications: authUser.notifications.map((value: any) => {
                return value.read_at === null ? {...value, read_at: timestamp} : value
            })
        }
        dispatch(authedUser(updateNotifications));
       await dispatch(markAsReadService({user_id, timestamp}))
            .catch((err) => {
            console.log(err)
        })
    }
}

export function getNotifications(id: string) {
    return async (dispatch: ThunkDispatch<RootState, any, Action>, getState: () => RootState) => {
        const userReducer = getState();
        const {authUser} = userReducer.userStore;
        dispatch(notificationLoading(true));
        await dispatch(getNotificationsService(id)).then(async (res: any) => {
            const {rows} = res.payload.data;
            dispatch(authedUser({...authUser, notifications: rows}))
            dispatch(notificationLoading(false));
        });
    }
}

export function followUserThunk(info: {id: string, user_id: string, follower_id: string}) {
    return (dispatch: ThunkDispatch<RootState, any, Action>, getState: () => RootState) => {
        const userReducer = getState();
        const {authUser} = userReducer.userStore;
        const data = {...info}
        dispatch(authedUser({...authUser,
            following: [...authUser.following, data]
        }))
        dispatch(followUserService(data))
            .catch(() => {
            notify('An error has occurred')
        })
    }
}

export function getGlobalMessagesThunk() {
    return async (dispatch: ThunkDispatch<RootState, any, Action>) => {
        await dispatch(getGlobalMessages()).then((res: any) => {
            const {rows} = res.payload.data;
            dispatch(globalMessagesHandler(rows))
        });
    }
}

export function sendGlobalMessageThunk(data: {username: string, message: string, time: string}) {
    return async (dispatch: ThunkDispatch<RootState, any, Action>, getState: () => RootState) => {
        const userReducer = getState();
        const {globalMessages} = userReducer.userStore;
        const {userForm} = userReducer.userStore;
        await dispatch(postGlobalMessage(data)).then((res: any) => {
            const {data} = res.payload;
            dispatch(globalMessagesHandler([...globalMessages, data]))
            dispatch(userFormHandler({...userForm, globalMessage: ''}))
        });
    }
}

export function unFollowUserThunk(id: string) {
    return async (dispatch: ThunkDispatch<RootState, any, Action>, getState: () => RootState) => {
        const userReducer = getState();
        const {authUser} = userReducer.userStore;
        dispatch(authedUser({...authUser,
            following: authUser.following.filter((item: {id: string}) => item.id !== id),
        }))
        dispatch(unFollowUserService(id))
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
                const updatedObject = {...rows[0]}
                dispatch(userImage(imageUrl))
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
        const {userStore, imageStore} = getState();
        dispatch(userImageHandler(true));
        const data = {
            file: imageStore.fileUpload,
            username: userStore.authUser.username
        }
        await dispatch(uploadUserAsset(data));
        dispatch(fileUpload(undefined));
        dispatch(userImageHandler(false));
        notify('Profile picture successfully updated')
    }
}

export function getAllUserData(username: string) {
    return async (dispatch: ThunkDispatch<RootState, any, Action>, getState: () => RootState) => {
        // const userReducer = getState();
        // const {id} = userReducer.userStore.userInfo;
        dispatch(projectLoading(true));
        dispatch(postsLoadingHandler(true))
        dispatch(commentPostLoading(true));
        await Promise.all([
            dispatch(getCurrentUserThunk(username)),
            dispatch(getUserProjectsThunk(username)),
            dispatch(getRequestsThunk),
            dispatch(getUserFollowersThunk(username)),
            dispatch(getPostsThunk(username)),
            dispatch(getCommentsThunk(username))
        ]);
         dispatch(postsLoadingHandler(false))
    }
}
