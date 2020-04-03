import React, { ReactElement } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../../context/auth';

import './style.css';

const PublicHomePage = (): ReactElement => {
    const { authToken } = useAuth();
    if (authToken !== null) {
        return <Redirect to="/home" />;
    }

    return (
        <div className="page-wrapper public-home-wrapper">
            <div className="heading">Hungry Vegan</div>
        </div>
    );
};

export default PublicHomePage;
