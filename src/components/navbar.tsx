import React from 'react';
import {Link, NavLink} from "react-router-dom";
import {useAppSelector} from "../redux/hooks";
import {userReducer} from "../redux/user/userSlice";

const Navbar = () => {

    const userRedux = useAppSelector(userReducer)
    const {LoggedIn} = userRedux;

    return (
        <nav className='homeNav'>
            <div className="side">
                <h1>Gmeet</h1>
            </div>
         <div className="side">
             <ul>
                 <li><NavLink className='navLink' to={'/'}>About</NavLink></li>
                 <li><NavLink className='navLink' to={'/'}>Our Story</NavLink></li>
                 <li><NavLink className='navLink' to={'/'}>Why</NavLink></li>
                 {LoggedIn ?
                         <Link to={'/home'}><button className='btn btn--green marginRight'>Projects home</button></Link>
                     :
                     <>
                         <Link to={'/register'}><button className='btn btn--green'>Register</button></Link>
                         <Link to={'/login'}><button className='btn btn--white'>Login</button></Link>
                         </>
                 }
             </ul>
         </div>
               <div className="line"/>
        </nav>
    );
};

export default Navbar;
