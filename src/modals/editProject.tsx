import React from 'react';
import Modal from "../components/modal";
import Input from "../components/global/input";
import TextArea from "../components/global/textarea";
import {useProject} from "../hooks/useProject";
import {DropZone} from "../components/DropZone";


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
            projectForm.description === selectedProject.description &&
                Object.entries(projectForm.imageFile).length === 0
            }
        >
            <form className='generalForm'>
                <Input value={projectForm.name} useHook={projectHook} name={'name'} maxWidth={'100%'} placeholder={'Project name'}/>
                <DropZone/>
                <TextArea maxLength={2000}
                          value={projectForm.description}
                          useHook={projectHook}
                          name={'description'}
                          maxWidth={'100%'}
                          placeholder={'Project description'}
                          height={'20rem'}/>
            </form>
        </Modal>
    );
};

export default EditProject;
