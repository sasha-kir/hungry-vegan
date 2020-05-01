import { api, ResponseStatus } from 'api';

interface ListsResponse {
    status: ResponseStatus;
    userLists: FoursquareList[] | null;
}

interface ListResponse {
    status: ResponseStatus;
    listData: FoursquareList | null;
}

export const getUserLists = async (): Promise<ListsResponse> => {
    try {
        const { data } = await api.get('/user_lists');
        return { status: ResponseStatus.success, userLists: data.data };
    } catch (error) {
        switch (error.response?.status) {
            case 400:
                return { status: ResponseStatus.rejected, userLists: null };
            default:
                return { status: ResponseStatus.error, userLists: null };
        }
    }
};

export const getListData = async (listId: string): Promise<ListResponse> => {
    try {
        const { data } = await api.post('/list_data', { listId });
        return { status: ResponseStatus.success, listData: data.data };
    } catch (error) {
        return { status: ResponseStatus.error, listData: null };
    }
};

export const updateUserLists = async (lists: FoursquareList[]): Promise<ListsResponse> => {
    try {
        const { data } = await api.post('/update_lists', { lists });
        return { status: ResponseStatus.success, userLists: data.data };
    } catch (error) {
        return { status: ResponseStatus.error, userLists: null };
    }
};
