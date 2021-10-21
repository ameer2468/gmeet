import React from 'react';

interface props {
    maxWidth: string;
    placeholder: string;
    value?: string;
    onChange?: () => void;
    height: string;
    name: string;
}

const TextArea = (props: props) => {
    return (
        <textarea
            placeholder={props.placeholder}
            className='textarea'
            value={props.value}
            name={props.name}
            onChange={props.onChange}
            style={{maxWidth: props.maxWidth, height: props.height}}
            />
    );
};

export default TextArea;