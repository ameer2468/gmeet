import React, {useEffect} from 'react';
import Search from "./components/search";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {projectReducer} from "../../redux/projects/projectSlice";
import Project from "./components/project";
import {useProject} from "../../hooks/useProject";
import {useDebounce} from "use-debounce";
import {getProjectsThunk} from "../../redux/projects/thunks";
import {useUser} from "../../hooks/useUser";
import {getAssetThunk} from "../../redux/user/thunk";
import ProjectCardLoader from "../../components/global/placeholders/projectCard";

const Home = () => {

    const dispatch = useAppDispatch();
    const projectStore = useAppSelector(projectReducer)
    const {projects} = projectStore;
    const projectHook = useProject();
    const {projectForm} = projectHook.projects;
    const userHook = useUser();
    const {username} = userHook.authUser;
    const [value] = useDebounce(projectForm.searchterm, 500);

    /*Requests to Load App*/

    useEffect(() => {
        dispatch(getAssetThunk(username))
        const getProjectsData = () => {
           if (value.length > 0 || value.length === 0) {
               dispatch(getProjectsThunk(value))
            }
        }
        getProjectsData();
    }, [dispatch, value, username])


    return (
        <div className='HomeContent'>
            <div className="homeContainer">
                <div className="flex">
                    <Search/>
                    <button
                        className='btn btn--green'
                        onClick={() => {
                           projectHook.toggleCreateProject()
                        }}
                    >
                        + Add Project
                    </button>
                </div>
                    <div className="projectsContainer">
                        {projectStore.loading || projectStore.requestsLoading ?
                            <div style={{display: 'flex', justifyContent: "center", position: 'relative', top: '-10rem'}}>
                                {Array.from(Array(projects.length > 8 ? 8 : projects.length).keys()).map(i => (
                                    <ProjectCardLoader key={i}/>
                                ))}
                            </div>
                            :
                           projects.map((value) => {
                                return <Project remove={false} profile={false} key={value.project_id} data={value}/>
                            })
                        }
                    </div>
            </div>
        </div>
    );
};

export default Home;
