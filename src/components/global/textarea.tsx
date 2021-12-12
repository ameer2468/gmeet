import React, {ChangeEvent} from 'react';

interface props {
    maxWidth: string;
    placeholder: string;
    value?: string;
    submit?: () => void;
    useHook:  {
        onChange: (key: string, value: string) => void;
    }
    height: string;
    className?: string;
    name: string;
    maxLength?: number;
}

const TextArea = (props: props) => {

    const {onChange} = props.useHook;

    return (
        <textarea
            placeholder={props.placeholder}
            maxLength={!props.maxLength ? 100 : 200}
            className={props.className ? props.className : 'textarea'}
            value={props.value}
            onSubmit={props.submit}
            name={props.name}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                onChange(props.name, e.target.value)
            }}
            style={{maxWidth: props.maxWidth, height: props.height}}
            />
    );
};

export default TextArea;