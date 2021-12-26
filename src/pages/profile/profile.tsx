import React, {useEffect} from 'react';
import User from "./components/user";
import Posts from "./components/feedback";
import Projects from "./components/projects";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {loading, userReducer} from "../../redux/user/userSlice";
import {useParams} from "react-router-dom";
import {getAllUserData} from "../../redux/user/thunk";
import {postsLoadingHandler} from "../../redux/posts/postsSlice";
const Profile = () => {

    const params: {username: string} = useParams();
    const {username} = params;
    const userStore = useAppSelector(userReducer)
    const dispatch = useAppDispatch();

    useEffect(() => {
            dispatch(postsLoadingHandler(true))
            dispatch(loading(true))
            dispatch(getAllUserData(username))
    }, [dispatch, username])

    return (
        <div className="profileContent">
            <div className="profileContainer">
                <User data={userStore.userInfo}/>
                <Posts/>
                <Projects/>
            </div>
        </div>
    );
};

export default Profile;
