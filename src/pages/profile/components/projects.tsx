import React from 'react';
import Card from "./card";
import {useAppSelector} from "../../../redux/hooks";
import {projectReducer} from "../../../redux/projects/projectSlice";
import LoadingSpinner from "../../../components/global/LoadingSpinner";
import Project from "../../home/components/project";

const Projects = () => {

    const projectStore = useAppSelector(projectReducer)
    const {projects} = projectStore;

    return (
        <Card height={'auto'} customClass='listings' flex={'0 0 100%'}>
            <div className="container">
                <h1>Project Listings</h1>
                {projectStore.loading ?  <LoadingSpinner height={60} width={60}/>
                        :
                        projects.map((value) => {
                        return <Project remove={true} key={value.id} data={value}/>
                    })}
            </div>
        </Card>
    );
};

export default Projects;