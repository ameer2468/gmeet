import React from 'react';
import Modal from "../components/modal";
import {useProject} from "../hooks/useProject";



const Requests = () => {


    const projectHook = useProject();
    const projectRequests = projectHook.projects.projectRequests.filter((value) => {
        return value.project_id === projectHook.projects.selectedProject.project_id;
    })

    return (
        <Modal
               submit={() => projectHook.toggleRequests('')}
               title={'Project Requests'}
               buttonText={'Close'}>
            <form className='generalForm'>
                {
                    projectRequests.map((value) => {
                        return (
                                <div key={value.project_id} className="request">
                                    <h2>{value.user}</h2>
                                    <p>{value.speciality}</p>
                                    <p>{value.why}</p>
                                </div>
                        )})
                }
            </form>
        </Modal>
    );
};

export default Requests;