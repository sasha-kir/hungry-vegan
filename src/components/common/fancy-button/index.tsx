import React, { ReactElement, DetailedHTMLProps, ButtonHTMLAttributes } from 'react';
import './style.css';

interface FancyButonProps
    extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    'data-testid'?: string;
    styleType?: 'small' | 'normal';
}

const FancyButton = ({
    children,
    className,
    styleType = 'normal',
    'data-testid': testId = '',
    ...props
}: FancyButonProps): ReactElement<HTMLButtonElement> => {
    const buttonClasses = ['fancy-btn', `fancy-btn-${styleType}`];
    if (className) {
        buttonClasses.push(className);
    }
    const buttonClass = buttonClasses.join(' ');
    return (
        <button {...props} className={buttonClass} data-testid={testId}>
            {children}
        </button>
    );
};

export default FancyButton;
