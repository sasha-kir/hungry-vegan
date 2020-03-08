import React, { ReactElement, useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import config from '../../config';
import { FancyButton } from '../common';
import './FsqAuthPage.css';

interface FsqAuthPageProps {
    fsqAuthRoute: string;
}

enum FsqAuthStatus {
    idle,
    pending,
    success,
    error,
}

function FsqAuthPage({ fsqAuthRoute }: FsqAuthPageProps): ReactElement {
    const [authStatus, setAuthStatus] = useState<FsqAuthStatus>(FsqAuthStatus.idle);
    const [clientId, setClientId] = useState<string>('');
    const { handleAuth } = useAuth();
    const location = useLocation();
    const history = useHistory();
    const redirectUrl: string = config.baseUrl + fsqAuthRoute;

    const fetchAuthData = async () => {
        const url: string = config.apiUrl + '/foursquare-client-id';
        try {
            const { data } = await axios.get(url);
            setClientId(data.clientId);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchToken = async (code: string) => {
        const url = config.apiUrl + '/foursquare-token';
        setAuthStatus(FsqAuthStatus.pending);
        try {
            const { data } = await axios.post(url, {
                code,
                redirectUrl,
                userId: 1,
            });
            setAuthStatus(FsqAuthStatus.success);
            handleAuth(data.token);
            history.push('/home');
        } catch (error) {
            setAuthStatus(FsqAuthStatus.error);
            console.error('Auth error!');
        }
    };

    useEffect(() => {
        if (location.pathname === fsqAuthRoute) {
            const searchParams = new URLSearchParams(location.search);
            const code = searchParams.get('code') || '';
            fetchToken(code);
        } else {
            fetchAuthData();
        }
    }, []);

    const renderFoursquareButton = (): ReactElement => {
        const foursquareUrl = 'https://foursquare.com/oauth2/authenticate';
        const authUrl = new URL(foursquareUrl);
        authUrl.searchParams.append('client_id', clientId);
        authUrl.searchParams.append('response_type', 'code');
        authUrl.searchParams.append('redirect_uri', redirectUrl);

        return (
            <FancyButton className="fsq-btn">
                <a href={authUrl.href}>login with foursquare</a>
            </FancyButton>
        );
    };

    return (
        <div>
            {authStatus === FsqAuthStatus.pending && <p style={{ color: 'white' }}>Authorization in progress...</p>}
            {authStatus === FsqAuthStatus.error && <p style={{ color: 'red' }}>Authentication error</p>}
            {authStatus === FsqAuthStatus.success && <p style={{ color: 'white' }}>Redirecting you to homepage...</p>}
            {authStatus === FsqAuthStatus.idle && <p style={{ color: 'white' }}>{renderFoursquareButton()}</p>}
        </div>
    );
}

export default FsqAuthPage;
