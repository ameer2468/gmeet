import React from 'react';
import Modal from "../components/modal";
import {useProject} from "../hooks/useProject";



const Requests = () => {


    const projectHook = useProject();


    return (
        <Modal
               submit={() => projectHook.toggleRequests('')}
               title={'Project Requests'}
               buttonText={'Close'}>
            <form className='generalForm'>

            </form>
        </Modal>
    );
};

export default Requests;