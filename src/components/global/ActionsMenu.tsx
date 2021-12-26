import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface option {
    onClick?: () => void;
    name: string;
    icon?: any;
}

interface props {
    options: option[]
    show: boolean;
}

const ActionsMenu = (props: props) => {


    return (
        <div className={`ActionsMenu ${props.show ? 'showMenu' : ''}`}>
            {props.options.map((value, index) => {
                return <p key={index.toString()} onClick={value.onClick}><FontAwesomeIcon className='menuIcon' icon={value.icon}/>{value.name}</p>
            })}
        </div>
    );
};

export default ActionsMenu;
