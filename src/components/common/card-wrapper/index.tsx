import React, { ReactElement } from 'react';
import './style.css';

const CardWrapper = ({
    children,
    className,
}: React.HTMLProps<HTMLDivElement>): ReactElement<HTMLDivElement> => {
    const classes = ['card-wrapper'];
    if (className) {
        classes.push(className);
    }
    const computedClass = classes.join(' ');
    return <div className={computedClass}>{children}</div>;
};

export default CardWrapper;
