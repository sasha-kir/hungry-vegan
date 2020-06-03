import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { ResponseStatus } from 'api';
import { ExtendedUserData, getUser, updateUser, getUserLocation } from 'api/user';
import { useAuth } from 'context/auth';

type UpdateUser = (user: ExtendedUserData) => Promise<void>;
type FetchUser = () => Promise<void>;
type UserDetails = {
    userInfo: ExtendedList;
    isEmailEmpty: boolean;
    responseStatus: ResponseStatus;
};

const defaultInfo: ExtendedUserData = {
    id: 0,
    username: '',
    email: '',
    foursquareId: '',
    location: '',
};

export function useUserData(): [UpdateUser, FetchUser, UserDetails] {
    const [userInfo, setUserInfo] = useState<ExtendedUserData>(defaultInfo);
    const [responseStatus, setResponseStatus] = useState<ResponseStatus>(ResponseStatus.idle);
    const [isEmailEmpty, setEmailEmpty] = useState<boolean>(false);
    const location = useLocation();
    const { handleAuth } = useAuth();

    const fetch = useCallback(async (): Promise<void> => {
        setResponseStatus(ResponseStatus.pending);
        const { status, data: user } = await getUser();
        const { status: locationStatus, data: location } = await getUserLocation();
        if (status === ResponseStatus.success && user !== null) {
            let userData: ExtendedUserData = { ...user };
            if (locationStatus === ResponseStatus.success && location !== null) {
                userData = { ...userData, location };
            }
            setUserInfo(u => ({ ...u, ...userData }));
        }
        setResponseStatus(status);
    }, []);

    const update = useCallback(
        async (updatedUserInfo: ExtendedUserData): Promise<void> => {
            setResponseStatus(ResponseStatus.pending);
            const { status, token, data: user } = await updateUser(updatedUserInfo);
            if (status === ResponseStatus.success && token !== null && user !== null) {
                handleAuth(token);
                setUserInfo(u => ({ ...u, ...user }));
            }
            setResponseStatus(status);
        },
        [handleAuth],
    );

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const emptyEmail = Boolean(searchParams.get('empty_email'));
        setEmailEmpty(emptyEmail);
        fetch();
    }, [fetch, location.search]);

    return [update, fetch, { userInfo, isEmailEmpty, responseStatus }];
}
