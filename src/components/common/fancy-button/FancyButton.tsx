import React, { ReactElement, DetailedHTMLProps, ButtonHTMLAttributes } from 'react';
import './FancyButton.css';

const FancyButton = ({
    children,
    ...props
}: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>): ReactElement<HTMLButtonElement> => {
    let className = 'fancy-btn';
    if (props.className) {
        className = className + ' ' + props.className;
    }
    return (
        <button {...props} className={className}>
            {children}
        </button>
    );
};

export default FancyButton;
