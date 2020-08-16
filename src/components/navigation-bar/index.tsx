import React, { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

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
                    <NavLink to="/profile">profile</NavLink>
                    <NavLink exact={true} to="/" onClick={handleLogout}>
                        log out
                    </NavLink>
                </div>
            );
        }
        return (
            <div className={className}>
                <NavLink to="/register">register</NavLink>
                <NavLink to="/login">log in</NavLink>
            </div>
        );
    };

    return (
        <nav>
            <div className="nav-highlight">
                <NavLink exact={true} to="/">
                    <img className="logo" src={logo} alt="carrot logo" />
                </NavLink>
            </div>
            {renderNavLinks()}
        </nav>
    );
};

export default NavigationBar;
