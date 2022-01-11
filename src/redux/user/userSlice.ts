import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type {RootState} from "../store";
import {notificationItem} from "./types";

// Define a type for the slice state
interface UserState {
    userInfo: {
        id: string;
        username: string;
        profession: string;
        website: string;
        userImage: string;
        notifications: notificationItem[],
        followers: string[],
        following: string[]
    }
    authUser: any;
    LoggedIn: boolean;
    Loading: boolean;
    userImageLoading: boolean;
    imageUpload: any;
}

// Define the initial state using that type
const initialState: UserState = {
    userInfo: {
        id: '',
        username: '',
        profession: '',
        website: '',
        userImage: '',
        notifications: [],
        followers: [],
        following: []
    },
    authUser: {},
    LoggedIn: false,
    imageUpload: '',
    Loading: false,
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
        userImageUpload: (state, action: PayloadAction<any>) => {
            state.imageUpload = action.payload;
        },
        status: (state, action: PayloadAction<boolean>) => {
            state.LoggedIn = action.payload;
        },
        loading: (state, action: PayloadAction<boolean>) => {
            state.Loading = action.payload;
        }
    },
})

export const { userDetails, status, loading, authedUser, userImageHandler, userImageUpload } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const userReducer = (state: RootState) => state.userStore;

export default userSlice.reducer