import React, {useEffect} from 'react';
import Card from "./card";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {projectLoading, projectReducer, projectRequests, requestsLoading} from "../../../redux/projects/projectSlice";
import LoadingSpinner from "../../../components/global/LoadingSpinner";
import Project from "../../home/components/project";
import { Scrollbars } from 'react-custom-scrollbars';
import {userReducer} from "../../../redux/user/userSlice";
import {getProject, getRequests} from "../../../redux/projects/services";

const Projects = () => {

    const projectStore = useAppSelector(projectReducer)
    const {loading} = projectStore;
    const userInfo = useAppSelector(userReducer)
    const {userProjects} = projectStore;
    const {username} = userInfo.userInfo;
    const dispatch = useAppDispatch();


    useEffect(() => {
        function getData() {
            if (loading) {
                dispatch(getProject(username)).then(() => {
                    dispatch(projectLoading(false))
                })
                dispatch(requestsLoading(true))
                dispatch(getRequests()).then((res) => {
                    const {payload} = res;
                    dispatch(requestsLoading(false))
                    dispatch(projectRequests(payload))
                })
            }
        }
        getData();
    }, [dispatch, loading, username])

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