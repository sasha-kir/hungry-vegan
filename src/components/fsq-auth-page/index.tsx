import React, { ReactElement, useState, useCallback, useEffect } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import { useAuth } from 'context/auth';
import config from 'config';
import { ResponseStatus } from 'api';
import AuthApi from 'api/auth';
import { FoursquareButton, FormWrapper } from 'components/common';
import './style.css';

function FsqAuthPage(): ReactElement {
    const [authStatus, setAuthStatus] = useState<ResponseStatus>(ResponseStatus.idle);
    const { handleAuth, foursquarePaths } = useAuth();
    const location = useLocation();
    const history = useHistory();

    const loginToFoursquare = useCallback(
        async (code: string): Promise<void> => {
            const loginRedirectUrl: string = config.baseUrl + foursquarePaths.login;
            const { status, data: token, isEmailValid } = await AuthApi.foursquareLogin(
                code,
                loginRedirectUrl,
            );
            if (status === ResponseStatus.success && token !== null) {
                handleAuth(token);
                const redirectPath = isEmailValid ? '/home' : '/profile?empty_email=true';
                history.push(redirectPath);
            }
            setAuthStatus(status);
        },
        [handleAuth, history, foursquarePaths],
    );

    const connectToFoursquare = useCallback(
        async (code: string): Promise<void> => {
            const connectRedirectUrl: string = config.baseUrl + foursquarePaths.connect;
            const { status, data: token } = await AuthApi.foursquareConnect(
                code,
                connectRedirectUrl,
            );
            if (status === ResponseStatus.success && token !== null) {
                handleAuth(token);
                history.push('/home');
            }
            setAuthStatus(status);
        },
        [handleAuth, history, foursquarePaths],
    );

    useEffect(() => {
        if (Object.values(foursquarePaths).includes(location.pathname)) {
            setAuthStatus(ResponseStatus.pending);
            const searchParams = new URLSearchParams(location.search);
            const code = searchParams.get('code') || '';
            setAuthStatus(ResponseStatus.pending);
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
    }, [foursquarePaths, location, connectToFoursquare, loginToFoursquare]);

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
