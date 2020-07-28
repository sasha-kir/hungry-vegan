import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from 'context/auth';
import logo from 'images/logo.png';
import './style.css';

const NavigationBar = (): ReactElement => {
    const { authToken, handleLogout } = useAuth();

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
                <Link to="/">
                    <img className="logo" src={logo} alt="carrot logo" />
                </Link>
            </div>
            {renderNavLinks()}
        </nav>
    );
};

export default NavigationBar;
