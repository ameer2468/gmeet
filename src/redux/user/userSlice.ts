import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type {RootState} from "../store";

// Define a type for the slice state
interface UserState {
    userInfo: {
        id: string;
        username: string;
        profession: string;
        website: string;
    }
    authUser: any;
    LoggedIn: boolean;
    Loading: boolean;
}

// Define the initial state using that type
const initialState: UserState = {
    userInfo: {
        id: '',
        username: '',
        profession: '',
        website: ''
    },
    authUser: {},
    LoggedIn: false,
    Loading: false
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
        status: (state, action: PayloadAction<boolean>) => {
            state.LoggedIn = action.payload;
        },
        loading: (state, action: PayloadAction<boolean>) => {
            state.Loading = action.payload;
        }
    },
})

export const { userDetails, status, loading, authedUser } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const userReducer = (state: RootState) => state.userStore;

export default userSlice.reducer