import React, { useState, useEffect, useCallback, ReactElement } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

import { ResponseStatus } from 'api';
import { UserData, getUser, updateUser } from 'api/user';
import { FancyButton, FormInput, FormWrapper } from 'components/common';
import ProfileHeader from './header';
import ProfileActions from './profile-actions';
import { useAuth } from 'context/auth';
import { emailPattern } from 'utils/validation/patterns';

import illustration from 'images/watering-plant.svg';
import errorIllustration from 'images/profile-empty.svg';
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
    const [isEmailEmpty, setEmailEmpty] = useState<boolean>(false);
    const [dataStatus, setDataStatus] = useState<ResponseStatus>(ResponseStatus.pending);
    const { setValue, errors, control, watch, triggerValidation, clearError } = useForm();
    const location = useLocation();
    const { handleAuth } = useAuth();

    const getEmailError = (): string | undefined => {
        if (errors.email) {
            return errors.email['message'];
        }
        if (isEmailEmpty || userInfo.username === userInfo.email) {
            setValue('email', '');
            return 'Please fill in your email';
        }
    };

    const clearEmailError = (): void => {
        clearError();
        setEmailEmpty(false);
    };

    const setFormValues = (userData: UserData) => {
        const formValues = Object.keys(userData).map(key => ({
            [key]: userData[key],
        }));
        setValue(formValues);
    };

    const fetchUserData = async () => {
        setDataStatus(ResponseStatus.pending);
        const { status, user } = await getUser();
        setDataStatus(status);
        if (status === ResponseStatus.success && user !== null) {
            const userData = { ...userInfo, ...user };
            setUserInfo(userData);
            setFormValues(userData);
        }
    };

    const updateUserData = async (updatedUserInfo: UserData) => {
        setDataStatus(ResponseStatus.pending);
        const { status, token, user } = await updateUser(updatedUserInfo);
        setDataStatus(status);
        if (status === ResponseStatus.success && token !== null && user !== null) {
            handleAuth(token);
            const userData = { ...userInfo, ...user };
            setUserInfo(userData);
            setFormValues(userData);
        } else {
            setFormValues(userInfo);
        }
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const emptyEmail = Boolean(searchParams.get('empty_email'));
        setEmailEmpty(emptyEmail);
        fetchUserData();
    }, []);

    const handleStartEdit = () => {
        clearEmailError();
        setEditingMode(true);
    };

    const handleSaveEdit = async () => {
        const isFormValid = await triggerValidation();
        if (isFormValid) {
            const updatedValues = watch();
            const isDirty = Object.keys(updatedValues).some(
                key => userInfo[key] !== updatedValues[key],
            );
            if (isDirty) {
                await updateUserData({ ...userInfo, ...updatedValues });
            }
            setEditingMode(false);
        }
    };

    const handleCancelEdit = () => {
        setFormValues(userInfo);
        setEditingMode(false);
    };

    const renderUserInfo = (): ReactElement => {
        return (
            <div className="user-info-content">
                <div className="user-info-content-main">
                    <ProfileHeader user={userInfo} />
                    <form className="user-info-form" autoComplete="off" onSubmit={() => false}>
                        <Controller
                            as={FormInput}
                            name="email"
                            control={control}
                            disabled={!isEditingMode}
                            rules={{
                                required: 'Required field',
                                pattern: { value: emailPattern, message: 'Invalid email' },
                            }}
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
                        <ProfileActions
                            isEditingMode={isEditingMode}
                            handleStartEdit={handleStartEdit}
                            handleSave={handleSaveEdit}
                            handleCancel={handleCancelEdit}
                        />
                    </form>
                </div>
                <div className="user-info-placeholder">
                    <img src={illustration} alt="person planting tree" />
                </div>
            </div>
        );
    };

    const renderErrorState = (): ReactElement => {
        return (
            <div className="user-info-error">
                <img src={errorIllustration} alt="personal profile card" />
                <div className="error-message">Something went wrong!</div>
                <FancyButton onClick={fetchUserData}>retry</FancyButton>
            </div>
        );
    };

    return (
        <div className="page-wrapper user-info-wrapper">
            <FormWrapper className="user-info-form-wrapper">
                {dataStatus === ResponseStatus.error && renderErrorState()}
                {dataStatus === ResponseStatus.success && renderUserInfo()}
            </FormWrapper>
        </div>
    );
};

export default ProfilePage;
