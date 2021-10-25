import React from 'react';
import Modal from "../components/modal";
import TextArea from "../components/global/textarea";
import Input from "../components/global/input";
import {useProject} from "../hooks/useProject";



const Join = () => {

    const projectHook = useProject();

    return (
        <Modal submit={() => console.log()} title={'Join Project'} buttonText={'Submit'}>
            <form className='generalForm'>
                <Input useHook={projectHook} name={'speciality'} maxWidth={'100%'} placeholder={'What\'s your Speciality?'}/>
                <TextArea useHook={projectHook} name={'why'} maxWidth={'100%'} placeholder={'Why do you want to join?'} height={'20rem'}/>
            </form>
        </Modal>
    );
};

export default Join;