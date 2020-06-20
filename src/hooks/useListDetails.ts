import { useState, useEffect, useCallback } from 'react';
import { ResponseStatus } from 'api';
import { getListData } from 'api/lists';
// import { sortByLocation } from 'utils/location';

// type UpdateLists = (lists: UserList[]) => Promise<void>;
// type FetchList = (listName: string) => Promise<void>;
type ListsDetails = {
    list: ExtendedUserList;
    status: ResponseStatus;
};

export function useListDetails(listName: string): ListsDetails {
    const [list, setList] = useState<ExtendedUserList>();
    const [responseStatus, setResponseStatus] = useState<ResponseStatus>(ResponseStatus.idle);

    const fetch = useCallback(async (listName): Promise<void> => {
        setResponseStatus(ResponseStatus.pending);
        const { status, data: listDetails } = await getListData(listName);
        if (status === ResponseStatus.success && listDetails !== null) {
            setList(listDetails);
        }
        setResponseStatus(status);
    }, []);

    useEffect(() => {
        fetch(listName);
    }, [fetch, listName]);

    return { status: responseStatus, list: list as ExtendedUserList };
}
