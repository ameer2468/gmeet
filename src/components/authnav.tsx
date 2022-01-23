import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell, faCog, faSignOutAlt, faUser} from "@fortawesome/free-solid-svg-icons";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {userReducer} from "../redux/user/userSlice";
import { useDetectClickOutside } from 'react-detect-click-outside';
import {useLogin} from "../hooks/useLogin";
import { motion } from 'framer-motion';
import {regularVariants} from "../helpers/framer";
import {NavLink} from "react-router-dom";
import placeholder from '../assets/images/placeholder.png'
import LoadingSpinner from "./global/LoadingSpinner";
import Notifications from "./global/notifications";
import {getNotifications} from "../redux/user/thunk";

const Authnav = () => {

    const userRedux = useAppSelector(userReducer)
    const authUser = userRedux.authUser === undefined ? '' : userRedux.authUser;
    const {userImageLoading} = userRedux;
    const [open, setOpen] = useState(false);
    const [openNotifications, setOpenNotifications] = useState(false);
    const loginHook = useLogin();
    const dispatch = useAppDispatch();
    const closeDrop = () => {
        setOpen(false);
    }
    const closeNotification = () => {
        setOpenNotifications(false);
    }
    const ref = useDetectClickOutside({ onTriggered: closeDrop});
    const notifref = useDetectClickOutside({ onTriggered: closeNotification});


    return (
        <nav className="authnav">
            <div className="container">
                <div className="side">
                    <h1>Project</h1>
                    <nav>
                        <ul>
                            <li><NavLink to={'/home'}>Home</NavLink></li>
                            <li><NavLink to={'/top'}>Top Projects</NavLink></li>
                        </ul>
                    </nav>
                </div>
                <div className="side">
                    <div ref={notifref} className="notification">
                            <div className="alert"/>
                            <FontAwesomeIcon onClick={() => {
                                setOpenNotifications(!openNotifications)
                                dispatch(getNotifications(authUser.attributes.sub))
                            }
                            } className='icon' icon={faBell}/>
                            {openNotifications ?
                                <motion.div
                                    initial={'hidden'} animate={'active'}
                                    variants={regularVariants}
                                >
                                    <Notifications/>
                                </motion.div>
                                : ''
                            }
                        </div>
                    <div ref={ref} onClick={() => setOpen(!open)} className="profile">
                        {userImageLoading ? <div style={{marginRight: 15, marginTop: 5}}><LoadingSpinner height={25} width={25}/></div> : <img onError={e => e.currentTarget.src = placeholder} alt='profile' src={authUser.userImage} className='userImage'/>}
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
