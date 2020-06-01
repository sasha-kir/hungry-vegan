import { useState, useEffect, useCallback } from 'react';
import { ResponseStatus } from 'api';
import { getUserLists, updateUserLists } from 'api/lists';
import { sortByLocation } from 'utils/location';

type UpdateLists = (lists: UserList[]) => Promise<void>;
type FetchLists = () => Promise<void>;
type ListsData = {
    lists: UserList[];
    status: ResponseStatus;
};

export function useLists(): [FetchLists, UpdateLists, ListsData] {
    const [lists, setLists] = useState<UserList[]>([]);
    const [responseStatus, setResponseStatus] = useState<ResponseStatus>(ResponseStatus.idle);

    const partitionLists = async (userLists: UserList[]): Promise<UserList[]> => {
        const [noLocation, withLocation] = userLists.reduce(
            (res: UserList[][], list) => {
                list.coordinates === null ? res[0].push(list) : res[1].push(list);
                return res;
            },
            [[], []],
        );
        const sortedLists = await sortByLocation(withLocation);
        return [...sortedLists, ...noLocation];
    };

    const update = useCallback(async (lists: UserList[]) => {
        setResponseStatus(ResponseStatus.pending);
        const { status, data: userLists } = await updateUserLists(lists);
        if (status === ResponseStatus.success && userLists !== null) {
            const partitionedLists = await partitionLists(userLists);
            setLists(partitionedLists);
        }
        setResponseStatus(status);
    }, []);

    const fetch = useCallback(async (): Promise<void> => {
        setResponseStatus(ResponseStatus.pending);
        const { status, data: userLists } = await getUserLists();
        if (status === ResponseStatus.success && userLists !== null) {
            const partitionedLists = await partitionLists(userLists);
            setLists(partitionedLists);
        }
        setResponseStatus(status);
    }, []);

    useEffect(() => {
        fetch();
    }, [fetch]);

    return [fetch, update, { status: responseStatus, lists }];
}
