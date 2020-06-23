import React, { ReactElement } from 'react';
import { ResponseStatus } from 'api';
import { FancyButton, CardWrapper, BeatLoader } from 'components/common';
import { useUserData } from 'hooks/useUserData';
import UserInfoForm from './components/user-info-form';
import errorIllustration from 'images/profile-empty.svg';
import './style.css';

const ProfilePage = (): React.ReactElement => {
    const [updateData, fetchData, { userInfo, isEmailEmpty, responseStatus }] = useUserData();

    const renderUserInfo = (): ReactElement => {
        return <UserInfoForm user={userInfo} emptyEmail={isEmailEmpty} updateData={updateData} />;
    };

    const renderErrorState = (): ReactElement => {
        return (
            <div className="user-info-error">
                <img src={errorIllustration} alt="personal profile card" />
                <div className="error-message">Something went wrong!</div>
                <FancyButton styleType="small" onClick={fetchData}>
                    retry
                </FancyButton>
            </div>
        );
    };

    return (
        <div className="page-wrapper user-info-wrapper">
            <CardWrapper className="user-info-form-wrapper">
                <BeatLoader flag={responseStatus === ResponseStatus.pending} />
                {responseStatus === ResponseStatus.error && renderErrorState()}
                {responseStatus === ResponseStatus.success && renderUserInfo()}
            </CardWrapper>
        </div>
    );
};

export default ProfilePage;
