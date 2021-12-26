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
import {useParams} from "react-router-dom";


interface props {
    data: {
        post: string;
        post_id: string;
        date: string;
        comments: any;
        user: string;
    }
}

const Post = ({data}: props) => {

    const dispatch = useAppDispatch();
    const postHook = usePosts();
    const {commentLoading, postsLoading} = postHook.postsStore;
    const {comment} = postHook.postsStore.postForm;
    const params: {username: string} = useParams();
    const {user} = useUser();
    const checkUser = params.username === user.authUser.username;

    useEffect(() => {
    }, [data])

    return (
        <div className={'post'}>
            <div className={`postInfo`}>
                <p className='poster'>{data.user}</p>
                <p className='date'>{data.date}</p>
            </div>
            <p className='postText'>{data.post}</p>
            <div className="actions">
                {checkUser ? <div onClick={() => {
                    dispatch(selectPost(data))
                    dispatch(ActiveModal('DELETE_POST'))
                }} className="delete">
                    <FontAwesomeIcon icon={faTrash}/>
                </div> : ''}
            </div>
            {postsLoading ? '' :
                data.comments === undefined  ? <div style={{marginTop: '2rem'}}><LoadingSpinner height={60} width={60}/></div> :
                        data.comments.map((value: comment, index: number) => {
                            return (
                                <Comment index={index} key={value.id} data={value}/>
                            )
                        })

            }
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
        </div>
    );
};

export default Post;