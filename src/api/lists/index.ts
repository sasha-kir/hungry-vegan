import { publicApi, api, ResponseStatus, DataResponse } from 'api';

type ListsResponse = DataResponse<UserList[]>;
type PublicListsResponse = DataResponse<PublicList[]>;
type ListResponse = DataResponse<ExtendedUserList>;

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

export const getPublicLists = async (): Promise<PublicListsResponse> => {
    try {
        const { data } = await publicApi.get('/public_lists');
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

export const getListData = async (owner: string, listName: string): Promise<ListResponse> => {
    const { data } = await publicApi.post('/public_list_data', { owner, listName });
    return { status: ResponseStatus.success, data: data.data };
};

export const updateUserLists = async (lists: UserList[]): Promise<ListsResponse> => {
    try {
        const { data } = await api.post('/update_lists', { lists });
        return { status: ResponseStatus.success, data: data.data };
    } catch (error) {
        return { status: ResponseStatus.error, data: null };
    }
};

export const updateListItem = async (venueDetails: UserListItem): Promise<ListResponse> => {
    const { data } = await api.post('/update_venue_details', { ...venueDetails });
    return { status: ResponseStatus.success, data: data.data };
};
