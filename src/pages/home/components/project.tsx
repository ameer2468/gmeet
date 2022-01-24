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
    const dispatch = useAppDispatch();
    const userHook = useUser();
    const userStore = useAppSelector(userReducer);
    const {username} = userHook.authUser === undefined ? '' : userHook.authUser;
    const {authUser} = userStore;
    const userparams: {username: string} = useParams();
    const {loading} = projectHook.projects;
    const checkUser = userparams.username === username

    return (
       <>
           {loading ? '' :
               <div className='projectCard'>
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
                   <h2>{data.name}</h2>
                   <p>{shortenText(data.description)}</p>

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
                           username !== data.owner && authUser.requests.filter((value: any) => {
                               return value.project_id === data.project_id;
                           }).length === 0  ?
                               <button onClick={() => {
                                   projectHook.toggleJoin(data)
                               }} className='btn btn--transparent'>Request To Join</button>
                               : ''
                       }
                   </div>
               </div>
           }
           </>
    );
};

export default Project;
