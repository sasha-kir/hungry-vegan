import { authApi, api, ResponseStatus, DataResponse } from 'api';

type ConnectResponse = DataResponse<string>;

interface LoginResponse extends ConnectResponse {
    isEmailValid: boolean | null;
}

export const getClientId = async (): Promise<string> => {
    try {
        const { data } = await api.get('/oauth_id');
        return data.clientId;
    } catch (error) {
        return '';
    }
};

export const foursquareLogin = async (
    code: string,
    redirectUrl: string,
): Promise<LoginResponse> => {
    try {
        const { data } = await authApi.post('/foursquare_login', {
            code,
            redirectUrl,
        });
        const { token, isEmailValid } = data;
        return { status: ResponseStatus.success, data: token, isEmailValid };
    } catch (error) {
        return { status: ResponseStatus.error, data: null, isEmailValid: null };
    }
};

export const foursquareConnect = async (
    code: string,
    redirectUrl: string,
): Promise<ConnectResponse> => {
    try {
        const { data } = await api.post('/foursquare_connect', {
            code,
            redirectUrl,
        });
        return { status: ResponseStatus.success, data: data.token };
    } catch (error) {
        return { status: ResponseStatus.error, data: null };
    }
};
