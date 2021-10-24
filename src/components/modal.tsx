import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {modalReducer} from "../redux/modals/modalSlice";
import {ActiveModal} from "../redux/modals/modalSlice";
import {motion} from "framer-motion";
import {regularVariants} from "../helpers/framer";

interface props {
    title: string;
    buttonText: string;
    children: React.ReactNode;
    submit: () => void;
    close?: () => void;
}

const Modal = ({children,buttonText, title, submit, close}: props) => {

    const modals = useAppSelector(modalReducer)
    const {activeModal} = modals;
    const dispatch = useAppDispatch();

    const closeHandler = () => {
        dispatch(ActiveModal(''))
    }

        return (
            <div className={`modalWrap ${activeModal.length > 1 ? 'modalShow' : 'modalHide'}`}>
                <motion.div variants={regularVariants} initial={"hidden"} animate="active" className={`modal`}>
                    <div onClick={() => {
                        closeHandler()
                        if (close) {
                            close()
                        }
                    }} className="close">
                        <FontAwesomeIcon icon={faTimes} className={'closeIcon'}/>
                    </div>
                    <h1>{title}</h1>
                    {children}
                    <button onClick={submit} className='btn btn--purple'>{buttonText}</button>
                </motion.div>
            </div>
        )
};

export default Modal;