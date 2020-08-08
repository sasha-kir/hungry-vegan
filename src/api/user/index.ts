import { api } from 'api';
import { fetchUserLocation } from 'utils/location';

export interface UserData {
    id: number;
    username?: string;
    email: string;
    foursquareId?: string;
}

export type ExtendedUserData = UserData & { location?: string };

interface UpdatedUserResponse {
    data: UserData | undefined;
    token: string | undefined;
}

export const getUser = async (): Promise<UserData | undefined> => {
    const { data } = await api.get('/user_data');
    return data?.user;
};

export const getUserLocation = async (): Promise<string | undefined> => {
    const coords = await fetchUserLocation();
    const { data } = await api.post('/user_location', coords);
    return data?.location;
};

export const updateUser = async (userData: UserData): Promise<UpdatedUserResponse> => {
    const { data } = await api.post('/update_user', userData);
    return { data: data?.user, token: data?.token };
};
