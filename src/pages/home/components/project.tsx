import React from 'react';
import {useAppDispatch} from "../../../redux/hooks";
import {ActiveModal} from "../../../redux/modals/modalSlice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {useProject} from "../../../hooks/useProject";

interface props {
    data: any;
    remove?: boolean;
}

const Project = ({data, remove}: props) => {

    const dispatch = useAppDispatch();
    const projectHook = useProject();

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
                <button onClick={() => {
                    dispatch(ActiveModal('JOIN'))
                }} className='btn btn--transparent'>Request To Join</button>
            </div>
        </div>
    );
};

export default Project;