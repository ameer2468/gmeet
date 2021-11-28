import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {useUser} from "../../../hooks/useUser";
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
    const postHook = usePosts();

    return (
        <div className={'post'}>
            <div className="postInfo">
                <p className='poster'>{userHook.userInfo.username}</p>
                <p className='date'>{data.date}</p>
            </div>
            <p className='postText'>{data.post}</p>
            <div className="actions">
                <div onClick={() => {
                    postHook.deletePostHandler(data.post_id)
                }} className="delete">
                    <FontAwesomeIcon icon={faTrash}/>
                </div>
            </div>
        </div>
    );
};

export default Post;