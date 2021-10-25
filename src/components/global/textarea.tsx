import React, {ChangeEvent} from 'react';

interface props {
    maxWidth: string;
    placeholder: string;
    value?: string;
    useHook:  {
        onChange: (key: string, value: string) => void;
    }
    height: string;
    name: string;
}

const TextArea = (props: props) => {

    const {onChange} = props.useHook;

    return (
        <textarea
            placeholder={props.placeholder}
            className='textarea'
            value={props.value}
            name={props.name}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(props.name, e.target.value)}
            style={{maxWidth: props.maxWidth, height: props.height}}
            />
    );
};

export default TextArea;