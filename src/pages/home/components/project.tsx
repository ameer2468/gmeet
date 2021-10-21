import React from 'react';
import {useAppDispatch} from "../../../redux/hooks";
import {ActiveModal} from "../../../redux/modals/modalSlice";

interface props {
    data: any;
}

const Project = ({data}: props) => {

    const dispatch = useAppDispatch();

    return (
        <div className='projectCard'>
            <h2>{data.name}</h2>
            <div className="members">
                {data.members.map((value: any, index: number) => {
                    return (
                        <div key={index.toString()} className="avatar">
                            <img src={value.image} alt="member"/>
                        </div>
                    )
                })}
            </div>
            <p>{data.description}</p>
            <div className="buttons">
                <button className='btn btn--purepurple'>Project Details</button>
                <button onClick={() => {
                    dispatch(ActiveModal('JOIN'))
                }} className='btn btn--transparent'>Request To Join</button>
            </div>
        </div>
    );
};

export default Project;