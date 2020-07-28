import { useState, useEffect, useCallback } from 'react';
import { ResponseStatus } from 'api';
import { getPublicLists } from 'api/lists';
import { sortByLocation } from 'utils/location';

type FetchLists = () => Promise<void>;
type ListsData = {
    lists: PublicList[];
    status: ResponseStatus;
};

export function usePublicLists(): [FetchLists, ListsData] {
    const [lists, setLists] = useState<PublicList[]>([]);
    const [responseStatus, setResponseStatus] = useState<ResponseStatus>(ResponseStatus.idle);

    const fetch = useCallback(async (): Promise<void> => {
        setResponseStatus(ResponseStatus.pending);
        const { status, data: lists } = await getPublicLists();
        if (status === ResponseStatus.success && lists !== null) {
            const sortedLists = await sortByLocation(lists as ListWithCoordinates[]);
            setLists(sortedLists);
        }
        setResponseStatus(status);
    }, []);

    useEffect(() => {
        fetch();
    }, [fetch]);

    return [fetch, { status: responseStatus, lists }];
}
