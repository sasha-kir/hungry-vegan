import React, { ReactElement, DetailedHTMLProps, ButtonHTMLAttributes } from 'react';
import './FancyButton.css';

const FancyButton = ({
    children,
    ...props
}: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>): ReactElement<HTMLButtonElement> => {
    const className = props.className + ' fancy-btn';
    return (
        <button {...props} className={className}>
            {children}
        </button>
    );
};

export default FancyButton;
