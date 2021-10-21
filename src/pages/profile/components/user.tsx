import React from 'react';
import {PhotoPlaceholder} from "react-placeholder-image";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGlobe, faEdit} from "@fortawesome/free-solid-svg-icons";
import Card from "./card";

interface props {
    data: any;
}

const User = ({data}: props) => {

    return (
                <Card height={'auto'} flex={'0 0 40%'} customClass={'user'}>
                    <div className="info">
                        <div className="wrap">
                            <PhotoPlaceholder className='userImage' width={100} height={100} />
                            <div className="titles">
                                <h1>{data.userInfo.username}</h1>
                                <h2>
                                    {data.userInfo.attributes['custom:profession'] === undefined ? '' : data.userInfo.attributes['custom:profession']}
                                </h2>
                            </div>
                            <div className="website">
                                <FontAwesomeIcon className='icon' icon={faGlobe}/>
                                <a rel='noreferrer' target={'_blank'} href="http://www.aashhab.design">www.aashhab.design</a>
                            </div>
                            <button style={{marginTop: '2rem'}} className='btn btn--green'>
                                <FontAwesomeIcon style={{marginRight: '0.5rem'}} icon={faEdit}/>
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </Card>
    );
};

export default User;