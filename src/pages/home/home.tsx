import React, {useEffect} from 'react';
import Search from "./components/search";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {ActiveModal} from "../../redux/modals/modalSlice";
import {projectReducer} from "../../redux/projects/projectSlice";
import LoadingSpinner from "../../components/global/LoadingSpinner";
import Project from "./components/project";
import {useProject} from "../../hooks/useProject";
import {useDebounce} from "use-debounce";
import {getProjects} from "../../redux/projects/services";

const Home = () => {

    const dispatch = useAppDispatch();
    const projectStore = useAppSelector(projectReducer)
    const {projects} = projectStore;
    const projectHook = useProject();
    const {projectForm} = projectHook.projects;
    const [value] = useDebounce(projectForm.searchterm, 1000);

    /*Requests to Load App*/

    useEffect(() => {
        const getProjectsData = async () => {
           if (value.length > 0 || value.length === 0) {
               await dispatch(getProjects(value))
            }
        }
            getProjectsData();
    }, [value, dispatch])


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
                                return <Project remove={false} key={value.project_id} data={value}/>
                            })
                        }
                    </div>
            </div>
        </div>
    );
};

export default Home;