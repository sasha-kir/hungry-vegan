import { useQuery } from 'react-query';
import AuthApi from 'api/auth';

export function useFoursquareClientId() {
    const fetchData = async (): Promise<string> => {
        let clientId = localStorage.getItem('clientId') || '';

        if (!clientId) {
            clientId = await AuthApi.getClientId();
            localStorage.setItem('clientId', clientId);
        }
        return clientId;
    };

    return useQuery('foursquareClientId', fetchData, { retry: 3 });
}
