import { api, ResponseStatus, DataResponse } from 'api';

type ListsResponse = DataResponse<UserList[]>;
type ListResponse = DataResponse<UserList>;

export const getUserLists = async (): Promise<ListsResponse> => {
    try {
        const { data } = await api.get('/user_lists');
        return { status: ResponseStatus.success, data: data.data };
    } catch (error) {
        switch (error.response?.status) {
            case 400:
                return { status: ResponseStatus.rejected, data: null };
            default:
                return { status: ResponseStatus.error, data: null };
        }
    }
};

export const getListData = async (listId: string): Promise<ListResponse> => {
    try {
        const { data } = await api.post('/list_data', { listId });
        return { status: ResponseStatus.success, data: data.data };
    } catch (error) {
        return { status: ResponseStatus.error, data: null };
    }
};

export const updateUserLists = async (lists: UserList[]): Promise<ListsResponse> => {
    try {
        const { data } = await api.post('/update_lists', { lists });
        return { status: ResponseStatus.success, data: data.data };
    } catch (error) {
        return { status: ResponseStatus.error, data: null };
    }
};
