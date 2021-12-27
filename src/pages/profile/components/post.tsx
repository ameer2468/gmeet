import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComments, faEllipsisH, faPencilAlt, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {useUser} from "../../../hooks/useUser";
import {usePosts} from "../../../hooks/usePosts";
import {comment} from "../../../redux/types";
import LoadingSpinner from "../../../components/global/LoadingSpinner";
import Comment from "./comment";
import {useParams} from "react-router-dom";
import {useDetectClickOutside} from "react-detect-click-outside";
import ActionsMenu from "../../../components/global/ActionsMenu";
import TextArea from "../../../components/global/textarea";
import {BeatLoader} from "react-spinners";


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

    const postHook = usePosts();
    const {commentLoading, postsLoading, editPost, editPostLoading} = postHook.postsStore;
    const {comment, editpost} = postHook.postsStore.postForm;
    const params: {username: string} = useParams();
    const {user} = useUser();
    const checkUser = params.username === user.authUser.username;
    const [show, setShow] = useState(false);
    const closeDrop = () => {
        setShow(false);
    }
    const ref = useDetectClickOutside({ onTriggered: closeDrop});
    const options = [
        {
            icon: faPencilAlt, name: 'Edit Post',
            onClick: () => postHook.editPostHandler(true)},
        {
            icon: faTrashAlt , name: 'Delete Post',
            onClick: () => postHook.deletePostHandler(data.post_id)}
    ]


    useEffect(() => {
    }, [data])


    return (
        <div className={'post'}>
            <div className={`postInfo`}>
                <p className='poster'>{data.user}</p>
                <div className="side">
                    <p className='date'>{data.date}</p>
                    {checkUser ?
                    <div ref={ref} onClick={() => setShow(!show)} className="comment-menu">
                        <ActionsMenu show={show} options={options}/>
                        <FontAwesomeIcon className='icon' icon={faEllipsisH}/>
                    </div> : '' }
                </div>
            </div>
            {editPost ?
                <>
                <TextArea
                    maxWidth={'100%'}
                    placeholder={data.post}
                    value={editpost}
                    maxLength={200}
                    useHook={postHook}
                    height={'7rem'}
                    name={'editpost'}
                />
                <button
                    className={`btn btn--green ${editpost.length === 0 && 'disabledButton'}`}
                    disabled={editpost.length === 0}
                    onClick={() => postHook.submitEditPost(data.post_id)}
                >
                    {editPostLoading ? <BeatLoader size={8} margin={1} color={'#2a2c3d'} /> : 'Confirm' }
                </button>
                 <button
                     onClick={() => postHook.editPostHandler(false)}
                     style={{marginLeft: '2rem'}}
                     className='btn btn--transparent'>Cancel
                 </button>
                </>
                :
                <p className='postText'>{data.post}</p>
            }
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
                        <p><FontAwesomeIcon className='commentIcon' icon={faComments}/>Comment</p>}
                </button>
            </div>
        </div>
    );
};

export default Post;
