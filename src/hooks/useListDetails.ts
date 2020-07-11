import { useState, useEffect, useCallback } from 'react';
import { ResponseStatus } from 'api';
import { getListData, updateListItem } from 'api/lists';
import { sortByLocation } from 'utils/location';

type UpdateListItem = (item: UserListItem) => Promise<void>;
type FetchList = (listName: string) => Promise<void>;
type ListDetails = {
    list: ExtendedUserList;
    status: ResponseStatus;
};

export function useListDetails(listName: string): [FetchList, UpdateListItem, ListDetails] {
    const [list, setList] = useState<ExtendedUserList>();
    const [responseStatus, setResponseStatus] = useState<ResponseStatus>(ResponseStatus.idle);

    const sortItems = async (items: UserListItem[]): Promise<UserListItem[]> => {
        const sorted = await sortByLocation(items);
        return sorted;
    };

    const updateVenue = useCallback(async (venueDetails: UserListItem) => {
        setResponseStatus(ResponseStatus.pending);
        const { status, data: listDetails } = await updateListItem(venueDetails);
        if (status === ResponseStatus.success && listDetails !== null) {
            const sortedItems = await sortItems(listDetails.items);
            setList({ ...listDetails, items: sortedItems });
        }
        setResponseStatus(status);
    }, []);

    const fetch = useCallback(async (listName): Promise<void> => {
        setResponseStatus(ResponseStatus.pending);
        const { status, data: listDetails } = await getListData(listName);
        if (status === ResponseStatus.success && listDetails !== null) {
            const sortedItems = await sortItems(listDetails.items);
            setList({ ...listDetails, items: sortedItems });
        }
        setResponseStatus(status);
    }, []);

    useEffect(() => {
        fetch(listName);
    }, [fetch, listName]);

    return [fetch, updateVenue, { status: responseStatus, list: list as ExtendedUserList }];
}
