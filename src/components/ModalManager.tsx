import React from 'react';
import {useAppSelector} from "../redux/hooks";
import {modalReducer} from "../redux/modals/modalSlice";
import Join from "../modals/join";
import AddProject from "../modals/addProject";

const ModalManager = () => {

    const modals = useAppSelector(modalReducer)

    switch(modals.activeModal) {
        case 'JOIN':
            return <Join/>
        case 'ADD_PROJECT':
            return <AddProject/>
        default:
            return null;
    }

};

export default ModalManager;