import React, {useEffect} from 'react';
import User from "./components/user";
import Posts from "./components/feedback";
import Projects from "./components/projects";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {userReducer} from "../../redux/user/userSlice";
import {getProject} from "../../redux/projects/services";
import {projectLoading, requestsLoading} from "../../redux/projects/projectSlice";
import {getRequestsThunk} from "../../redux/projects/thunks";
const Profile = () => {

    const userInfo = useAppSelector(userReducer)
    const {username} = userInfo.userInfo;
    const dispatch = useAppDispatch();

    useEffect(() => {
        function getData() {
                dispatch(getProject(username)).then(() => {
                    dispatch(projectLoading(false))
                })
                dispatch(requestsLoading(true))
                dispatch(getRequestsThunk());
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