import React from 'react';
import placeholder from "../../../assets/images/placeholder.png";
import {NavLink} from "react-router-dom";

interface props {
    projectDetails:  {
        name: string;
        owner: string;
        userImage: string;
        description: string;
    }
}

const PostInfo = ({projectDetails}: props) => {

    return (
        <div className="article">
            <header>
                <h1>{projectDetails.name}</h1>
                <div className="user">
                    <h3>Posted by:</h3>
                    <img onError={e => e.currentTarget.src = placeholder} src={projectDetails.userImage} alt='user'/>
                    <NavLink to={`/profile/${projectDetails.owner}`}>
                        <h3 className='username'><b>{projectDetails.owner}</b></h3>
                    </NavLink>
                </div>
            </header>
            <div className="content">
                <p className='article-text'>{projectDetails.description}</p>
            </div>
        </div>
    );
};

export default PostInfo;
