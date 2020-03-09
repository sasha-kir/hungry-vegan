import React, { ReactElement, useState, useEffect } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import config from '../../config';
import { FoursquareButton, FormWrapper } from '../common';
import './style.css';

enum FsqAuthStatus {
    idle,
    pending,
    success,
    error,
}

function FsqAuthPage(): ReactElement {
    const [authStatus, setAuthStatus] = useState<FsqAuthStatus>(FsqAuthStatus.idle);
    const { authToken, handleAuth, fsqAuthRoute } = useAuth();
    const location = useLocation();
    const history = useHistory();
    const redirectUrl: string = config.baseUrl + fsqAuthRoute;

    const connectToFoursquare = async (code: string) => {
        const url = config.apiUrl + '/foursquare-connect';
        setAuthStatus(FsqAuthStatus.pending);
        try {
            const { data } = await axios.post(
                url,
                {
                    code,
                    redirectUrl,
                },
                {
                    headers: {
                        Authentication: authToken,
                    },
                },
            );
            setAuthStatus(FsqAuthStatus.success);
            console.log(data);
            handleAuth(data.token);
            history.push('/home');
        } catch (error) {
            setAuthStatus(FsqAuthStatus.error);
            console.error(error);
        }
    };

    useEffect(() => {
        if (location.pathname === fsqAuthRoute) {
            const searchParams = new URLSearchParams(location.search);
            const code = searchParams.get('code') || '';
            connectToFoursquare(code);
        }
    }, []);

    const renderAuthForm = (): ReactElement => {
        return (
            <div className="fsq-login-wrapper">
                <FormWrapper className="fsq-form-wrapper">
                    <FoursquareButton>login with foursquare</FoursquareButton>
                    <Link to="/login">Login to existing account</Link>
                    <Link to="/register">Register</Link>
                </FormWrapper>
            </div>
        );
    };

    return (
        <div>
            {authStatus === FsqAuthStatus.pending && <p style={{ color: 'white' }}>Authorization in progress...</p>}
            {authStatus === FsqAuthStatus.error && <p style={{ color: 'red' }}>Authentication error</p>}
            {authStatus === FsqAuthStatus.success && <p style={{ color: 'white' }}>Redirecting you to homepage...</p>}
            {authStatus === FsqAuthStatus.idle && renderAuthForm()}
        </div>
    );
}

export default FsqAuthPage;
