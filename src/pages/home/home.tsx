import React, {useEffect} from 'react';
import Search from "./components/search";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {projectLoading, projectReducer} from "../../redux/projects/projectSlice";
import LoadingSpinner from "../../components/global/LoadingSpinner";
import Project from "./components/project";
import {useProject} from "../../hooks/useProject";
import {useDebounce} from "use-debounce";
import {getProjectsThunk, getRequestsThunk} from "../../redux/projects/thunks";
import {useUser} from "../../hooks/useUser";

const Home = () => {

    const dispatch = useAppDispatch();
    const projectStore = useAppSelector(projectReducer)
    const {projects} = projectStore;
    const projectHook = useProject();
    const {projectForm} = projectHook.projects;
    const userHook = useUser();
    const {username} = userHook.user.userInfo;
    const [value] = useDebounce(projectForm.searchterm, 500);

    /*Requests to Load App*/

    useEffect(() => {
        dispatch(projectLoading(true))
        const getProjectsData = async () => {
           if (value.length > 0 || value.length === 0) {
               await dispatch(getProjectsThunk(value))
               dispatch(getRequestsThunk());
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
                        {projectStore.loading || projectStore.requestsLoading ? <div className="center">
                                <LoadingSpinner height={60} width={60}/>
                            </div> :
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
