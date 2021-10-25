import React, {useEffect} from 'react';
import Search from "./components/search";
import Project from "./components/project";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {ActiveModal} from "../../redux/modals/modalSlice";
import {projectReducer} from "../../redux/projects/projectSlice";
import {data} from "../../redux/projects/projectSlice";

const Home = () => {

    const dispatch = useAppDispatch();
    const projectStore = useAppSelector(projectReducer)
    const {projects} = projectStore;

    useEffect(() => {
        dispatch(data());
    }, [dispatch])

    console.log(projects)


    return (
        <div className='HomeContent'>
            <div className="homeContainer">
                <div className="flex">
                    <Search/>
                    <button
                        className='btn btn--green'
                        onClick={() => {
                            dispatch(ActiveModal('ADD_PROJECT'))
                        }}
                    >
                        + Add Project
                    </button>
                </div>
                <div className="projectsContainer">
                    {projects.map((value, index) => {
                        return <Project key={index.toString()} data={value}/>
                    })}
                </div>
            </div>
        </div>
    );
};

export default Home;