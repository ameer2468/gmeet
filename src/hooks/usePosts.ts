import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {deletePostLoading, postsReducer, postValues} from "../redux/posts/postsSlice";
import {userReducer} from "../redux/user/userSlice";
import {v4 as uuidv4} from "uuid";
import {addCommentThunk, addPostThunk, deletePostThunk} from "../redux/posts/thunks";
import moment from "moment";
import {ActiveModal} from "../redux/modals/modalSlice";


export const usePosts = () => {

    const dispatch = useAppDispatch();
    const postsStore = useAppSelector(postsReducer);
    const userStore = useAppSelector(userReducer);
    const {username} = userStore.userInfo;


    function onChange(key: string, value: string) {
        return dispatch(postValues(
            {...postsStore.postForm, [key]: value}))
    }

    function submitComment() {
        dispatch(addCommentThunk({
            id: uuidv4(),
            post_id: uuidv4(),
            date: moment().format('MMMM Do YYYY, h:mm:ss a'),
            user: username,
            comment: postsStore.postForm.comment
        }))
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
        dispatch(deletePostLoading(true));
        dispatch(deletePostThunk(postsStore.selectedPost.post_id)).then(() => {
            dispatch(deletePostLoading(false));
            dispatch(ActiveModal(''));
        })
    }

    return {
        onChange,
        postsStore,
        submitPost,
        deletePostHandler
    }
}