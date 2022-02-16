import React from 'react';
import Modal from "../components/modal";
import Input from "../components/global/input";
import TextArea from "../components/global/textarea";
import {useProject} from "../hooks/useProject";
import {DropZone} from "../components/DropZone";



const AddProject = () => {

    const projectHook = useProject();
    const {projectForm} = projectHook.projects;
    const {createLoading} = projectHook.projects;

    return (
        <Modal
            submit={() => projectHook.createProjectHandler()}
            title={'Add Project'}
            loading={createLoading}
            buttonText={'Confirm'}
            disabled={projectForm.name.length === 0 || projectForm.description.length === 0}
        >
            <form className='generalForm'>
                <Input value={projectForm.name} useHook={projectHook} name={'name'} maxWidth={'100%'} placeholder={'Project name'}/>
                <DropZone/>
                <TextArea maxLength={2000} useHook={projectHook} name={'description'} maxWidth={'100%'} placeholder={'Project description'} height={'20rem'}/>
            </form>
        </Modal>
    );
};

export default AddProject;
