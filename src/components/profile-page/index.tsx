import React, { useState, useEffect, useCallback, ReactElement } from 'react';
import { useLocation } from 'react-router-dom';

import { useAuth } from 'context/auth';
import { ResponseStatus } from 'api';
import { ExtendedUserData, getUser, updateUser, getUserLocation } from 'api/user';
import { FancyButton, FormWrapper, BeatLoader } from 'components/common';
import UserInfoForm from './user-info-form';
import errorIllustration from 'images/profile-empty.svg';
import './style.css';

const defaultInfo: ExtendedUserData = {
    id: 0,
    username: '',
    email: '',
    foursquareId: '',
    location: '',
};

const ProfilePage = (): React.ReactElement => {
    const [userInfo, setUserInfo] = useState<ExtendedUserData>(defaultInfo);
    const [isEmailEmpty, setEmailEmpty] = useState<boolean>(false);
    const [dataStatus, setDataStatus] = useState<ResponseStatus>(ResponseStatus.pending);
    const location = useLocation();
    const { handleAuth } = useAuth();

    const fetchUserData = useCallback(async (): Promise<void> => {
        setDataStatus(ResponseStatus.pending);
        const { status, data: user } = await getUser();
        const { status: locationStatus, data: location } = await getUserLocation();
        setDataStatus(status);
        if (status === ResponseStatus.success && user !== null) {
            let userData: ExtendedUserData = { ...user };
            if (locationStatus === ResponseStatus.success && location !== null) {
                userData = { ...userData, location };
            }
            setUserInfo(u => ({ ...u, ...userData }));
        }
    }, []);

    const updateUserData = async (updatedUserInfo: ExtendedUserData): Promise<void> => {
        setDataStatus(ResponseStatus.pending);
        const { status, token, data: user } = await updateUser(updatedUserInfo);
        setDataStatus(status);
        if (status === ResponseStatus.success && token !== null && user !== null) {
            handleAuth(token);
            const userData = { ...userInfo, ...user };
            setUserInfo(userData);
        }
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const emptyEmail = Boolean(searchParams.get('empty_email'));
        setEmailEmpty(emptyEmail);
        fetchUserData();
    }, [fetchUserData, location.search]);

    const renderUserInfo = (): ReactElement => {
        return (
            <UserInfoForm user={userInfo} emptyEmail={isEmailEmpty} updateData={updateUserData} />
        );
    };

    const renderErrorState = (): ReactElement => {
        return (
            <div className="user-info-error">
                <img src={errorIllustration} alt="personal profile card" />
                <div className="error-message">Something went wrong!</div>
                <FancyButton styleType="small" onClick={fetchUserData}>
                    retry
                </FancyButton>
            </div>
        );
    };

    return (
        <div className="page-wrapper user-info-wrapper">
            <FormWrapper className="user-info-form-wrapper">
                <BeatLoader flag={dataStatus === ResponseStatus.pending} />
                {dataStatus === ResponseStatus.error && renderErrorState()}
                {dataStatus === ResponseStatus.success && renderUserInfo()}
            </FormWrapper>
        </div>
    );
};

export default ProfilePage;
