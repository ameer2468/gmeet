import React from 'react';
import Search from "./components/search";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {ActiveModal} from "../../redux/modals/modalSlice";
import {projectLoading, projectReducer} from "../../redux/projects/projectSlice";
import LoadingSpinner from "../../components/global/LoadingSpinner";
import Project from "./components/project";

const Home = () => {

    const dispatch = useAppDispatch();
    const projectStore = useAppSelector(projectReducer)
    const {projects} = projectStore;

    console.log(projectStore)

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
                        {projectStore.loading ? <div className="center">
                                <LoadingSpinner height={60} width={60}/>
                            </div> :
                           projects.map((value) => {
                                return <Project remove={false} key={value.id} data={value}/>
                            })
                        }
                    </div>
            </div>
        </div>
    );
};

export default Home;