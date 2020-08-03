import React from 'react';
import { FancyButton } from 'components/common';

import './style.css';

interface LoadingErrorProps {
    illustration: string;
    retryMethod(...params: string[]): void;
    retryMethodParams?: string[];
}

const LoadingError = ({ illustration, retryMethod, retryMethodParams = [] }: LoadingErrorProps) => {
    const handleClick = () => {
        retryMethodParams.length ? retryMethod(...retryMethodParams) : retryMethod();
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
