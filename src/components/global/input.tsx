import React, {ChangeEvent} from 'react';

interface props {
    maxWidth: string;
    placeholder: string;
    value?: string;
    useHook:  {
        onChange: (key: string, value: string) => void;
    }
    name: string;
}

const Input = (props: props) => {

    const {onChange} = props.useHook;

    return (
        <input
            placeholder={props.placeholder}
            className='input'
            name={props.name}
            value={props.value}
            autoComplete={'off'}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(props.name, e.target.value)}
            style={{maxWidth: props.maxWidth}}
            type="text"/>
    );
};

export default Input;
