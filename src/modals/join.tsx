import React from 'react';
import Modal from "../components/modal";
import TextArea from "../components/global/textarea";
import Input from "../components/global/input";
import {useProject} from "../hooks/useProject";



const Join = () => {


    const projectHook = useProject();
    const textLength = projectHook.projectForm.why.length;
    const {joinLoading} = projectHook.projects;


    return (
        <Modal loading={joinLoading}
               submit={() => projectHook.joinProject()}
               title={'Join Project'}
               buttonText={'Submit'}>
            <form className='generalForm'>
                <Input useHook={projectHook} name={'speciality'} maxWidth={'100%'} placeholder={'What\'s your Speciality?'}/>
                <TextArea useHook={projectHook} name={'why'} maxWidth={'100%'} placeholder={'Why do you want to join?'} height={'20rem'}/>
                <p className="limit">{`${100 - textLength} characters remaining`}</p>
            </form>
        </Modal>
    );
};

export default Join;