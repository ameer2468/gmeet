import React from 'react';

const About = () => {

    const textStyle = {
        fontSize: '1.5rem',
        lineHeight: '2.8rem'
    }

    return (
        <div className="infoPage">
            <div className="container">
             <div style={{width: '45%'}} className="box">
             <h1 style={{marginBottom: '1rem'}}>About</h1>
             <p style={textStyle}>The idea of this project is to connect designers and developers together by creating and sharing a project post,
             where people would then request to join that project, thereby building a team at no cost. So you can look at this
              as a way to establish side projects, which you would work on during your free time with other people. The point is to connect people of design and engineering professions together, because, at least from my experience,
             the creator, i find it hard to meet like-minded people. So the existence of this project is an attempt
             to remedy that problem. There is no guarantee that this attempt will succeed or not, at the end of the day,
             you, the users will determine the success by utilizing this platform, if you choose to do so.</p>
              </div>
            </div>
        </div>
    );
};

export default About;
