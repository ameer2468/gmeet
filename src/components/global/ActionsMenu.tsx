import React from 'react';

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
                return <p key={index.toString()} onClick={value.onClick}>{`${value.icon ? value.icon : ''} ${value.name}`}</p>
            })}
        </div>
    );
};

export default ActionsMenu;
