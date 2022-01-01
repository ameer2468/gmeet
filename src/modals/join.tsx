import React from 'react';
import Modal from "../components/modal";
import TextArea from "../components/global/textarea";
import {useProject} from "../hooks/useProject";
//@ts-ignore
import { Dropdown } from 'reactjs-dropdown-component';



const Join = () => {

    const professions = [
        {label: 'Backend Engineer', value: 'Backend Engineer'},
        {label: 'Frontend Engineer', value: 'Frontend Engineer'},
        {label: 'Fullstack Engineer', value: 'Fullstack Engineer'},
        {label: 'UI Designer', value: 'UI Designer'},
        {label: 'UX Designer', value: 'UX Designer'},
        {label: 'Motion Designer', value: 'Motion Designer'},
    ]
    const projectHook = useProject();
    const textLength = projectHook.projectForm.why.length;
    const {joinLoading} = projectHook.projects;

    const onChange = (item: any) => {
        projectHook.onChange('role', item.value)
    }

    return (
        <Modal loading={joinLoading}
               submit={() => projectHook.joinProject()}
               title={'Join Project'}
               buttonText={'Submit'}>
            <form className='generalForm'>
                <Dropdown
                    name="Profession"
                    title="Select Profession"
                    list={professions}
                    onChange={onChange}
                    styles={{
                        list: {backgroundColor: '#12131f', boxShadow: 'none', border: 0},
                        header: {backgroundColor: 'rgba(18,19,31,0.22)', border: 0, padding: '0.5rem 0'},
                        wrapper: {border: 0, width: '100%', marginBottom: '1rem', color: 'white', fontSize: '1.5rem'},
                        listItem: {color: 'white', fontSize: '1.5rem', fontWeight: 'normal', padding: '1rem 0 1rem 1.5rem'}
                    }}
                />
                <TextArea useHook={projectHook} name={'why'} maxWidth={'100%'} placeholder={'Why do you want to join?'} height={'12rem'}/>
                <p className="limit">{`${100 - textLength} characters remaining`}</p>
            </form>
        </Modal>
    );
};

export default Join;