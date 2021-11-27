import React, {useEffect} from 'react';
import User from "./components/user";
import Feedback from "./components/feedback";
import Projects from "./components/projects";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {userReducer} from "../../redux/user/userSlice";
import {getProject, getRequests} from "../../redux/projects/services";
import {projectLoading, projectRequests, requestsLoading} from "../../redux/projects/projectSlice";
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
                dispatch(getRequests()).then((res) => {
                    const {payload} = res;
                    dispatch(requestsLoading(false))
                    dispatch(projectRequests(payload))
                })
        }
        getData();
    }, [dispatch, username])

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