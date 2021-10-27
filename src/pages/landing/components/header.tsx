import React from 'react';
import bg from '../../../assets/images/bg.png'

const Header = () => {

    const bgStyle = {
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        position: 'absolute' as 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
    }

    return (
        <section className="header">
            <div style={bgStyle}/>
            <div className="container">
                <h1>Connect & Meet other designers & developers</h1>
                <p>A community built for designers to communicate with other designers. Gmeet aims to connect you with like-minded people so you can collaborate on projects and perhaps even build your own team! all through our platform to make meeting other designers easier and more productice.</p>
                <div className="cards">
                    <div className="card">
                        <h2>Create Projects</h2>
                        <p>Create projects that are publicly listed and allow people to join. Your projects can have a criteria and a required skillset so you can find and meet qualified people much easier instead of manually searching. </p>
                    </div>
                    <div className="card">
                        <h2>Friendly Experience</h2>
                        <p>Our user interface allows you to have an enjoyable experience throughout our platform. Finding people, managing your account, and all the features within an easy to use system.</p>
                    </div>
                    <div className="card">
                        <h2>Connect</h2>
                        <p>Our platform offers you ot meet other designers through a public listing. You can filter people through their skillsets so you can find the right people for your project, and message them.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Header;