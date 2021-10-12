import React from 'react';

interface props {
    maxWidth: string;
    placeholder: string;
    value?: string;
    onChange?: () => void;
}

const Input = (props: props) => {
    return (
        <input
            placeholder={props.placeholder}
            className='input'
            value={props.value}
            onChange={props.onChange}
            style={{maxWidth: props.maxWidth}}
            type="text"/>
    );
};

export default Input;