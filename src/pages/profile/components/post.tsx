import React, {useEffect} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComments, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useUser} from "../../../hooks/useUser";
import {ActiveModal} from "../../../redux/modals/modalSlice";
import {useAppDispatch} from "../../../redux/hooks";
import {selectPost} from "../../../redux/posts/postsSlice";
import TextArea from "../../../components/global/textarea";
import {usePosts} from "../../../hooks/usePosts";
import {comment} from "../../../redux/types";
import LoadingSpinner from "../../../components/global/LoadingSpinner";
import Comment from "./comment";
import BeatLoader from "react-spinners/BeatLoader";


interface props {
    data: {
        post: string;
        post_id: string;
        date: string;
        comments: any;
    }
}

const Post = ({data}: props) => {

    const userHook = useUser();
    const dispatch = useAppDispatch();
    const postHook = usePosts();
    const {commentLoading} = postHook.postsStore;
    const {comment} = postHook.postsStore.postForm;

    useEffect(() => {
    }, [data])


    return (
        <div className={'post'}>
            <div className="leaveComment">
                <TextArea
                    maxWidth={'70%'}
                    placeholder={'Leave a comment...'}
                    useHook={postHook}
                    height={'7rem'}
                    value={postHook.postsStore.postForm.comment}
                    name={'comment'}/>
                <button disabled={comment.length === 0} onClick={() => postHook.submitComment(data.post_id)} className={`btn btn--green ${comment.length === 0 && 'disabledButton'}`}>
                    {commentLoading ?  <BeatLoader size={8} margin={1} color={'#2a2c3d'} /> :
                        <p> <FontAwesomeIcon className='commentIcon' icon={faComments}/>Comment</p>}
                </button>
            </div>
            <div className={`postInfo`}>
                <p className='poster'>{userHook.userInfo.username}</p>
                <p className='date'>{data.date}</p>
            </div>
            <p className='postText'>{data.post}</p>
            <div className="actions">
                <div onClick={() => {
                    dispatch(selectPost(data))
                    dispatch(ActiveModal('DELETE_POST'))
                }} className="delete">
                    <FontAwesomeIcon icon={faTrash}/>
                </div>
            </div>
            {data.comments === undefined  ? <div style={{marginTop: '2rem'}}><LoadingSpinner height={60} width={60}/></div> :
                data.comments.map((value: comment) => {
                        return (
                           <Comment key={value.id} data={value}/>
                        )
                    })
            }
        </div>
    );
};

export default Post;