import { api, ResponseStatus, DataResponse } from 'api';
import { fetchUserLocation } from 'utils/location';

export interface UserData {
    id: number;
    username?: string;
    email: string;
    foursquareId?: string;
}

export type ExtendedUserData = UserData & { location?: string };

type UserDataResponse = DataResponse<UserData>;
type UserLocationResponse = DataResponse<string>;
interface UpdatedUserResponse extends UserDataResponse {
    token: string | null;
}

export const getUser = async (): Promise<UserDataResponse> => {
    try {
        const { data } = await api.get('/user_data');
        return { status: ResponseStatus.success, data: data.user };
    } catch (error) {
        return { status: ResponseStatus.error, data: null };
    }
};

export const getUserLocation = async (): Promise<UserLocationResponse> => {
    try {
        const coords = await fetchUserLocation();
        const { data } = await api.post('/user_location', coords);
        return { status: ResponseStatus.success, data: data.location };
    } catch (error) {
        return { status: ResponseStatus.error, data: null };
    }
};

export const updateUser = async (userData: UserData): Promise<UpdatedUserResponse> => {
    try {
        const { data } = await api.post('/update_user', userData);
        return { status: ResponseStatus.success, data: data.user, token: data.token };
    } catch (error) {
        return { status: ResponseStatus.error, data: null, token: null };
    }
};
