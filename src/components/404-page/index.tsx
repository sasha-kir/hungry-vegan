import React from 'react';
import placeholder from '../../images/404.svg';
import './style.css';

const NotFoundPage: React.FC = () => {
    return (
        <div className="page-wrapper">
            <img src={placeholder} className="placeholder-image" />
        </div>
    );
};

export default NotFoundPage;
