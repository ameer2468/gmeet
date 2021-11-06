import React, {useEffect} from 'react';
import User from "./components/user";
import Feedback from "./components/feedback";
import Projects from "./components/projects";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {userReducer} from "../../redux/user/userSlice";
import {useProject} from "../../hooks/useProject";
import {getProject} from "../../redux/projects/services";
import {projectLoading} from "../../redux/projects/projectSlice";

const Profile = () => {

    const userInfo = useAppSelector(userReducer)
    const projectHook = useProject();
    const {loading} = projectHook.projects;
    const {username} = userInfo.userInfo;
    const dispatch = useAppDispatch();

    useEffect(() => {
        function getData() {
            if (loading) {
               dispatch(getProject(username)).then(() => {
                   dispatch(projectLoading(false))
               })
            }
        }
         getData();
    }, [dispatch, loading, username])

    return (
        <div className="profileContent">
            <div className="profileContainer">
                <User data={userInfo}/>
                <Feedback/>
                <Projects/>
            </div>
        </div>
    );
};

export default Profile;