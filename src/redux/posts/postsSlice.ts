import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type {RootState} from "../store";
import {post, posts} from "../types";

// Define a type for the slice state
interface PostsState {
    postForm: {
        post: string;
        comment: string;
    },
    posts: posts[]
}

// Define the initial state using that type
const initialState: PostsState = {
   postForm: {
       post: '',
       comment: ''
   },
   posts: []
}

export const postsSlice = createSlice({
    name: 'posts',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        postValues: (state, action: PayloadAction<any>) => {
           state.postForm = action.payload;
        },
        postsArr: (state, action: PayloadAction<post>) => {
          state.posts.push(action.payload);
        },
        deletePost: (state, action: PayloadAction<string>) => {
            state.posts = state.posts.filter((value) => {
                return value.post_id !== action.payload;
            })
        }
    },
})

export const { postValues, postsArr, deletePost } = postsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const postsReducer = (state: RootState) => state.postsStore;

export default postsSlice.reducer