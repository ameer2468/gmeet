import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type {RootState} from "../store";
import {post, comment} from "../types";

// Define a type for the slice state
interface PostsState {
    postForm: {
        post: string;
        comment: string;
        editpost: string
    },
    posts: post[]
    postsLoading: boolean;
    selectedPost: post;
    addPostLoading: boolean;
    editPost: boolean;
    deletePostLoading: boolean;
    editPostLoading: boolean;
    commentLoading: boolean;
    comments: comment[]
}

// Define the initial state using that type
const initialState: PostsState = {
   deletePostLoading: false,
    editPostLoading: false,
    postsLoading: false,
    addPostLoading: false,
    editPost: false,
    commentLoading: false,
   comments: [],
   postForm: {
       post: '',
       comment: '',
       editpost: ''
   },
    selectedPost: {
        post_id: '',
        post: '',
        date: '',
        user: '',
        comments: []
    },
   posts: []
}

export const postsSlice = createSlice({
    name: 'posts',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        addPostHandler: (state, action: PayloadAction<boolean>) => {
        state.addPostLoading = action.payload;
        },
        postsLoadingHandler: (state, action: PayloadAction<boolean>) => {
          state.postsLoading = action.payload;
        },
        postValues: (state, action: PayloadAction<any>) => {
           state.postForm = action.payload;
        },
        commentsArr: (state, action:PayloadAction<[]>) => {
            state.comments = action.payload;
        },
        addComment: (state, action: PayloadAction<comment>) => {
          state.comments.push(action.payload);
        },
        deletePostLoading: (state, action: PayloadAction<boolean>) => {
            state.deletePostLoading = action.payload;
        },
        editPost: (state, action: PayloadAction<boolean>) => {
          state.editPost = action.payload;
        },
        commentPostLoading: (state, action: PayloadAction<boolean>) => {
            state.commentLoading = action.payload;
        },
        editPostLoading: (state, action:PayloadAction<boolean>) => {
          state.editPostLoading = action.payload;
        },
        postsArr: (state, action:PayloadAction<any>) => {
          state.posts = action.payload;
        },
        selectPost: (state, action:PayloadAction<any>) => {
            state.selectedPost = action.payload;
        },
        addPosts: (state, action: PayloadAction<post>) => {
          state.posts.push(action.payload);
        },
        deletePost: (state, action: PayloadAction<string>) => {
            state.posts = state.posts.filter((value) => {
                return value.post_id !== action.payload;
            })
        },
    },
})

export const {
    postValues,
    postsArr,
    deletePost,
    addComment,
    commentPostLoading,
    editPostLoading,
    commentsArr,
    addPosts,
    editPost,
    deletePostLoading,
    selectPost,
    postsLoadingHandler,
    addPostHandler } = postsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const postsReducer = (state: RootState) => state.postsStore;

export default postsSlice.reducer
