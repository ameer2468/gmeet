import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {modalReducer} from "../redux/modals/modalSlice";
import {ActiveModal} from "../redux/modals/modalSlice";
import {motion} from "framer-motion";
import {regularVariants} from "../helpers/framer";
import BeatLoader from "react-spinners/BeatLoader";

interface props {
    title: string;
    buttonText: string;
    children: React.ReactNode;
    submit: () => void;
    loading?: boolean;
    className?: string;
}

const Modal = ({children,buttonText, title, submit, loading, className}: props) => {

    const modals = useAppSelector(modalReducer)
    const {activeModal} = modals;
    const dispatch = useAppDispatch();

    const closeHandler = () => {
        dispatch(ActiveModal(''))
    }

        return (
            <div className={`modalWrap ${activeModal.length > 1 ? 'modalShow' : 'modalHide'}`}>
                <motion.div variants={regularVariants} initial={"hidden"} animate="active" className={`modal ${className}`}>
                    <div onClick={() => {
                        closeHandler()
                    }} className="close">
                        <FontAwesomeIcon icon={faTimes} className={'closeIcon'}/>
                    </div>
                    <h1>{title}</h1>
                    {children}
                    <button onClick={submit} className='btn btn--green'>{
                        loading ?
                            <BeatLoader size={8} margin={1} color={'#2a2c3d'} />
                            : buttonText
                    }</button>
                </motion.div>
            </div>
        )
};

export default Modal;