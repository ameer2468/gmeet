import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {deletePost, postsArr, postsReducer, postValues} from "../redux/posts/postsSlice";
import {userReducer} from "../redux/user/userSlice";
import {v4 as uuidv4} from "uuid";


export const usePosts = () => {

    const dispatch = useAppDispatch();
    const postsStore = useAppSelector(postsReducer);
    const userStore = useAppSelector(userReducer);

    function onChange(key: string, value: string) {
        return dispatch(postValues(
            {...postsStore.postForm, [key]: value}))
    }

    function submitPost() {
        dispatch(postsArr({
            post: postsStore.postForm.post,
            post_id: uuidv4(),
            user: userStore.userInfo.username
        }))
        dispatch(postValues({
            ...postsStore.postForm, post: ''
        }))
    }

    function deletePostHandler(id: string) {
        dispatch(deletePost(id));
    }

    return {
        onChange,
        postsStore,
        submitPost,
        deletePostHandler
    }
}