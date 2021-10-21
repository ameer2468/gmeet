import React from 'react';
import Modal from "../components/modal";
import TextArea from "../components/global/textarea";



const Join = () => {
    return (
        <Modal submit={() => console.log()} title={'Join Project'} buttonText={'Submit'}>
            <form className='generalForm'>
                {/*<Input name={'speciality'} maxWidth={'100%'} placeholder={'What\'s your Speciality?'}/>*/}
                <TextArea name={'why'} maxWidth={'100%'} placeholder={'Why do you want to join?'} height={'20rem'}/>
            </form>
        </Modal>
    );
};

export default Join;