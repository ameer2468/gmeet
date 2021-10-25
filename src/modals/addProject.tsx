import React from 'react';
import Modal from "../components/modal";
import Input from "../components/global/input";
import TextArea from "../components/global/textarea";
import {useProject} from "../hooks/useProject";
import {useAppDispatch} from "../redux/hooks";



const AddProject = () => {

    const projectHook = useProject();
    const {projectForm} = projectHook.projects;
    const {loading} = projectHook.projects;
    const dispatch = useAppDispatch();

    return (
        <Modal
            close={() => projectHook.closeModal()}
            submit={() => dispatch(projectHook.createProject())}
            title={'Add Project'}
            loading={loading}
            buttonText={'Submit'}>
            <form className='generalForm'>
                <Input value={projectForm.name} useHook={projectHook} name={'name'} maxWidth={'100%'} placeholder={'Project name'}/>
                <TextArea useHook={projectHook} name={'description'} maxWidth={'100%'} placeholder={'Project description'} height={'20rem'}/>
            </form>
        </Modal>
    );
};

export default AddProject;