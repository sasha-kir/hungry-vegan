import axios from 'axios';
import config from '../../config';

export enum FsqStatus {
    idle,
    pending,
    success,
    rejected,
    unauthorized,
    error,
}

interface ListsResponse {
    status: FsqStatus;
    listsData: object[];
}

interface LoginResponse {
    status: FsqStatus;
    token: string | null;
    isEmailValid: boolean | null;
}

interface ConnectResponse {
    status: FsqStatus;
    token: string | null;
}

export const getListsData = async (authToken: string): Promise<ListsResponse> => {
    const url = config.apiUrl + '/foursquare-lists';
    try {
        const { data } = await axios.get(url, {
            headers: {
                Authentication: authToken,
            },
        });
        return { status: FsqStatus.success, listsData: data.data };
    } catch (error) {
        switch (error.response?.status) {
            case 400:
                return { status: FsqStatus.rejected, listsData: [] };
            case 401:
                return { status: FsqStatus.unauthorized, listsData: [] };
            default:
                return { status: FsqStatus.error, listsData: [] };
        }
    }
};

export const foursquareLogin = async (code: string, redirectUrl: string): Promise<LoginResponse> => {
    const url = config.apiUrl + '/foursquare-login';
    try {
        const { data } = await axios.post(url, {
            code,
            redirectUrl,
        });
        const { token, isEmailValid } = data;
        return { status: FsqStatus.success, token, isEmailValid };
    } catch (error) {
        return { status: FsqStatus.error, token: null, isEmailValid: null };
    }
};

export const foursquareConnect = async (
    code: string,
    redirectUrl: string,
    authToken: string | null,
): Promise<ConnectResponse> => {
    const url = config.apiUrl + '/foursquare-connect';
    try {
        const { data } = await axios.post(
            url,
            {
                code,
                redirectUrl,
            },
            {
                headers: {
                    Authentication: authToken,
                },
            },
        );
        return { status: FsqStatus.success, token: data.token };
    } catch (error) {
        return { status: FsqStatus.error, token: null };
    }
};
