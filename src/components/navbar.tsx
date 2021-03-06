import React, {useState} from 'react';
import {Link, NavLink} from "react-router-dom";
import {useAppSelector} from "../redux/hooks";
import {userReducer} from "../redux/user/userSlice";
import {motion} from "framer-motion";

const Navbar = () => {

    const userRedux = useAppSelector(userReducer)
    const {LoggedIn} = userRedux;
    const [toggleHidden, setToggleHidden] = useState(false);

    const menuVariant = {
        open: {
            opacity: 1,
        },
        closed: {
            opacity: 0,
        }
    }

    return (
        <nav className='homeNav'>
            <div style={{display: 'flex', alignItems: 'center'}} className="side">
                <NavLink to={'/'}><h1>Teamo</h1></NavLink>
                <li><NavLink className='navLink' to={'/about'}>About</NavLink></li>
            </div>
            <div onClick={() => setToggleHidden(!toggleHidden)} className="toggleHidden">
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
             className="hidden-menu">
             <ul>
                 <li><NavLink className='navLink' to={'/'}>About</NavLink></li>
                 {LoggedIn ?
                     <Link to={'/home'}><button className='btn btn--green marginRight'>Projects home</button></Link>
                     :
                     <>
                         <Link to={'/register'}><button className='btn btn--green'>Register</button></Link>
                         <Link to={'/login'}><button className='btn btn--white'>Login</button></Link>
                     </>
                 }
             </ul>
         </motion.div>
         <div className="side">
             <ul>
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
