import React from 'react';
import { FancyButton } from 'components/common';

import './style.css';

interface LoadingErrorProps {
    illustration: string;
    retryMethod(): void;
}

const LoadingError = ({ illustration, retryMethod }: LoadingErrorProps) => {
    return (
        <div className="loading-error">
            <img src={illustration} alt="grey error illustration" />
            <div className="error-message">Something went wrong!</div>
            <FancyButton styleType="small" onClick={retryMethod}>
                retry
            </FancyButton>
        </div>
    );
};

export default LoadingError;
