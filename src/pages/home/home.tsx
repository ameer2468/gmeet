import React from 'react';
import Search from "./components/search";
import Project from "./components/project";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {ActiveModal} from "../../redux/modals/modalSlice";
import {projectReducer} from "../../redux/projects/projectSlice";

const Home = () => {

    const dispatch = useAppDispatch();
    const projectStore = useAppSelector(projectReducer)
    const {projects} = projectStore;

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
                    {projectStore.loading ? '' :  projects.map((value) => {
                            return <Project key={value.id} data={value}/>
                        })}
                </div>
            </div>
        </div>
    );
};

export default Home;