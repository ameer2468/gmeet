import React from 'react';
import Card from "./card";
import {usePosts} from "../../../hooks/usePosts";
import TextArea from "../../../components/global/textarea";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComments} from "@fortawesome/free-solid-svg-icons";
import { Scrollbars } from 'react-custom-scrollbars';
import Post from "./post";

const Posts = () => {

    const postHook = usePosts();
    const {posts, postForm} = postHook.postsStore;
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
                    disabled={postLength === 0} onClick={() => postHook.submitPost()}
                    className={`btn btn--green ${postLength === 0 && 'disabledButton'}`}>
                    <FontAwesomeIcon className='commentIcon' icon={faComments}/>
                    Post
                </button>
                {posts.length === 0 ?
                    <h2 className='noPosts'>
                        No posts
                    </h2>
                    :
                   <Scrollbars
                    style={{height: 210}}
                   >
                       <div className="posts">
                           {posts.map((value) => {
                               return (
                               <Post key={value.post_id} data={value}/>
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