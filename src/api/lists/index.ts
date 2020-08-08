import { publicApi, api } from 'api';

export type ListsQueryResponse = {
    rejected: boolean;
    data: UserList[];
};

export const getUserLists = async (): Promise<ListsQueryResponse> => {
    try {
        const { data } = await api.get('/user_lists');
        return { rejected: false, data: data?.data };
    } catch (error) {
        if (error.response?.status === 400) {
            return { rejected: true, data: [] };
        }
        throw error;
    }
};

export const getPublicLists = async (): Promise<PublicList[]> => {
    const { data } = await publicApi.get('/public_lists');
    return data?.data || [];
};

export const getListData = async (
    owner: string,
    listName: string,
): Promise<ExtendedUserList | undefined> => {
    const { data } = await publicApi.post('/public_list_data', { owner, listName });
    return data?.data;
};

export const updateUserLists = async (lists: UserList[]): Promise<UserList[]> => {
    const { data } = await api.post('/update_lists', { lists });
    return data?.data || [];
};

export const updateListItem = async (
    venueDetails: UserListItem,
): Promise<ExtendedUserList | undefined> => {
    const { data } = await api.post('/update_venue_details', { ...venueDetails });
    return data?.data;
};
