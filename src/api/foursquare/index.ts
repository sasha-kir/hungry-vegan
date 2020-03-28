import { api, ResponseStatus } from '../';

interface ListsResponse {
    status: ResponseStatus;
    listsData: object[];
}

interface ConnectResponse {
    status: ResponseStatus;
    token: string | null;
}

export const getListsData = async (): Promise<ListsResponse> => {
    try {
        const { data } = await api.get('/foursquare-lists');
        return { status: ResponseStatus.success, listsData: data.data };
    } catch (error) {
        switch (error.response?.status) {
            case 400:
                return { status: ResponseStatus.rejected, listsData: [] };
            default:
                return { status: ResponseStatus.error, listsData: [] };
        }
    }
};

export const foursquareConnect = async (code: string, redirectUrl: string): Promise<ConnectResponse> => {
    try {
        const { data } = await api.post('/foursquare-connect', {
            code,
            redirectUrl,
        });
        return { status: ResponseStatus.success, token: data.token };
    } catch (error) {
        return { status: ResponseStatus.error, token: null };
    }
};
