import React from 'react';
import Card from "./card";
import {usePosts} from "../../../hooks/usePosts";
import TextArea from "../../../components/global/textarea";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComments, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useUser} from "../../../hooks/useUser";
import { Scrollbars } from 'react-custom-scrollbars';

const Posts = () => {

    const postHook = usePosts();
    const {posts, postForm} = postHook.postsStore;
    const userHook = useUser();
    const postLength = postForm.post.length;

    return (
        <Card height={'auto'} customClass='feedback' flex={'0 0 59%'}>
            <div className="profilePosts">
                <h1>Profile Posts</h1>
               <TextArea
               useHook={postHook}
               height={'10rem'}
               name={'post'}
               value={postForm.post}
               maxLength={200}
               placeholder='Write a post...'
               maxWidth={'90rem'}
               />
                <button
                    style={{backgroundColor: postLength === 0 ? 'gray' : ''}}
                    disabled={postLength === 0} onClick={() => postHook.submitPost()} className='btn btn--green'>
                    <FontAwesomeIcon className='commentIcon' icon={faComments}/>
                    Post
                </button>
                {posts.length === 0 ?
                    <h2 className='noPosts'>
                        No posts
                    </h2>
                    :
                   <Scrollbars
                    style={{height: 200}}
                   >
                       <div className="posts">
                           {posts.map((value) => {
                               return (
                                   <div className={'post'}>
                                       <p className='poster'>{userHook.userInfo.username}</p>
                                       <p className='postText'>{value.post}</p>
                                       <div className="actions">
                                           <div onClick={() => {
                                               postHook.deletePostHandler(value.post_id)
                                           }} className="delete">
                                               <FontAwesomeIcon icon={faTrash}/>
                                           </div>
                                       </div>
                                   </div>
                               )
                           })}
                       </div>
                   </Scrollbars>
                }
            </div>
        </Card>
    );
};

export default Posts;