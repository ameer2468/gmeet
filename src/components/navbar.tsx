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
            <div className="side">
                <h1>Gmeet</h1>
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
         </motion.div>
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
