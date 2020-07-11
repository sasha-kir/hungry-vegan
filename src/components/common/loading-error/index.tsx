import React from 'react';
import { FancyButton } from 'components/common';

import './style.css';

interface LoadingErrorProps {
    illustration: string;
    retryMethod(param?: string): void;
    retryMethodParam?: string;
}

const LoadingError = ({ illustration, retryMethod, retryMethodParam }: LoadingErrorProps) => {
    const handleClick = () => {
        retryMethodParam ? retryMethod(retryMethodParam) : retryMethod();
    };

    return (
        <div className="loading-error">
            <img src={illustration} alt="grey error illustration" />
            <div className="error-message">Something went wrong!</div>
            <FancyButton styleType="small" onClick={handleClick}>
                retry
            </FancyButton>
        </div>
    );
};

export default LoadingError;
