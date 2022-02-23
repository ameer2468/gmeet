import React from 'react';

interface props {
    data: {
        name: string;
        members: [],
        description: string
    }
    noRequest?: boolean;
}

const ProjectCard = ({data}: props) => {


    return (
        <div className='projectCard'>
            <h2>{data.name}</h2>
            <div className="members">
                {data.members.map((value: {image: string}, index: number) => {
                    return (
                        <div key={index.toString()} className="avatar">
                            <img src={value.image} alt="member"/>
                        </div>
                    )
                })}
            </div>
            <p>{data.description}</p>
            <div className="buttons">
                <button className='btn btn--gray'>Project Details</button>
            </div>
        </div>
    );
};

export default ProjectCard;
