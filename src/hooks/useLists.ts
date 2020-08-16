import { useState, useEffect } from 'react';
import { useQuery, useMutation, queryCache, QueryStatus } from 'react-query';
import { getUserLists, updateUserLists, ListsQueryResponse } from 'api/lists';
import { sortByLocation } from 'utils/location';

type ListsStatus = QueryStatus | 'rejected';

type UpdateLists = (lists: UserList[]) => Promise<UserList[] | undefined>;
type ListsInfo = {
    data?: UserList[];
    status: ListsStatus;
    refetch(): void;
};

const partitionLists = async (userLists: UserList[]): Promise<UserList[]> => {
    const [noLocation, withLocation] = userLists.reduce(
        (res: UserList[][], list) => {
            list.coordinates === null ? res[0].push(list) : res[1].push(list);
            return res;
        },
        [[], []],
    );
    const sortedLists = await sortByLocation(withLocation as ListWithCoordinates[]);
    return [...sortedLists, ...noLocation];
};

const useListsData = () => {
    const fetchData = async (): Promise<ListsQueryResponse> => {
        const { rejected, data: userLists } = await getUserLists();
        if (!userLists) {
            return { rejected, data: [] };
        }
        const partitionedLists = await partitionLists(userLists);
        return { rejected, data: partitionedLists };
    };

    return useQuery('userLists', fetchData);
};

const useUpdateLists = () => {
    const updateLists = async (lists: UserList[]): Promise<UserList[]> => {
        const userLists = await updateUserLists(lists);
        if (!userLists) {
            return [];
        }
        const partitionedLists = await partitionLists(userLists);
        return partitionedLists;
    };

    return useMutation(updateLists, {
        onSuccess: (data) => {
            queryCache.setQueryData('userLists', { rejected: false, data });
        },
    });
};

export function useLists(): [UpdateLists, ListsInfo] {
    const [status, setStatus] = useState<ListsStatus>(QueryStatus.Idle);

    const { data, status: queryStatus, refetch } = useListsData();
    const [updateLists, { status: mutationStatus, reset: resetUpdate }] = useUpdateLists();

    const rejected = data?.rejected || false;

    useEffect(() => {
        if (queryStatus === QueryStatus.Loading || mutationStatus === QueryStatus.Loading) {
            setStatus(QueryStatus.Loading);
            return;
        }
        if (queryStatus === QueryStatus.Error || mutationStatus === QueryStatus.Error) {
            setStatus(QueryStatus.Error);
            return;
        }
        if (rejected) {
            setStatus('rejected');
            return;
        }
        if (queryStatus === QueryStatus.Success || mutationStatus === QueryStatus.Success) {
            setStatus(QueryStatus.Success);
            return;
        }
    }, [queryStatus, mutationStatus, rejected]);

    const retryQuery = () => {
        resetUpdate();
        refetch();
    };

    return [updateLists, { data: data?.data, status, refetch: retryQuery }];
}
