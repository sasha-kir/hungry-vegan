import React, { ReactElement, useEffect, useState } from 'react';
import axios from 'axios';

import './LoginPage.css';
import logo from '../../images/logo.svg';
import config from '../../config';

interface LoginPageProps {
    redirectUrl: string;
}

function LoginPage({ redirectUrl }: LoginPageProps): ReactElement {
    const [clientId, setClientId] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const url: string = config.apiUrl + '/foursquare-client-id';
            try {
                const { data } = await axios.get(url);
                setClientId(data.clientId);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const renderFoursquareButton = (): ReactElement => {
        const foursquareUrl = 'https://foursquare.com/oauth2/authenticate';
        const authUrl = new URL(foursquareUrl);
        authUrl.searchParams.append('client_id', clientId);
        authUrl.searchParams.append('response_type', 'code');
        authUrl.searchParams.append('redirect_uri', redirectUrl);

        return (
            <button className="login-btn">
                <a href={authUrl.href}>login with foursquare</a>
            </button>
        );
    };

    return (
        <div className="login-wrapper">
            <div className="heading">Hungry Vegan</div>
            <img className="logo" src={logo} alt="spoon and fork logo" />
            {renderFoursquareButton()}
        </div>
    );
}

export default LoginPage;
