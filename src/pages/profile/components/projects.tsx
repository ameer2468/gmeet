import React from 'react';
import Card from "./card";
import {useAppSelector} from "../../../redux/hooks";
import {projectReducer} from "../../../redux/projects/projectSlice";
import LoadingSpinner from "../../../components/global/LoadingSpinner";
import Project from "../../home/components/project";
import { Scrollbars } from 'react-custom-scrollbars';

const Projects = () => {

    const projectStore = useAppSelector(projectReducer)
    const {loading} = projectStore;
    const {userProjects} = projectStore;


    return (
        <Card height={'auto'} customClass='listings' flex={'0 0 100%'}>
            <div className="container">
                <h1>Project Listings</h1>
                {
                    loading ?
                    <div style={{
                        position: 'absolute',
                        left: 0,
                        top: '50%',
                        right: 0,
                        bottom: 0,
                        margin: 'auto',
                        textAlign: 'center',
                    }}>
                        <LoadingSpinner height={60} width={60}/>
                    </div>
                        :
                        userProjects.length === 0 ?
                                <h2 style={{
                                    opacity: '0.2',
                                    fontWeight: 'normal',
                                    color: 'white',
                                    position: 'absolute',
                                    left: 0,
                                    top: '50%',
                                    right: 0,
                                    bottom: 0,
                                    margin: 'auto',
                                    fontSize: '2.2rem',
                                    textAlign: 'center',
                                }}
                                >
                                    No Projects Listed
                                </h2>
                                :
                            <Scrollbars
                                width={'100%'}
                            >
                                <div className="projectsContainer">
                                    {userProjects.map((value) => {
                                        return <Project profile={true} noRequest={true} remove={true} key={value.project_id} data={value}/>
                                    })}
                                </div>
                            </Scrollbars>
                }
            </div>
        </Card>
    );
};

export default Projects;