import React from 'react';
import {NavLink} from "react-router-dom";
import {Auth} from "aws-amplify";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {userDetails, status, userReducer} from "../redux/user/userSlice";

const Navbar = () => {

    const dispatch = useAppDispatch();
    const userRedux = useAppSelector(userReducer)
    const {LoggedIn} = userRedux.userStore;

    const logoutHandler = () => {
        Auth.signOut().then(() => {
            dispatch(userDetails({}))
            dispatch(status(false));
        })
    }

    return (
        <nav>
            <div className="side">
                <h1>Gmeet</h1>
            </div>
         <div className="side">
             <ul>
                 <li><NavLink to={'/'}>About</NavLink></li>
                 <li><NavLink to={'/'}>Our Story</NavLink></li>
                 <li><NavLink to={'/'}>Why</NavLink></li>
                 {LoggedIn ? <button onClick={() => logoutHandler()} className='btn btn--pink'>Logout</button> : ''}
             </ul>
         </div>
               <div className="line"/>
        </nav>
    );
};

export default Navbar;