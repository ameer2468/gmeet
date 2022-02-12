import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type {RootState} from "../store";

// Define a type for the slice state
interface ImageState {
   userImage: string;
   fileUpload: any;
}

// Define the initial state using that type
const initialState: ImageState = {
    userImage: '',
    fileUpload: ''
}

export const imageSlice = createSlice({
    name: 'image',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        userImage: (state, action: PayloadAction<any>) => {
            state.userImage = action.payload;
        },
        fileUpload: (state, action: PayloadAction<any>) => {
            state.fileUpload = action.payload;
        },
        reset(state) {
            Object.assign(state, initialState)
        }
    },
})

export const {
    reset,
    userImage,
    fileUpload
} = imageSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const imageReducer = (state: RootState) => state.imageStore;

export default imageSlice.reducer
