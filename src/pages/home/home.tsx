import React from 'react';
import Authnav from "../../components/authnav";
import Search from "./components/search";
import Project from "./components/project";
import {projectsArr} from "../../fakedata";
import {useAppDispatch} from "../../redux/hooks";
import {ModalStatus, ActiveModal} from "../../redux/modals/modalSlice";

const Home = () => {

    const dispatch = useAppDispatch();

    return (
        <div className='HomeContent'>
           <Authnav/>
            <div className="homeContainer">
                <div className="flex">
                    <Search/>
                    <button
                        className='btn btn--green'
                        onClick={() => {
                            dispatch(ModalStatus(true))
                            dispatch(ActiveModal('ADD_PROJECT'))
                        }}
                    >
                        + Add Project
                    </button>
                </div>
                <div className="projectsContainer">
                    {projectsArr.map((value, index) => {
                        return <Project key={index.toString()} data={value}/>
                    })}
                </div>
            </div>
        </div>
    );
};

export default Home;