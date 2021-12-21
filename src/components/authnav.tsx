import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell, faCog, faSignOutAlt, faUser} from "@fortawesome/free-solid-svg-icons";
import {useAppSelector} from "../redux/hooks";
import {userReducer} from "../redux/user/userSlice";
import { useDetectClickOutside } from 'react-detect-click-outside';
import {useLogin} from "../hooks/useLogin";
import { motion } from 'framer-motion';
import {regularVariants} from "../helpers/framer";
import {NavLink} from "react-router-dom";

const Authnav = () => {

    const userRedux = useAppSelector(userReducer)
    const authUser = userRedux.authUser === undefined ? '' : userRedux.authUser;
    const [open, setOpen] = useState(false);
    const loginHook = useLogin();
    const closeDrop = () => {
        setOpen(false);
    }
    const ref = useDetectClickOutside({ onTriggered: closeDrop});



    return (
        <nav className="authnav">
            <div className="container">
                <div className="side">
                    <h1>Project</h1>
                    <nav>
                        <ul>
                            <li><NavLink to={'/home'}>Home</NavLink></li>
                        </ul>
                    </nav>
                </div>
                <div className="side">
                    <div className="notification">
                        <FontAwesomeIcon className='icon' icon={faBell}/>
                    </div>
                    <div ref={ref} onClick={() => setOpen(!open)} className="profile">
                        <img alt='profile' src={userRedux.authUser.userImage} className='userImage'/>
                        <p>{authUser === undefined ? '' : authUser.username}</p>
                        {open ? <motion.div initial={'hidden'} animate={'active'}
                                            variants={regularVariants}
                                            className={'dropdown'}>
                            <ul>
                                <li>
                                    <NavLink
                                        to={`/profile/${authUser.username}`}
                                    >
                                        <FontAwesomeIcon className='icon' icon={faUser}/>
                                        Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <FontAwesomeIcon className='icon' icon={faCog}/>
                                    Settings
                                </li>
                                <li onClick={() => loginHook.logoutHandler()}>
                                    <FontAwesomeIcon className='icon' icon={faSignOutAlt}/>
                                    Logout
                                </li>
                            </ul>
                        </motion.div> : ''}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Authnav;