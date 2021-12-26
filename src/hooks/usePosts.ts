import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {commentPostLoading, deletePostLoading, postsReducer, postValues} from "../redux/posts/postsSlice";
import {userReducer} from "../redux/user/userSlice";
import {v4 as uuidv4} from "uuid";
import {addCommentThunk, addPostThunk, deletePostThunk} from "../redux/posts/thunks";
import moment from "moment";
import {ActiveModal} from "../redux/modals/modalSlice";


export const usePosts = () => {

    const dispatch = useAppDispatch();
    const postsStore = useAppSelector(postsReducer);
    const userStore = useAppSelector(userReducer);
    const username = userStore.authUser.username;


    function onChange(key: string, value: string) {
        return dispatch(postValues(
            {...postsStore.postForm, [key]: value}))
    }

    function submitComment(post_id: string) {
        dispatch(commentPostLoading(true))
        dispatch(addCommentThunk({
            id: uuidv4(),
            post_id: post_id,
            posted_by: username,
            date: moment().format('MMMM Do YYYY, h:mm:ss a'),
            comment: postsStore.postForm.comment
        }))
       dispatch(postValues({
            ...postsStore.postForm, comment: ''
        }))
    }

    function submitPost() {
        dispatch(addPostThunk({
            post: postsStore.postForm.post,
            post_id: uuidv4(),
            date: moment().format('MMMM Do YYYY, h:mm:ss a'),
            user: username,
            comments: []
        }))
        dispatch(postValues({
            ...postsStore.postForm, post: ''
        }))
    }

    function deletePostHandler(id: string) {
        dispatch(deletePostLoading(true));
        dispatch(deletePostThunk(id)).then(() => {
            dispatch(deletePostLoading(false));
            dispatch(ActiveModal(''));
        })
    }

    return {
        onChange,
        postsStore,
        submitPost,
        submitComment,
        deletePostHandler
    }
}
