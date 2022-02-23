import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {getProjectDetails} from "../../redux/projects/thunks";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {projectReducer} from "../../redux/projects/projectSlice";
import LoadingSpinner from "../../components/global/LoadingSpinner";
import PostInfo from "./components/postInfo";

const ProjectDetails = () => {

    const params: {name: string} = useParams();
    const dispatch = useAppDispatch();
    const projectsState = useAppSelector(projectReducer);

    useEffect(() => {
       dispatch(getProjectDetails(params.name))
    }, [dispatch, params.name])

    const {projectDetails, projectDetailsLoading} = projectsState;

    return (
        <div className="detailsContent">
            {projectDetailsLoading || projectDetails === undefined ?  <div className='center'>
                    <LoadingSpinner height={60} width={60}/>
                </div>:
                <div className="detailsContainer">
                    <PostInfo projectDetails={projectDetails}/>
                </div>
            }
        </div>
    );
};

export default ProjectDetails;
