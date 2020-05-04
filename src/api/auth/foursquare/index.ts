import { authApi, api, ResponseStatus } from 'api';
import { LoginResponse } from 'api/auth';

interface FsqLoginResponse extends LoginResponse {
    isEmailValid: boolean | null;
}

interface ConnectResponse {
    status: ResponseStatus;
    token: string | null;
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
): Promise<FsqLoginResponse> => {
    try {
        const { data } = await authApi.post('/foursquare_login', {
            code,
            redirectUrl,
        });
        const { token, isEmailValid } = data;
        return { status: ResponseStatus.success, token, isEmailValid };
    } catch (error) {
        return { status: ResponseStatus.error, token: null, isEmailValid: null };
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
        return { status: ResponseStatus.success, token: data.token };
    } catch (error) {
        return { status: ResponseStatus.error, token: null };
    }
};
