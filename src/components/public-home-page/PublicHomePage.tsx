import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import './PublicHomePage.css';
import logo from '../../images/logo.svg';
import { FancyButton } from '../common';

const PublicHomePage = (): ReactElement => {
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
