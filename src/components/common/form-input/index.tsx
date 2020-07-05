import React, { ReactElement } from 'react';
import './style.css';

interface FormInputProps extends React.HTMLProps<HTMLInputElement> {
    name: string;
    setValue(name: string, value: string): void;
    errorMessage?: string;
}

const FormInput = (props: FormInputProps): ReactElement<HTMLDivElement> => {
    const { name, setValue, errorMessage = '', type = 'text', value = '', disabled = false } = {
        ...props,
    };

    const handleInput = (event) => {
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

    if (type === 'checkbox') {
        inputAttributes['checked'] = props.checked;
    }

    return (
        <div className="form-input-wrapper">
            <label>{name}</label>
            <input onChange={handleInput} {...inputAttributes} data-testid={`${name}-input`} />
            {Boolean(errorMessage) && (
                <div className="input-error" data-testid={`${name}-input-error`}>
                    {errorMessage}
                </div>
            )}
        </div>
    );
};

export default FormInput;
