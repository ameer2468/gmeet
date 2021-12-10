import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {useUser} from "../../../hooks/useUser";
import {ActiveModal} from "../../../redux/modals/modalSlice";
import {useAppDispatch} from "../../../redux/hooks";
import {selectPost} from "../../../redux/posts/postsSlice";
import TextArea from "../../../components/global/textarea";
import {usePosts} from "../../../hooks/usePosts";


interface props {
    data: {
        post: string;
        post_id: string;
        date: string;
    }
}

const Post = ({data}: props) => {

    const userHook = useUser();
    const dispatch = useAppDispatch();
    const postHook = usePosts();

    return (
        <div className={'post'}>
            <div className="leaveComment">
                <TextArea
                    maxWidth={'100%'}
                    placeholder={'Leave a comment...'}
                    useHook={postHook}
                    height={'7rem'}
                    name={'comment'}/>
            </div>
            <div className="postInfo">
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
            {/*<div className="comments">*/}
            {/*    <div className="comment">*/}
            {/*        <div className="commentInfo">*/}
            {/*            <p className='poster'>{'Test'}</p>*/}
            {/*            <p className='date'>{data.date}</p>*/}
            {/*        </div>*/}
            {/*        <p>Wow that is awesome</p>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
};

export default Post;