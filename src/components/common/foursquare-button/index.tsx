import React, { ReactElement, useEffect, useState } from 'react';

import { FancyButton } from 'components/common';
import { getClientId } from 'api/auth';
import config from 'config';
import './style.css';

interface FsqButtonProps extends React.HTMLProps<HTMLButtonElement> {
    redirectPath: string;
}

const FoursquareButton = ({
    redirectPath,
    children,
    className,
    style,
}: FsqButtonProps): ReactElement<HTMLButtonElement> => {
    const [clientId, setClientId] = useState<string>('');

    useEffect(() => {
        const fetchAuthData = async () => {
            const clientId = await getClientId();
            setClientId(clientId);
        };
        fetchAuthData();
    }, []);

    const foursquareUrl = 'https://foursquare.com/oauth2/authenticate';
    const redirectUrl: string = config.baseUrl + redirectPath;

    const authUrl = new URL(foursquareUrl);
    authUrl.searchParams.append('client_id', clientId);
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('redirect_uri', redirectUrl);

    return (
        <FancyButton style={style} className={`foursquare-btn ${className}`}>
            <a className="foursquare-link" href={authUrl.href}>
                {children}
            </a>
        </FancyButton>
    );
};

export default FoursquareButton;
