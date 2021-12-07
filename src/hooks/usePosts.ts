import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {postsReducer, postValues} from "../redux/posts/postsSlice";
import {userReducer} from "../redux/user/userSlice";
import {v4 as uuidv4} from "uuid";
import {addPostThunk, deletePostThunk} from "../redux/posts/thunks";
import moment from "moment";


export const usePosts = () => {

    const dispatch = useAppDispatch();
    const postsStore = useAppSelector(postsReducer);
    const userStore = useAppSelector(userReducer);
    const {username} = userStore.userInfo;

    function onChange(key: string, value: string) {
        return dispatch(postValues(
            {...postsStore.postForm, [key]: value}))
    }

    function submitPost() {
        dispatch(addPostThunk({
            post: postsStore.postForm.post,
            post_id: uuidv4(),
            date: moment().format('MMMM Do YYYY, h:mm:ss a'),
            user: username
        }))
        dispatch(postValues({
            ...postsStore.postForm, post: ''
        }))
    }

    function deletePostHandler() {
        dispatch(deletePostThunk(postsStore.selectedPost.post_id))
    }

    return {
        onChange,
        postsStore,
        submitPost,
        deletePostHandler
    }
}