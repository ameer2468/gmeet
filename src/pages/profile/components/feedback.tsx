import React from 'react';
import Card from "./card";
import {usePosts} from "../../../hooks/usePosts";
import TextArea from "../../../components/global/textarea";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComments} from "@fortawesome/free-solid-svg-icons";
import { Scrollbars } from 'react-custom-scrollbars';
import Post from "./post";
import LoadingSpinner from "../../../components/global/LoadingSpinner";
import BeatLoader from "react-spinners/BeatLoader";
import {useParams} from "react-router-dom";
import {useUser} from "../../../hooks/useUser";

const Posts = () => {

    const postHook = usePosts();
    const {posts, postForm, postsLoading, addPostLoading} = postHook.postsStore;
    const postLength = postForm.post.length;
    const params: {username: string} = useParams();
    const {user} = useUser();
    const checkUser = params.username === user.authUser.username;

    return (
        <Card height={'auto'} customClass='feedback' flex={'0 0 59%'}>
            <div className="profilePosts">
                <h1>Profile Posts</h1>
                {!checkUser ? '' :
                    <div className="createPost">
                        <TextArea
                            useHook={postHook}
                            height={'7rem'}
                            name={'post'}
                            value={postForm.post}
                            maxLength={200}
                            placeholder='Write a post...'
                            maxWidth={'62rem'}
                        />
                        <button
                            disabled={postLength === 0} onClick={() => postHook.submitPost()}
                            className={`btn btn--green ${postsLoading ? 'btn btn--green' : postLength === 0 && 'disabledButton'}`}>
                            {postsLoading || addPostLoading ?
                                <BeatLoader size={8} margin={1} color={'#2a2c3d'} /> :
                                <p> <FontAwesomeIcon className='commentIcon' icon={faComments}/>Post</p>
                            }
                        </button>
                    </div>
                }
                   <Scrollbars
                    style={{height: !checkUser ? 350 : 280, marginTop: '2rem'}}
                   >
                       {postsLoading ?
                           <div style={{
                               position: 'absolute',
                               left: 0,
                               top: '40%',
                               right: 0,
                               bottom: 0,
                               margin: 'auto',
                               textAlign: 'center',
                           }}>
                               <LoadingSpinner height={60} width={60}/>
                           </div> :
                           posts.length === 0 ?
                               <h2 className='noPosts'>
                                   No posts
                               </h2>
                       :
                           <div className="posts">
                               {posts.map((value) => {
                                   return (
                                       <Post key={value.post_id} data={value}/>
                                   )
                               })}
                           </div>
                       }
                   </Scrollbars>
            </div>
        </Card>
    );
};

export default Posts;
