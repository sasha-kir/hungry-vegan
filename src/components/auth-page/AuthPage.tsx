import React, { ReactElement, useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';

interface AuthPageProps {
    handleAuth(): void;
    redirectUrl: string;
}

function AuthPage({ handleAuth, redirectUrl }: AuthPageProps): ReactElement {
    const [isLoading, setLoading] = useState(true);
    const [isError, setError] = useState(false);
    const [token, setToken] = useState('');
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get('code');

        const fetchToken = async () => {
            const url = config.apiUrl + '/foursquare-token';
            try {
                const { data } = await axios.post(url, {
                    code,
                    redirectUrl,
                });
                setLoading(false);
                setToken(data.accessToken);
                handleAuth();
                history.push('/');
            } catch (error) {
                setError(true);
                setLoading(false);
                console.error('Auth error!');
            }
        };

        fetchToken();
    }, [handleAuth, redirectUrl]);

    return (
        <div>
            {isLoading && <p style={{ color: 'white' }}>Authorization in progress...</p>}
            {token !== '' && <p style={{ color: 'white' }}>Redirecting you to homepage...</p>}
            {isError && <p style={{ color: 'red' }}>Authentication error</p>}
        </div>
    );
}

export default AuthPage;
