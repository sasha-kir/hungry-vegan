import { useState, useEffect } from 'react';
import AuthApi from 'api/auth';

export function useFoursquareClientId(): string {
    const initialClientId = () => localStorage.getItem('clientId') || '';
    const [clientId, setClientId] = useState<string>(initialClientId);

    useEffect(() => {
        const fetchData = async () => {
            const clientId = await AuthApi.getClientId();
            localStorage.setItem('clientId', clientId);
            setClientId(clientId);
        };
        if (!clientId) {
            fetchData();
        }
    }, [clientId]);

    return clientId;
}
