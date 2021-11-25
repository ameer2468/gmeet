import React from 'react';
import Modal from "../components/modal";
import {useProject} from "../hooks/useProject";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCode} from "@fortawesome/free-solid-svg-icons";


const Requests = () => {


    const projectHook = useProject();
    const projectRequests = projectHook.projects.projectRequests.filter((value) => {
        return value.project_id === projectHook.projects.selectedProject.project_id;
    })

    return (
        <Modal
            className={'modal-requests'}
               submit={() => projectHook.toggleRequests('')}
               title={'Project Requests'}
               buttonText={'Close'}>
            <form className='generalForm'>
                {
                    projectRequests.length === 0 ? <p className={'no-requests'}>No Requests</p> :
                    projectRequests.map((value) => {
                        return (
                                <div key={value.project_id} className="request">
                                    <h2>{value.user}</h2>
                                    <p className='speciality'>
                                        <FontAwesomeIcon className={'role-icon'} icon={faCode}/>
                                        {value.speciality}
                                    </p>
                                    <p>{value.why}</p>
                                    <div className="buttons">
                                        <button onClick={(e) => {
                                            e.preventDefault();
                                            projectHook.acceptHandler(
                                                {id: value.id, project_id: value.project_id, members: value.user}
                                            )
                                        }} className='btn btn--purple'>Accept</button>
                                        <button className='btn btn--red'>Decline</button>
                                    </div>
                                </div>
                        )})
                }
            </form>
        </Modal>
    );
};

export default Requests;