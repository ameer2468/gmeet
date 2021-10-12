import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell, faCog, faSignOutAlt, faUser} from "@fortawesome/free-solid-svg-icons";
import {PhotoPlaceholder} from "react-placeholder-image";
import {useAppSelector} from "../redux/hooks";
import {userReducer} from "../redux/user/userSlice";
import { useDetectClickOutside } from 'react-detect-click-outside';
import {useLogin} from "../hooks/useLogin";
import { motion } from 'framer-motion';
import {regularVariants} from "../helpers/framer";

const Authnav = () => {

    const userRedux = useAppSelector(userReducer)
    const {username} = userRedux.userInfo;
    const [open, setOpen] = useState(false);
    const loginHook = useLogin();
    const closeDrop = () => {
        setOpen(false);
    }
    const ref = useDetectClickOutside({ onTriggered: closeDrop});

    return (
        <nav className="authnav">
            <div className="container">
                <h1>Project</h1>
                <div className="side">
                    <div className="notification">
                        <FontAwesomeIcon className='icon' icon={faBell}/>
                    </div>
                    <div ref={ref} onClick={() => setOpen(!open)} className="profile">
                        <PhotoPlaceholder className='userImage' width={40} height={40} />
                        <p>{username}</p>
                        {open ? <motion.div initial={'hidden'} animate={'active'}
                                            variants={regularVariants}
                                            className={'dropdown'}>
                            <ul>
                                <li>
                                    <FontAwesomeIcon className='icon' icon={faUser}/>
                                    Profile
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