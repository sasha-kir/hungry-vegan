import React, { useState, useEffect, ReactElement } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

import { ResponseStatus } from '../../api';
import { UserData, getUserData } from '../../api/users';
import { FancyButton, FormInput, FormWrapper } from '../common';
import placeholder from '../../images/watering_plant.svg';
import './style.css';

const defaultInfo: UserData = {
    id: 0,
    username: '',
    email: '',
    foursquareId: '',
    location: '',
};

const ProfilePage = (): React.ReactElement => {
    const [userInfo, setUserInfo] = useState<UserData>(defaultInfo);
    const [isEditingMode, setEditingMode] = useState<boolean>(false);
    const [isEmailError, setEmailError] = useState<boolean>(false);
    const [isEmailEmpty, setEmailEmpty] = useState<boolean>(false);
    const [dataStatus, setDataStatus] = useState<ResponseStatus>(ResponseStatus.pending);
    const { setValue, control, watch } = useForm();
    const location = useLocation();

    const getEmailError = (): string | undefined => {
        if (isEmailError && isEmailEmpty) {
            setValue('email', '');
            return 'Please fill in your email';
        }
    };

    const clearEmailError = (): void => {
        setEmailError(false);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            setDataStatus(ResponseStatus.pending);
            const { status, user } = await getUserData();
            setDataStatus(status);
            if (status === ResponseStatus.success && user !== null) {
                const userData = { ...userInfo, ...user };
                setUserInfo(userData);
                const formValues = Object.keys(userData).map(key => ({
                    [key]: userData[key],
                }));
                setValue(formValues);
            }
        };
        const searchParams = new URLSearchParams(location.search);
        const emptyEmail = Boolean(searchParams.get('empty_email'));
        setEmailEmpty(emptyEmail);
        setEmailError(emptyEmail);
        fetchUserData();
    }, []);

    const renderActionsButton = (text: string, handler): ReactElement => {
        return (
            <FancyButton onClick={handler} className="user-info-actions-btn">
                {text}
            </FancyButton>
        );
    };

    const renderEditButton = (): ReactElement => {
        const handleClick = e => {
            e.preventDefault();
            clearEmailError();
            setEditingMode(true);
        };
        return renderActionsButton('edit', handleClick);
    };

    const renderSaveButton = (): ReactElement => {
        const handleClick = e => {
            e.preventDefault();
            console.log(watch());
            if (isEmailEmpty) setEmailError(true);
            setEditingMode(false);
        };
        return renderActionsButton('save', handleClick);
    };

    const renderUserInfo = (): ReactElement => {
        return (
            <div className="page-wrapper user-info-wrapper">
                <FormWrapper className="user-info-form-wrapper">
                    <div className="user-info-content">
                        <div className="user-info-header">
                            <div className="username">{userInfo.username}</div>
                            <div className="foursquare-status">
                                {userInfo.foursquareId !== '' ? (
                                    <p>
                                        <i className="fi-check"></i> Authorized on Foursquare
                                    </p>
                                ) : (
                                    <p>No Foursquare account connected</p>
                                )}
                            </div>
                        </div>
                        <form className="user-info-form" onSubmit={() => false}>
                            <Controller
                                as={FormInput}
                                name="email"
                                control={control}
                                disabled={!isEditingMode}
                                errorMessage={getEmailError()}
                                onFocus={clearEmailError}
                                setValue={setValue}
                            />
                            <Controller
                                as={FormInput}
                                name="location"
                                control={control}
                                disabled={!isEditingMode}
                                setValue={setValue}
                            />
                            {isEditingMode ? renderSaveButton() : renderEditButton()}
                        </form>
                    </div>
                    <div className="user-info-placeholder">
                        <img src={placeholder} alt="person planting tree" />
                    </div>
                </FormWrapper>
            </div>
        );
    };

    return (
        <div>
            {dataStatus === ResponseStatus.error && <p style={{ color: 'red' }}>Error fetching user info</p>}
            {dataStatus === ResponseStatus.success && renderUserInfo()}
        </div>
    );
};

export default ProfilePage;
