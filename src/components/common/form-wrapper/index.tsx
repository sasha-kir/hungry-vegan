import React, { ReactElement } from 'react';
import './style.css';

const FormWrapper = ({ children, className = '' }: React.HTMLProps<HTMLDivElement>): ReactElement<HTMLDivElement> => {
    const computedClassName = className + ' form-wrapper';
    return <div className={computedClassName}>{children}</div>;
};

export default FormWrapper;
