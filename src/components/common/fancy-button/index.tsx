import React, { ReactElement, DetailedHTMLProps, ButtonHTMLAttributes } from 'react';
import './style.css';

const FancyButton = ({
    children,
    ...props
}: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>): ReactElement<HTMLButtonElement> => {
    let className = 'fancy-btn';
    if (props.className) {
        className = `${props.className} ${className}`;
    }
    return (
        <button {...props} className={className}>
            {children}
        </button>
    );
};

export default FancyButton;
