import { authApi, ResponseStatus } from '../..';
import { LoginResponse } from '..';

export const loginWithCredentials = async (loginFormData): Promise<LoginResponse> => {
    try {
        const { data } = await authApi.post('/login', loginFormData);
        return { status: ResponseStatus.success, token: data.token };
    } catch (error) {
        return { status: ResponseStatus.error, token: null };
    }
};

export const register = async (registerFormData): Promise<LoginResponse> => {
    try {
        const { data } = await authApi.post('/register', registerFormData);
        return { status: ResponseStatus.success, token: data.token };
    } catch (error) {
        return { status: ResponseStatus.error, token: null };
    }
};
