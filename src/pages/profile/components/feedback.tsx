import React from 'react';
import Card from "./card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar, faUserFriends, faEye} from "@fortawesome/free-solid-svg-icons";

const Feedback = () => {
    return (
        <Card height={'auto'} customClass='feedback' flex={'0 0 59%'}>
            <div className="info">
                <div className="box">
                    <FontAwesomeIcon icon={faStar} className='icon'/>
                    <h1>0</h1>
                    <h2>Stars</h2>
                </div>
                <div className="box">
                    <FontAwesomeIcon icon={faEye} className='icon'/>
                    <h1>0</h1>
                    <h2>Profile Views</h2>
                </div>
                <div className="box">
                    <FontAwesomeIcon icon={faUserFriends} className='icon'/>
                    <h1>0</h1>
                    <h2>Followers</h2>
                </div>
            </div>
        </Card>
    );
};

export default Feedback;