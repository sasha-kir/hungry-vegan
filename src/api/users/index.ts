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

interface UpdatedUserResponse extends UserDataResponse {
    token: string | null;
}

export const getUser = async (): Promise<UserDataResponse> => {
    try {
        const { data } = await api.get('/user_data');
        return { status: ResponseStatus.success, user: data.user };
    } catch (error) {
        return { status: ResponseStatus.error, user: null };
    }
};

export const updateUser = async (userData: UserData): Promise<UpdatedUserResponse> => {
    try {
        const { data } = await api.post('/update_user', userData);
        return { status: ResponseStatus.success, user: data.user, token: data.token };
    } catch (error) {
        return { status: ResponseStatus.error, user: null, token: null };
    }
};
