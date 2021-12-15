import React, {useEffect} from 'react';
import User from "./components/user";
import Posts from "./components/feedback";
import Projects from "./components/projects";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {userReducer} from "../../redux/user/userSlice";
import {getRequestsThunk, getUserProjectsThunk} from "../../redux/projects/thunks";
import {getCommentsThunk, getPostsThunk} from "../../redux/posts/thunks";
import {useParams} from "react-router-dom";
import {postsLoadingHandler} from "../../redux/posts/postsSlice";
const Profile = () => {

    const params: {username: string} = useParams();
    const {username} = params;
    const userInfo = useAppSelector(userReducer)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(postsLoadingHandler(true))
        async function getData() {
               await dispatch(getUserProjectsThunk(username))
               await dispatch(getRequestsThunk());
               await dispatch(getPostsThunk(username));
               await dispatch(getCommentsThunk(username));
        }
        getData();
    }, [dispatch, username])

    return (
        <div className="profileContent">
            <div className="profileContainer">
                <User data={userInfo}/>
                <Posts/>
                <Projects/>
            </div>
        </div>
    );
};

export default Profile;