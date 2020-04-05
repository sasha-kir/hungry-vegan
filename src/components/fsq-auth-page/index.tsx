import React, { ReactElement, useState, useEffect } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import config from '../../config';
import { ResponseStatus } from '../../api';
import { foursquareLogin, foursquareConnect } from '../../api/auth';
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

    const renderLoadingState = (): ReactElement => {
        return <p className="fsq-auth-message">Authorization in progress...</p>;
    };

    const renderErrorState = (): ReactElement => {
        return (
            <>
                <p className="fsq-auth-message">Something went wrong!</p>
                <Link to="/login">Login to existing account</Link>
                <Link to="/register">Register</Link>
            </>
        );
    };

    const renderAuthForm = (): ReactElement => {
        return (
            <>
                <FoursquareButton style={{ margin: '50px 0' }} redirectPath={foursquarePaths.login}>
                    login with foursquare
                </FoursquareButton>
                <Link to="/login">Login to existing account</Link>
                <Link to="/register">Register</Link>
            </>
        );
    };

    return (
        <div className="page-wrapper">
            <FormWrapper className="fsq-form-wrapper">
                {authStatus === ResponseStatus.pending && renderLoadingState()}
                {authStatus === ResponseStatus.error && renderErrorState()}
                {authStatus === ResponseStatus.idle && renderAuthForm()}
            </FormWrapper>
        </div>
    );
}

export default FsqAuthPage;
