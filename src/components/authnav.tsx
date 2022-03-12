import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell, faCog, faSignOutAlt, faUser, faCaretDown} from "@fortawesome/free-solid-svg-icons";
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
import {getAssetThunk, getNotifications} from "../redux/user/thunk";
import {imageReducer} from "../redux/image/imageSlice";

const Authnav = () => {

    const userStore = useAppSelector(userReducer);
    const imageStore = useAppSelector(imageReducer);
    const {userImageLoading, notificationLoading} = userStore;
    const authUser = userStore.authUser === undefined ? '' : userStore.authUser;
    const [open, setOpen] = useState(false);
    const [openNotifications, setOpenNotifications] = useState(false);
    const loginHook = useLogin();
    const dispatch = useAppDispatch();
    const closeDrop = () => {
        setOpen(false);
    }
    const [toggleHidden, setToggleHidden] = useState(false);
    const closeNotification = () => {
        setOpenNotifications(false);
    }
    const checkRead = !authUser.notifications ? '' : authUser.notifications.filter((value: any) => {
        return value.read_at === null;
    })
    const ref = useDetectClickOutside({ onTriggered: closeDrop});
    const notifref = useDetectClickOutside({ onTriggered: closeNotification});

    const menuVariant = {
        open: {
            opacity: 1,
        },
        closed: {
            opacity: 0,
        }
    }

    return (
        <nav className="authnav">
            <div className="container">
                <div className="side">
                    <NavLink to={'/home'}><h1>Teamo</h1></NavLink>
                    <nav>
                        <ul className='main-nav'>
                            <li><NavLink to={'/home'}>Home</NavLink></li>
                            <li><NavLink to={'/top'}>Top Projects</NavLink></li>
                            <li><a rel={'noreferrer'} target={'_blank'} href={'https://discord.gg/vYDBeeRNBP'}>Discord</a></li>
                        </ul>
                    </nav>
                </div>
                <div className="side">
                    <div ref={notifref} className="notification">
                        {notificationLoading ? '' : checkRead.length === 0 ? '' : <div className="alert"/> }
                            <FontAwesomeIcon onClick={() => {
                                setOpenNotifications(!openNotifications)
                                dispatch(getNotifications(authUser.attributes.sub))
                            }} className='icon' icon={faBell}/>
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
                        {userImageLoading ? <div style={{marginRight: 15, marginTop: 5}}>
                            <LoadingSpinner height={25} width={25}/></div> :
                            <>
                                {imageStore.userImage !== '' ?
                                    <img style={{width: '3rem', height: '3rem', marginRight: 10, borderRadius: 100}} src={imageStore.userImage} alt={'profile'}/>
                                    :
                                    <img style={{width: '3.5rem', height: '3.5rem'}} key={authUser.userImage} onError={(e) => {
                                        dispatch(getAssetThunk(authUser.username))
                                        e.currentTarget.src = placeholder
                                    }} alt='profile'
                                         src={authUser.userImage} className='userImage'/>
                                }
                            </>
                            }
                        <p>{authUser === undefined ? '' : authUser.username}</p>
                        <FontAwesomeIcon style={{fontSize: '1.5rem', color: 'white', marginLeft: '1rem'}} icon={faCaretDown}/>
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
                                    <NavLink
                                        to={`/editprofile`}
                                    >
                                    <FontAwesomeIcon className='icon' icon={faCog}/>
                                    Settings
                                    </NavLink>
                                </li>
                                <li onClick={() => loginHook.logoutHandler()}>
                                    <FontAwesomeIcon className='icon' icon={faSignOutAlt}/>
                                    Logout
                                </li>
                            </ul>
                        </motion.div> : ''}
                    </div>
                    <div onClick={() => setToggleHidden(!toggleHidden)} className="auth-hidden-menu">
                            <div className={`bar1 ${toggleHidden ? 'bar1active' : ''}`}/>
                            <div className={`bar2 ${toggleHidden ? 'bar2active' : ''}`}/>
                            <div className={`bar3 ${toggleHidden ? 'bar3active' : ''}`}/>
                    </div>
                    <motion.div
                        style={{
                            display: toggleHidden ? 'block' : 'none'
                        }}
                        variants={menuVariant}
                        initial="closed"
                        animate={toggleHidden ? "open" : "closed"}
                        className="auth-hidden-nav">
                        <ul>
                            <li onClick={() => setToggleHidden(!toggleHidden)}><NavLink to={'/home'}>Home</NavLink></li>
                            <li onClick={() => setToggleHidden(!toggleHidden)}><NavLink to={'/top'}>Top Projects</NavLink></li>
                            <li onClick={() => setToggleHidden(!toggleHidden)}><NavLink to={''}>Discord</NavLink></li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </nav>
    );
};

export default Authnav;
