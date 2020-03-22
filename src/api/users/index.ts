import axios from 'axios';
import config from '../../config';

interface LoginResponse {
    token: string | null;
    error?: string;
}

export interface UserData {
    id: number;
    username?: string;
    email: string;
    foursquareId?: string;
}

interface UserDataResponse {
    user: UserData | null;
    error?: string;
}

export const loginWithCredentials = async (loginFormData): Promise<LoginResponse> => {
    const url = config.apiUrl + '/login';
    try {
        const { data } = await axios.post(url, loginFormData);
        return { token: data.token };
    } catch (error) {
        return { token: null, error: error.message };
    }
};

export const getUserData = async (authToken: string): Promise<UserDataResponse> => {
    const url = config.apiUrl + '/user_data';
    try {
        const { data } = await axios.get(url, {
            headers: {
                Authentication: authToken,
            },
        });
        return { user: data.user };
    } catch (error) {
        return { user: null, error: error.message };
    }
};
