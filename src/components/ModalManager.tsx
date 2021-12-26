import React from 'react';
import {useAppSelector} from "../redux/hooks";
import {modalReducer} from "../redux/modals/modalSlice";
import Join from "../modals/join";
import AddProject from "../modals/addProject";
import Confirm from "../modals/confirm";
import {useProject} from "../hooks/useProject";
import Requests from "../modals/requests";
import EditProject from "../modals/editProject";

const ModalManager = () => {

    const modals = useAppSelector(modalReducer)
    const projectHook = useProject();

    switch(modals.activeModal) {
        case 'JOIN':
            return <Join/>
        case 'REQUESTS':
            return <Requests/>
        case 'ADD_PROJECT':
            return <AddProject/>
        case 'EDIT_PROJECT':
            return <EditProject/>
        case 'DELETE_COMMENT':
            return <Confirm
                message={'Are you sure you want to delete this comment?'}
                submit={() => projectHook.deleteProjectHandler()}
                title={'Delete Project'}
            />
        case 'DELETE_PROJECT':
            return <Confirm
                message={'Are you sure you want to delete this project?'}
                submit={() => projectHook.deleteProjectHandler()}
                title={'Delete Project'}
            />
        default:
            return null;
    }

};

export default ModalManager;
