import React from 'react';
import Modal from "../components/modal";
import Input from "../components/global/input";
import TextArea from "../components/global/textarea";



const Join = () => {
    return (
        <Modal title={'Join Project'} buttonText={'Submit'}>
            <form className='generalForm'>
                <Input maxWidth={'100%'} placeholder={'What\'s your Speciality?'}/>
                <TextArea maxWidth={'100%'} placeholder={'Why do you want to join?'} height={'20rem'}/>
            </form>
        </Modal>
    );
};

export default Join;