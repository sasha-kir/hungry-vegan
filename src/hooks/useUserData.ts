import { useState, useEffect } from 'react';
import { useQuery, useMutation, queryCache, QueryStatus } from 'react-query';

import { UserData, ExtendedUserData, getUser, updateUser, getUserLocation } from 'api/user';
import { useAuth } from 'context/auth';

type UpdateUser = (user: ExtendedUserData) => Promise<UserData | undefined>;
type UserInfo = {
    data?: ExtendedUserData;
    status: QueryStatus;
    refetch(): void;
};

const defaultInfo: ExtendedUserData = {
    id: 0,
    username: '',
    email: '',
    foursquareId: '',
    location: '',
};

const useUserInfo = () => {
    const fetchData = async (): Promise<ExtendedUserData | undefined> => {
        const user = await getUser();
        if (!user) {
            return undefined;
        }

        const locationData = await getUserLocation();
        let userInfo: ExtendedUserData = { ...user };
        if (locationData) {
            userInfo = { ...userInfo, location: locationData || '' };
        }

        return userInfo;
    };

    return useQuery('userData', fetchData);
};

const useUpdateUser = () => {
    const { handleAuth } = useAuth();

    const update = async (updatedUserInfo: ExtendedUserData): Promise<UserData | undefined> => {
        const { token, data: user } = await updateUser(updatedUserInfo);
        if (!token || !user) {
            return undefined;
        }
        handleAuth(token);
        return user;
    };

    return useMutation(update, {
        onSuccess: (data) => {
            queryCache.setQueryData('userData', (current: ExtendedUserData | undefined) => {
                const user = current ? current : defaultInfo;
                return data ? { ...user, ...data } : user;
            });
        },
    });
};

export function useUserData(): [UpdateUser, UserInfo] {
    const [status, setStatus] = useState<QueryStatus>(QueryStatus.Idle);

    const { data, status: queryStatus, refetch } = useUserInfo();
    const [updateData, { status: mutationStatus }] = useUpdateUser();

    useEffect(() => {
        if (queryStatus === QueryStatus.Loading || mutationStatus === QueryStatus.Loading) {
            setStatus(QueryStatus.Loading);
            return;
        }
        if (queryStatus === QueryStatus.Error || mutationStatus === QueryStatus.Error) {
            setStatus(QueryStatus.Error);
            return;
        }
        if (queryStatus === QueryStatus.Success || mutationStatus === QueryStatus.Success) {
            setStatus(QueryStatus.Success);
            return;
        }
    }, [queryStatus, mutationStatus]);

    return [updateData, { data, status, refetch }];
}
