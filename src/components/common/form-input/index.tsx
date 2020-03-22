import React, { ReactElement } from 'react';
import './style.css';

interface FormInputProps extends React.HTMLProps<HTMLInputElement> {
    name: string;
    setValue(name: string, value: string): void;
    renderError?(): void;
}

const FormInput = (props: FormInputProps): ReactElement<HTMLDivElement> => {
    const { name, setValue, type = 'text', value = '', disabled = false } = { ...props };

    const handleInput = event => {
        setValue(name, event.target.value);
    };

    const inputAttributes = {
        name,
        type,
        value,
        disabled,
    };

    if (props.onFocus !== undefined) {
        inputAttributes['onFocus'] = props.onFocus;
    }

    return (
        <div className="form-input-wrapper">
            <label>{name}</label>
            <input onChange={handleInput} {...inputAttributes} />
            {props.renderError !== undefined ? props.renderError() : null}
        </div>
    );
};

export default FormInput;
