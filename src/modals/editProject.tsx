import React from 'react';
import Modal from "../components/modal";
import Input from "../components/global/input";
import TextArea from "../components/global/textarea";
import {useProject} from "../hooks/useProject";


const EditProject = () => {

    const projectHook = useProject();
    const {projectForm} = projectHook;
    const {editProjectLoading} = projectHook.projects;
    const {selectedProject} = projectHook.projects;

    return (
        <Modal
            submit={() => projectHook.editProject()}
            title={'Edit Project'}
            loading={editProjectLoading}
            buttonText={'Confirm'}
            disabled={projectForm.name === selectedProject.name
            &&
            projectForm.description === selectedProject.description
            }
        >
            <form className='generalForm'>
                <Input value={projectForm.name} useHook={projectHook} name={'name'} maxWidth={'100%'} placeholder={'Project name'}/>
                <TextArea value={projectForm.description} useHook={projectHook} name={'description'} maxWidth={'100%'} placeholder={'Project description'} height={'20rem'}/>
            </form>
        </Modal>
    );
};

export default EditProject;
