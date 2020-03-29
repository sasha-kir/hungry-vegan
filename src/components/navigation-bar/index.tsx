import React, { ReactElement } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../../context/auth';
import logo from '../../images/logo.png';
import './style.css';

const NavigationBar = (): ReactElement => {
    const history = useHistory();
    const { authToken, handleLogout } = useAuth();

    const handleLogoClick = (): void => {
        history.push('/home');
    };

    const renderNavLinks = (): ReactElement<HTMLDivElement> => {
        const className = 'nav-links';
        if (authToken !== null) {
            return (
                <div className={className}>
                    <Link to="/profile">profile</Link>
                    <Link to="/" onClick={handleLogout}>
                        log out
                    </Link>
                </div>
            );
        }
        return (
            <div className={className}>
                <Link to="/register">register</Link>
                <Link to="/login">log in</Link>
            </div>
        );
    };

    return (
        <nav>
            <div className="nav-highlight">
                <img className="logo" onClick={handleLogoClick} src={logo} alt="carrot logo" />
            </div>
            {renderNavLinks()}
        </nav>
    );
};

export default NavigationBar;
