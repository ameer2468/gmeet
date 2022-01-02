import React from 'react';
import placeholder from "../../../assets/images/placeholder.png";
import {NavLink} from "react-router-dom";

interface props {
    projectDetails: any;
}

const PostInfo = ({projectDetails}: props) => {
    return (
        <div className="article">
            <header>
                <h1>{projectDetails.project.name}</h1>
                <div className="user">
                    <h3>Posted by:</h3>
                    <img onError={e => e.currentTarget.src = placeholder} src={projectDetails.userImage} alt='user'/>
                    <NavLink to={`/profile/${projectDetails.project.owner}`}>
                        <h3 className='username'><b>{projectDetails.project.owner}</b></h3>
                    </NavLink>
                </div>
            </header>
            <p className='article-text'>{projectDetails.project.description}</p>
        </div>
    );
};

export default PostInfo;