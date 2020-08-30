import { useQuery, useMutation, queryCache } from 'react-query';
import { getListData, updateListItem, invalidateListData } from 'api/lists';
import { sortByLocation } from 'utils/location';

interface ListIdentifier {
    listOwner: string;
    listName: string;
}

const sortItems = async (items: UserListItem[]): Promise<UserListItem[]> => {
    const sorted = await sortByLocation(items);
    return sorted;
};

export function useListDataQuery({ listOwner, listName }: ListIdentifier) {
    const fetchListData = async (
        _key: string,
        { listOwner, listName }: ListIdentifier,
    ): Promise<UserList | null> => {
        const listDetails = await getListData(listOwner, listName);

        if (!listDetails) {
            return null;
        }

        const sortedItems = await sortItems(listDetails.items);
        return { ...listDetails, items: sortedItems };
    };

    return useQuery(['listDetails', { listOwner, listName }], fetchListData);
}

export const useListItemMutation = () => {
    const updateItem = async (itemDetails: UserListItem): Promise<UserList | null> => {
        const listDetails = await updateListItem(itemDetails);
        if (!listDetails) {
            return null;
        }
        const sortedItems = await sortItems(listDetails.items);
        return { ...listDetails, items: sortedItems };
    };

    return useMutation(updateItem, {
        onSuccess: (data) => {
            queryCache.setQueryData(
                ['listDetails', { listOwner: data?.owner, listName: data?.name }],
                data,
            );
        },
    });
};

export function useListDataRefresh() {
    const invalidateListDetails = async ({
        listOwner,
        listName,
    }: ListIdentifier): Promise<boolean | null> => {
        const success = await invalidateListData(listOwner, listName);
        queryCache.invalidateQueries('listDetails');
        return Boolean(success);
    };

    return useMutation(invalidateListDetails);
}
