import React, { ReactElement } from 'react';
import './FormInput.css';

interface FormInputProps extends React.HTMLProps<HTMLInputElement> {
    name: string;
    setValue(name: string, value: string): void;
    renderError(): void;
}

const FormInput = (props: FormInputProps): ReactElement<HTMLDivElement> => {
    const { name, setValue, renderError, onFocus, type = 'text' } = { ...props };

    const handleInput = event => {
        setValue(name, event.target.value);
    };

    const inputAttributes = {
        name,
        type,
    };
    if (onFocus) {
        inputAttributes['onFocus'] = onFocus;
    }

    return (
        <div className="form-input-wrapper">
            <label>{name}</label>
            <input onChange={handleInput} {...inputAttributes} />
            {renderError()}
        </div>
    );
};

export default FormInput;
