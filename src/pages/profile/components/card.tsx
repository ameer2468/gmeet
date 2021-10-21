import React from 'react';

interface props {
    children: React.ReactNode;
    customClass?: string;
    flex: string;
    height?: string;
}

const Card = (props: props) => {
    return (
        <div
            style={{
                flex: props.flex,
                padding: '2rem',
                height: props.height || '23rem'
            }}
            className={`card ${props.customClass}`}>
            {props.children}
        </div>
    );
};

export default Card;