import React from 'react';
import Modal from "../components/modal";
import Input from "../components/global/input";
import TextArea from "../components/global/textarea";



const AddProject = () => {
    return (
        <Modal title={'Add Project'} buttonText={'Submit'}>
            <form className='generalForm'>
                <Input maxWidth={'100%'} placeholder={'Project name'}/>
                <Input maxWidth={'100%'} placeholder={'Project members'}/>
                <TextArea maxWidth={'100%'} placeholder={'Project description'} height={'20rem'}/>
            </form>
        </Modal>
    );
};

export default AddProject;