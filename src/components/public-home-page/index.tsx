import React, { ReactElement } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useAuth } from '../../context/auth';

import './style.css';
import logo from '../../images/logo.svg';
import { FancyButton } from '../common';

const PublicHomePage = (): ReactElement => {
    const { authToken } = useAuth();
    if (authToken !== null) {
        return <Redirect to="/home" />;
    }

    return (
        <div className="public-home-wrapper">
            <div className="heading">Hungry Vegan</div>
            <img className="logo" src={logo} alt="spoon and fork logo" />
            <FancyButton className="public-home-btn">
                <Link to="/home">discover vegan food</Link>
            </FancyButton>
        </div>
    );
};

export default PublicHomePage;
