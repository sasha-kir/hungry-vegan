import { authApi, ResponseStatus } from '../';

interface LoginResponse {
    status: ResponseStatus;
    token: string | null;
}

interface FsqLoginResponse extends LoginResponse {
    isEmailValid: boolean | null;
}

export const foursquareLogin = async (code: string, redirectUrl: string): Promise<FsqLoginResponse> => {
    try {
        const { data } = await authApi.post('/foursquare-login', {
            code,
            redirectUrl,
        });
        const { token, isEmailValid } = data;
        return { status: ResponseStatus.success, token, isEmailValid };
    } catch (error) {
        return { status: ResponseStatus.error, token: null, isEmailValid: null };
    }
};

export const loginWithCredentials = async (loginFormData): Promise<LoginResponse> => {
    try {
        const { data } = await authApi.post('/login', loginFormData);
        return { status: ResponseStatus.success, token: data.token };
    } catch (error) {
        return { status: ResponseStatus.error, token: null };
    }
};
