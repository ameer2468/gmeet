import React from 'react';
import Modal from "../components/modal";
import Input from "../components/global/input";
import TextArea from "../components/global/textarea";
import {useProject} from "../hooks/useProject";



const AddProject = () => {

    const projectHook = useProject();
    const {projectForm} = projectHook.projects;


    return (
        <Modal submit={() => console.log()} title={'Add Project'} buttonText={'Submit'}>
            <form className='generalForm'>
                <Input value={projectForm.name} useHook={projectHook} name={'name'} maxWidth={'100%'} placeholder={'Project name'}/>
                <Input value={projectForm.members} useHook={projectHook} name={'members'} maxWidth={'100%'} placeholder={'Project members e.g. Jack,Chris,Alisha'}/>
                <TextArea name={'description'} maxWidth={'100%'} placeholder={'Project description'} height={'20rem'}/>
            </form>
        </Modal>
    );
};

export default AddProject;