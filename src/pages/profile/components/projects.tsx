import React from 'react';
import Card from "./card";
import {projectsArr} from "../../../fakedata";
import ProjectCard from "./projectCard";

const Projects = () => {
    return (
        <Card height={'auto'} customClass='listings' flex={'0 0 100%'}>
            <div className="container">
                <h1>Project Listings</h1>
                {projectsArr.map((value, index: number) => {
                    return <ProjectCard key={index.toString()} data={value}/>
                })}
            </div>
        </Card>
    );
};

export default Projects;