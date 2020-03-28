import React, { ReactElement, useState, useEffect } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import config from '../../config';
import { ResponseStatus } from '../../api';
import { foursquareLogin } from '../../api/login';
import { foursquareConnect } from '../../api/foursquare';
import { FoursquareButton, FormWrapper } from '../common';
import './style.css';

function FsqAuthPage(): ReactElement {
    const [authStatus, setAuthStatus] = useState<ResponseStatus>(ResponseStatus.idle);
    const { handleAuth, foursquarePaths } = useAuth();
    const location = useLocation();
    const history = useHistory();

    const loginRedirectUrl: string = config.baseUrl + foursquarePaths.login;
    const connectRedirectUrl: string = config.baseUrl + foursquarePaths.connect;

    const loginToFoursquare = async (code: string) => {
        setAuthStatus(ResponseStatus.pending);
        const { status, token, isEmailValid } = await foursquareLogin(code, loginRedirectUrl);
        if (status === ResponseStatus.success && token !== null) {
            handleAuth(token);
            const redirectPath = isEmailValid ? '/home' : '/profile?empty_email=true';
            history.push(redirectPath);
        }
        setAuthStatus(status);
    };

    const connectToFoursquare = async (code: string) => {
        setAuthStatus(ResponseStatus.pending);
        const { status, token } = await foursquareConnect(code, connectRedirectUrl);
        if (status === ResponseStatus.success && token !== null) {
            handleAuth(token);
            history.push('/home');
        }
        setAuthStatus(status);
    };

    useEffect(() => {
        if (Object.values(foursquarePaths).includes(location.pathname)) {
            const searchParams = new URLSearchParams(location.search);
            const code = searchParams.get('code') || '';
            switch (location.pathname) {
                case foursquarePaths.login:
                    loginToFoursquare(code);
                    break;
                case foursquarePaths.connect:
                    connectToFoursquare(code);
                    break;
                default:
                    throw new Error('Unhandled pathname for Foursqaure Auth');
            }
        }
    }, []);

    const renderAuthForm = (): ReactElement => {
        return (
            <div className="fsq-login-wrapper">
                <FormWrapper className="fsq-form-wrapper">
                    <FoursquareButton style={{ margin: '50px 0' }} redirectPath={foursquarePaths.login}>
                        login with foursquare
                    </FoursquareButton>
                    <Link to="/login">Login to existing account</Link>
                    <Link to="/register">Register</Link>
                </FormWrapper>
            </div>
        );
    };

    return (
        <div>
            {authStatus === ResponseStatus.pending && <p style={{ color: 'white' }}>Authorization in progress...</p>}
            {authStatus === ResponseStatus.error && <p style={{ color: 'red' }}>Authentication error</p>}
            {authStatus === ResponseStatus.success && <p style={{ color: 'white' }}>Redirecting you to homepage...</p>}
            {authStatus === ResponseStatus.idle && renderAuthForm()}
        </div>
    );
}

export default FsqAuthPage;
