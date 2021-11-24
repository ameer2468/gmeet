import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {useProject} from "../../../hooks/useProject";
import {selectedProject} from "../../../redux/projects/projectSlice";
import {useAppDispatch} from "../../../redux/hooks";
import {useUser} from "../../../hooks/useUser";
import {Link} from "react-router-dom";

interface props {
    data: any;
    remove?: boolean;
    noRequest?: boolean;
    profile?: boolean;
}

const Project = ({data, remove, noRequest, profile}: props) => {


    const projectHook = useProject();
    const dispatch = useAppDispatch();
    const userHook = useUser();

    const buttonsWrap = {
        justifyContent: `${userHook.user.userInfo.username === data.name ? 'spaceBetween' : 'center'}`,
        display: 'flex'
    }
    const profileButtonsWrap = {
        justifyContent: 'space-between',
        display: 'flex'
    }


    return (
        <div className='projectCard'>
            {!remove ? '' :
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

            <div style={profile ? profileButtonsWrap : buttonsWrap}>
                <Link to={`/project/${data.project_id}`}>
                    <button className='btn btn--gray'>Project Details</button>
                </Link>
                {noRequest ?
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
                    userHook.user.userInfo.username === data.name ?
                        <button onClick={() => {
                            projectHook.toggleJoin(data)
                        }} className='btn btn--transparent'>Request To Join</button>
                        : ''
                }
            </div>
        </div>
    );
};

export default Project;