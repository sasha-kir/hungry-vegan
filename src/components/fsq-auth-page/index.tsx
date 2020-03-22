import React, { ReactElement, useState, useEffect } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import config from '../../config';
import { FsqStatus, foursquareLogin, foursquareConnect } from '../../api/foursquare';
import { FoursquareButton, FormWrapper } from '../common';
import './style.css';

function FsqAuthPage(): ReactElement {
    const [authStatus, setAuthStatus] = useState<FsqStatus>(FsqStatus.idle);
    const { authToken, handleAuth, fsqLoginPath, fsqConnectPath } = useAuth();
    const location = useLocation();
    const history = useHistory();

    const loginRedirectUrl: string = config.baseUrl + fsqLoginPath;
    const connectRedirectUrl: string = config.baseUrl + fsqConnectPath;

    const loginToFoursquare = async (code: string) => {
        setAuthStatus(FsqStatus.pending);
        const { status, token, isEmailValid } = await foursquareLogin(code, loginRedirectUrl);
        if (status === FsqStatus.success && token !== null) {
            handleAuth(token);
            const redirectPath = isEmailValid ? '/home' : '/profile?empty_email=true';
            history.push(redirectPath);
        }
        setAuthStatus(status);
    };

    const connectToFoursquare = async (code: string) => {
        setAuthStatus(FsqStatus.pending);
        const { status, token } = await foursquareConnect(code, connectRedirectUrl, authToken);
        if (status === FsqStatus.success && token !== null) {
            handleAuth(token);
            history.push('/home');
        }
        setAuthStatus(status);
    };

    useEffect(() => {
        if ([fsqLoginPath, fsqConnectPath].includes(location.pathname)) {
            const searchParams = new URLSearchParams(location.search);
            const code = searchParams.get('code') || '';
            switch (location.pathname) {
                case fsqLoginPath:
                    loginToFoursquare(code);
                    break;
                case fsqConnectPath:
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
                    <FoursquareButton style={{ margin: '50px 0' }} redirectPath={fsqLoginPath}>
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
            {authStatus === FsqStatus.pending && <p style={{ color: 'white' }}>Authorization in progress...</p>}
            {authStatus === FsqStatus.error && <p style={{ color: 'red' }}>Authentication error</p>}
            {authStatus === FsqStatus.success && <p style={{ color: 'white' }}>Redirecting you to homepage...</p>}
            {authStatus === FsqStatus.idle && renderAuthForm()}
        </div>
    );
}

export default FsqAuthPage;
