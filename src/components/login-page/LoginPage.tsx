import React, { ReactElement } from 'react';
import './LoginPage.css';

import logo from '../../images/logo.jpg';

interface LoginPageProps {
    handleAuth: Function;
}

function LoginPage({ handleAuth }: LoginPageProps): ReactElement {
    return (
        <div className="login-wrapper">
            <div className="heading">Hungry Vegan</div>
            <img className="logo" src={logo} alt="spoon and fork logo" />
            <button onClick={(): void => handleAuth()}>discover vegan food</button>
        </div>
    );
}

export default LoginPage;
