import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type {RootState} from "../store";
import {userForm} from "./types";

// Define a type for the slice state
interface UserState {
    userInfo: {
        id: string;
        username: string;
        profession: string;
        website: string;
        userImage: string;
        followers: string[],
        following: string[]
    }
    authUser: any;
    LoggedIn: boolean;
    Loading: boolean;
    userImageLoading: boolean;
    notificationLoading: boolean;
    changePasswordLoading: boolean;
    globalMessages: any[];
    toggleChat: boolean;
    imageUpload: any;
    userForm: userForm;
}

// Define the initial state using that type
const initialState: UserState = {
    userInfo: {
        id: '',
        username: '',
        profession: '',
        website: '',
        userImage: '',
        followers: [],
        following: []
    },
    authUser: {},
    globalMessages: [],
    userForm: {
        oldPassword: '',
        newPassword: '',
        username: '',
        code: '',
        password: '',
        globalMessage: ''
    },
    LoggedIn: false,
    changePasswordLoading: false,
    imageUpload: '',
    toggleChat: false,
    Loading: false,
    notificationLoading: false,
    userImageLoading: false
}

export const userSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        userDetails: (state, action: PayloadAction<any>) => {
            state.userInfo = action.payload;
        },
        authedUser: (state, action: PayloadAction<any>) => {
           state.authUser = action.payload
        },
        userImageHandler: (state, action: PayloadAction<boolean>) => {
          state.userImageLoading = action.payload;
        },
        userFormHandler: (state, action: PayloadAction<userForm>) => {
            state.userForm = action.payload;
        },
        toggleChatHandler: (state, action: PayloadAction<boolean>) => {
            state.toggleChat = action.payload;
        },
        globalMessagesHandler: (state, action: PayloadAction<any>) => {
            state.globalMessages = action.payload;
        },
        changePasswordLoading: (state, action: PayloadAction<boolean>) => {
            state.changePasswordLoading = action.payload;
        },
        notificationLoading: (state, action: PayloadAction<boolean>) => {
            state.notificationLoading = action.payload;
        },
        userImageUpload: (state, action: PayloadAction<any>) => {
            state.imageUpload = action.payload;
        },
        status: (state, action: PayloadAction<boolean>) => {
            state.LoggedIn = action.payload;
        },
        loading: (state, action: PayloadAction<boolean>) => {
            state.Loading = action.payload;
        },
        reset(state) {
            Object.assign(state, initialState)
        }
    },
})

export const {
    userDetails,
    userFormHandler,
    globalMessagesHandler,
    changePasswordLoading,
    status,
    loading,
    toggleChatHandler,
    authedUser,
    userImageHandler,
    userImageUpload,
    notificationLoading, reset
} = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const userReducer = (state: RootState) => state.userStore;

export default userSlice.reducer
