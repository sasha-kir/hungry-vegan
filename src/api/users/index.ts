import { api, ResponseStatus } from '../';

export interface UserData {
    id: number;
    username?: string;
    email: string;
    foursquareId?: string;
    location?: string;
}

interface UserDataResponse {
    status: ResponseStatus;
    user: UserData | null;
}

export const getUserData = async (): Promise<UserDataResponse> => {
    try {
        const { data } = await api.get('/user_data');
        return { status: ResponseStatus.success, user: data.user };
    } catch (error) {
        return { status: ResponseStatus.error, user: null };
    }
};
