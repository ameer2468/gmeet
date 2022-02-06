import React, {useEffect, useState} from 'react';
import Modal from "../components/modal";
import TextArea from "../components/global/textarea";
import {useProject} from "../hooks/useProject";
import { useDebounce } from 'use-debounce';
//@ts-ignore
import { Dropdown } from 'reactjs-dropdown-component';
import Input from "../components/global/input";
import axios from "axios";
import {notify} from "../helpers/notify";
import {Scrollbars} from "react-custom-scrollbars";



const Join = () => {

    const professions = [
        {label: 'Backend Engineer', value: 'Backend Engineer'},
        {label: 'Frontend Engineer', value: 'Frontend Engineer'},
        {label: 'Fullstack Engineer', value: 'Fullstack Engineer'},
        {label: 'UI Designer', value: 'UI Designer'},
        {label: 'UX Designer', value: 'UX Designer'},
        {label: 'Motion Designer', value: 'Motion Designer'},
    ]
    const [userProjects, setUserProjects] = useState([]);
    const projectHook = useProject();
    const textLength = projectHook.projectForm.why.length;
    const {gituser} = projectHook.projectForm;
    const {joinLoading} = projectHook.projects;
    const [githubUser] = useDebounce(gituser, 250);


    const onChange = (item: { value: string }) => {
        projectHook.onChange('role', item.value)
    }

    useEffect(() => {
        const getData = async () => {
           if (githubUser.length === 0) setUserProjects([]);
           if (githubUser.length > 0) {
               return await axios.get(`https://api.github.com/users/${githubUser}/repos`)
                   .then(res => {
                      setUserProjects(res.data)
                   })
                   .catch(err => {
                       notify(err.response.data)
                   })
           }
           return;
           }
        getData();
    }, [githubUser])


    return (
        <Modal loading={joinLoading}
               submit={() => projectHook.joinProject()}
               className={'joinModal'}
               title={'Join Project'}
               buttonText={'Submit'}>
            <form autoComplete={"off"} className='generalForm'>
                <Dropdown
                    name="Profession"
                    title="Select Profession"
                    list={professions}
                    onChange={onChange}
                    styles={{
                        list: {backgroundColor: '#12131f', boxShadow: 'none', border: 0},
                        header: {backgroundColor: 'rgba(#2d2d2d, 0.3);', border: 0, padding: '0.5rem 0'},
                        wrapper: {border: 0, width: '100%', marginBottom: '1rem', color: 'white', fontSize: '1.5rem'},
                        listItem: {color: 'white', fontSize: '1.5rem', fontWeight: 'normal', padding: '1rem 0 1rem 1.5rem'}
                    }}
                />
                <div className="whyjoin">
                    <TextArea useHook={projectHook} name={'why'} maxWidth={'100%'} placeholder={'Why do you want to join?'} height={'12rem'}/>
                    <p className="limit">{`${100 - textLength} characters remaining`}</p>
                </div>
                <Input useHook={projectHook} name={'gituser'} maxWidth={'100%'} placeholder={`Have a Github? what's your username?`}/>
                <Scrollbars style={{height: userProjects.length === 0 ? 0 : userProjects.length > 3 ? 200 : 120}}>
                    {userProjects.length === 0 ? '' : <h3>Public Projects</h3>}
                    <div className="projects-list">
                        {userProjects.length === 0 ? '' : userProjects.map((value: any, index: number) => {
                            return (
                                <a key={index.toString()} rel='noreferrer' target='_blank' href={value.html_url}><div className="user-project">
                                    <p>{value.name}</p>
                                </div></a>
                            )
                        })}
                    </div>
                </Scrollbars>
            </form>
        </Modal>
    );
};

export default Join;
