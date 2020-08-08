import React, { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';
import { QueryStatus } from 'react-query';

import { ExtendedUserData } from 'api/user';
import { CardWrapper, BeatLoader, LoadingError } from 'components/common';
import { useUserData } from 'hooks/useUserData';
import UserInfoForm from './components/user-info-form';
import errorIllustration from 'images/profile-empty.svg';
import './style.css';

const ProfilePage = (): React.ReactElement => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const isEmailEmpty = Boolean(searchParams.get('empty_email'));

    const [updateData, { data: userInfo, status, refetch }] = useUserData();

    const renderUserInfo = (): ReactElement => {
        return (
            <UserInfoForm
                user={userInfo as ExtendedUserData}
                emptyEmail={isEmailEmpty}
                updateData={updateData}
            />
        );
    };

    const renderErrorState = (): ReactElement => {
        return <LoadingError illustration={errorIllustration} retryMethod={refetch} />;
    };

    return (
        <div className="page-wrapper user-info-wrapper">
            <CardWrapper className="user-info-form-wrapper">
                <BeatLoader flag={status === QueryStatus.Loading} />
                {status === QueryStatus.Error && renderErrorState()}
                {status === QueryStatus.Success && renderUserInfo()}
            </CardWrapper>
        </div>
    );
};

export default ProfilePage;
