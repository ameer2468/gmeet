import React from 'react';
import underline from "../../../assets/images/underline.png";
import {NavLink} from "react-router-dom";

const Header = () => {

    const underStyleOne = {
        backgroundImage: `url(${underline})`,
        width: '21rem',
        height: '0.5rem',
        top: '5.7rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: '-1',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        position: 'absolute' as 'absolute',
    }

    const underStyleTwo = {
        backgroundImage: `url(${underline})`,
        width: '26rem',
        height: '0.5rem',
        top: '5.7rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: '-1',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        position: 'absolute' as 'absolute',
    }

    const underStyleThree = {
        backgroundImage: `url(${underline})`,
        width: '13rem',
        height: '0.5rem',
        top: '5.7rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: '-1',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        position: 'absolute' as 'absolute',
    }


    return (
        <section className="header">
            <div/>
            <div className="container">
                <h1>Connect & Meet other designers & developers</h1>
                <p>A community built for designers & developers to communicate with other like-minds. We aim to connect you with like-minded people so you can collaborate on projects and perhaps even build your own team! all through our platform to make meeting other designers easier and more productice.</p>
                <div style={{margin: '2rem auto 0 auto', width: '100%', display: 'flex', justifyContent: 'space-evenly'}} className="home-buttons">
                    <NavLink style={{width: '17rem', textAlign: 'center'}} to={'/register'}><button className='btn btn--green'>Register</button></NavLink>
                    <NavLink style={{width: '17rem', textAlign: 'center'}} to={'/login'}><button className='btn btn--white'>Login</button></NavLink>
                </div>
                <div className="cards">
                    <div className="card">
                        <h2>Create Projects</h2>
                        <div style={underStyleOne} className="underline"/>
                        <p>Create projects that are publicly listed and allow people to join. Your projects can have a criteria and a required skillset so you can find and meet qualified people much easier instead of manually searching. </p>
                    </div>
                    <div className="card">
                        <h2>Friendly Experience</h2>
                        <div style={underStyleTwo} className="underline"/>
                        <p>Our user interface allows you to have an enjoyable experience throughout our platform. Finding people, managing your account, and all the features within an easy to use system.</p>
                    </div>
                    <div className="card">
                        <h2>Connect</h2>
                        <div style={underStyleThree} className="underline"/>
                        <p>Our platform offers you ot meet other designers through a public listing. You can filter people through their skillsets so you can find the right people for your project, and message them.</p>
                    </div>
                </div>
                <p style={{margin: '3.5% auto 2rem auto'}}>Built By <a rel="noreferrer" target={'_blank'} style={{color: '#d9ff50'}} href="http://www.aashhab.design">Ameer Ashhab</a></p>
            </div>
        </section>
    );
};

export default Header;
