import React from 'react';
import Modal from "../components/modal";
import Input from "../components/global/input";
import TextArea from "../components/global/textarea";
import {useProject} from "../hooks/useProject";


const EditProject = () => {

    const projectHook = useProject();
    const {projectForm} = projectHook;

    return (
        <Modal
            submit={() => console.log('')}
            title={'Edit Project'}
            buttonText={'Confirm'}>
            <form className='generalForm'>
                <Input value={projectForm.name} useHook={projectHook} name={'name'} maxWidth={'100%'} placeholder={'Project name'}/>
                <TextArea value={projectForm.description} useHook={projectHook} name={'description'} maxWidth={'100%'} placeholder={'Project description'} height={'20rem'}/>
            </form>
        </Modal>
    );
};

export default EditProject;
