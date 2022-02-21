import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faPencilAlt} from "@fortawesome/free-solid-svg-icons";
import {useProject} from "../../../hooks/useProject";
import {selectedProject} from "../../../redux/projects/projectSlice";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {useUser} from "../../../hooks/useUser";
import {Link, useParams} from "react-router-dom";
import {shortenText} from "../../../helpers/substring";
import {userReducer} from "../../../redux/user/userSlice";

interface props {
    data: any;
    remove?: boolean;
    noRequest?: boolean;
    profile?: boolean;
}

const Project = ({data, remove, noRequest}: props) => {


    const projectHook = useProject();
    const {projects} = projectHook;
    const {requestsLoading} = projects;
    const dispatch = useAppDispatch();
    const userHook = useUser();
    const userStore = useAppSelector(userReducer);
    const {username} = userHook.authUser === undefined ? '' : userHook.authUser;
    const {authUser} = userStore;
    const userparams: {username: string} = useParams();
    const {loading} = projectHook.projects;
    const checkUser = userparams.username === username

    const background = {
        position: 'absolute' as 'absolute',
        width: '100%',
        height: '100%',
        backgroundSize:'cover',
        backgroundImage: `url(${data.image})`,
        zIndex: '-1',
        opacity: '0.1',
        left: '0',
        top: '0'
    }

    const linearBg = {
        position: 'absolute' as 'absolute',
        background: 'linear-gradient(0deg, rgba(31,31,31,1) 0%, rgba(9,9,121,0) 100%)',
        width: '100%',
        height: '100%',
        zIndex: '0',
        left: '0',
        top: '0'
    }

    return (
       <>
           {loading || requestsLoading ? '' :
               <div style={{position: 'relative'}} className='projectCard'>
                   {!remove ? '' :
                       !checkUser ? '' :
                           <>
                           <div onClick={() => {
                               projectHook.toggleEditProject(data)
                           }
                           } className="edit">
                               <FontAwesomeIcon className={'icon'} icon={faPencilAlt}/>
                           </div>
                           <div
                               className="delete"
                               onClick={() => {
                                   projectHook.toggleDelete(data)
                               }}
                           >
                               <FontAwesomeIcon className='icon' icon={faTrash}/>
                           </div>
                           </>
                   }
                   <div style={linearBg}/>
                   <div style={background}/>
                   <h2>{data.name}</h2>
                   <p>{shortenText(data.description, 250)}</p>

                   <div className={'buttons'}>
                       <Link to={`/project/${data.name}`}>
                           <button className='btn btn--green'>Project Details</button>
                       </Link>
                       {noRequest ?
                           !checkUser ? '' :
                               <button
                                   onClick={() => {
                                       projectHook.toggleRequests('REQUESTS')
                                       dispatch(selectedProject(data))
                                   }
                                   }
                                   className='btn btn--transparent'>
                                   Join requests
                               </button>
                           :
                            username !== data.owner && requestsLoading ? '' :
                                !authUser.requests ? '' : authUser.requests.map((value: any) => {
                                    return value.project_id
                                }).includes(data.project_id) || data.owner === authUser.username ?
                                    '' :
                               <button onClick={() => {
                                   projectHook.toggleJoin(data)
                               }} className='btn btn--transparent'>Request To Join</button>
                       }
                   </div>
               </div>
           }
           </>
    );
};

export default Project;
