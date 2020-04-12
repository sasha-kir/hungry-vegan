import React, { ReactElement } from 'react';
import './style.css';

const FormWrapper = ({
    children,
    className,
}: React.HTMLProps<HTMLDivElement>): ReactElement<HTMLDivElement> => {
    const classes = ['form-wrapper'];
    if (className) {
        classes.push(className);
    }
    const computedClass = classes.join(' ');
    return <div className={computedClass}>{children}</div>;
};

export default FormWrapper;
