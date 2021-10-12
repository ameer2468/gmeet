import React from 'react';
import {NavLink} from "react-router-dom";

const Navbar = () => {

    return (
        <nav className='homeNav'>
            <div className="side">
                <h1>Project</h1>
            </div>
         <div className="side">
             <ul>
                 <li><NavLink to={'/'}>About</NavLink></li>
                 <li><NavLink to={'/'}>Our Story</NavLink></li>
                 <li><NavLink to={'/'}>Why</NavLink></li>
             </ul>
         </div>
               <div className="line"/>
        </nav>
    );
};

export default Navbar;