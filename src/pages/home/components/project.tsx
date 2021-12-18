import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {useProject} from "../../../hooks/useProject";
import {selectedProject} from "../../../redux/projects/projectSlice";
import {useAppDispatch} from "../../../redux/hooks";
import {useUser} from "../../../hooks/useUser";
import {Link, useParams} from "react-router-dom";

interface props {
    data: any;
    remove?: boolean;
    noRequest?: boolean;
    profile?: boolean;
}

const Project = ({data, remove, noRequest, profile}: props) => {


    const projectHook = useProject();
    const {projectRequests} = projectHook.projects;
    const dispatch = useAppDispatch();
    const userHook = useUser();
    const {username} = userHook.authUser;
    const userparams: {username: string} = useParams();
    const {loading} = projectHook.projects;
    const [checkJoined, setCheckJoined] = useState<any>([]);
    const checkUser = userparams.username === username;


    useEffect(() => {
        const check = projectRequests.filter((value) => {
            return value.user === username && data.project_id === value.project_id;
        })
        setCheckJoined(check)
    }, [loading, data.project_id, projectRequests, username])


    return (
       <>
           {loading ? '' :
               <div className='projectCard'>
                   {!remove ? '' :
                       !checkUser ? '' :
                           <div
                               className="delete"
                               onClick={() => {
                                   projectHook.toggleDelete(data)
                               }}
                           >
                               <FontAwesomeIcon className='icon' icon={faTrash}/>
                           </div>
                   }
                   <h2>{data.name}</h2>
                   <p>{data.description}</p>

                   <div className={'buttons'}>
                       <Link to={`/project/${data.project_id}`}>
                           <button className='btn btn--gray'>Project Details</button>
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
                           userHook.user.userInfo.username !== data.owner && checkJoined.length === 0  ?
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