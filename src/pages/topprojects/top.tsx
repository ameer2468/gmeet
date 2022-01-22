import React, {useEffect} from 'react';
import {getTopProjectsThunk} from "../../redux/projects/thunks";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {projectReducer} from "../../redux/projects/projectSlice";
import LoadingSpinner from "../../components/global/LoadingSpinner";
import { NavLink } from 'react-router-dom';

const Top = () => {

    const dispatch = useAppDispatch();
    const projectsReducer = useAppSelector(projectReducer);
    const {topProjectsLoading, topProjects} = projectsReducer;

    useEffect(() => {
            dispatch(getTopProjectsThunk())
    }, [dispatch])

    return (
        <div className="TopContent">
            <div className="TopContainer">
                <div className="heading">
                    <h1>Top Projects</h1>
                    <p>These are the top 10 most popular projects based on join requests</p>
                </div>
                {topProjectsLoading ? <div className="center">
                    <LoadingSpinner height={60} width={60}/>
                </div> :
                    <>
                    <div className="titles">
                        <h3>Project Name</h3>
                        <h3>Owner</h3>
                        <h3>Request Count</h3>
                    </div>
                    {topProjects.map((value) => {
                     return (
                         <div key={value.project_id} className="topProject">
                             <p>{value.name}</p>
                             <NavLink to={`/profile/${value.owner}`}>{value.owner}</NavLink>
                             <p>{value.count}</p>
                         </div>
                     )
                 })}
                    </>
                }
            </div>
        </div>
    );
};

export default Top;
