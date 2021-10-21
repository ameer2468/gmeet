import React from 'react';
import User from "./components/user";
import Feedback from "./components/feedback";
import Projects from "./components/projects";
import {useAppSelector} from "../../redux/hooks";
import {userReducer} from "../../redux/user/userSlice";

const Profile = () => {

    const userInfo = useAppSelector(userReducer)

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