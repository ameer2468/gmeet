import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {useProject} from "../../../hooks/useProject";
import {selectedProject} from "../../../redux/projects/projectSlice";
import {useAppDispatch} from "../../../redux/hooks";

interface props {
    data: any;
    remove?: boolean;
    noRequest?: boolean;
}

const Project = ({data, remove, noRequest}: props) => {

    const projectHook = useProject();
    const dispatch = useAppDispatch();

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
            <div className="buttons">
                <button className='btn btn--gray'>Project Details</button>
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
                    <button onClick={() => {
                    projectHook.toggleJoin(data)
                }} className='btn btn--transparent'>Request To Join</button>}
            </div>
        </div>
    );
};

export default Project;