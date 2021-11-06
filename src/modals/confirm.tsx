import React from 'react';
import Modal from "../components/modal";
import {useProject} from "../hooks/useProject";

interface props {
    submit: () => void;
    message: string;
    title: string;
}

const Confirm = ({submit, message, title}: props) => {

    const projectHook = useProject();
    const {projects} = projectHook;

    return (
        <Modal loading={projects.deleteLoading} submit={submit} title={title} buttonText={'Confirm'}>
                <p style={{margin: '2rem 0', fontSize: '1.6rem'}}>{message}</p>
        </Modal>
      );
    };

 export default Confirm;