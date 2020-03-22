import React, { useState, useEffect, ReactElement } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

import { useAuth } from '../../context/auth';
import { UserData, getUserData } from '../../api/users';
import { FancyButton, FormInput, FormWrapper } from '../common';
import './style.css';

const defaultInfo: UserData = {
    id: 0,
    username: '',
    email: '',
    foursquareId: '',
};

const ProfilePage = (): React.ReactElement => {
    const [userInfo, setUserInfo] = useState<UserData>(defaultInfo);
    const [isEditingMode, setEditingMode] = useState<boolean>(false);
    const [isEmailEmpty, setEmailEmpty] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [isError, setError] = useState<boolean>(false);

    const { authToken, handleLogout } = useAuth();
    const { setValue, control } = useForm();
    const location = useLocation();

    const renderEmailError = (): ReactElement<HTMLDivElement> | void => {
        if (isEmailEmpty) {
            setValue('email', '');
            return <div className="input-error">Please fill in your email</div>;
        }
    };

    const clearEmailError = (): void => {
        setEmailEmpty(false);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            if (authToken === null) {
                handleLogout();
                return;
            }
            const { user, error } = await getUserData(authToken);
            if (error !== undefined || user === null) {
                setError(true);
                setLoading(false);
            } else {
                setLoading(false);
                setUserInfo(user);
                const formValues = Object.keys(user).map(key => ({
                    [key]: user[key],
                }));
                setValue(formValues);
            }
        };
        const searchParams = new URLSearchParams(location.search);
        setEmailEmpty(Boolean(searchParams.get('empty_email')));
        fetchUserData();
    }, []);

    const renderActionsButton = (): ReactElement => {
        const text = isEditingMode ? 'save' : 'edit';
        const handleClick = e => {
            e.preventDefault();
            isEditingMode ? setEditingMode(false) : setEditingMode(true);
        };
        return (
            <FancyButton onClick={handleClick} className="user-info-actions-btn">
                {text}
            </FancyButton>
        );
    };

    const renderUserInfo = (): ReactElement => {
        return (
            <div className="user-info-wrapper">
                <FormWrapper className="user-info-form-wrapper">
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
                            renderError={renderEmailError}
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
                        {renderActionsButton()}
                    </form>
                </FormWrapper>
            </div>
        );
    };

    return (
        <div>
            {isError && <p style={{ color: 'red' }}>Error fetching user info</p>}
            {isLoading && <p style={{ color: 'white' }}>Loading...</p>}
            {!isError && !isLoading && renderUserInfo()}
        </div>
    );
};

export default ProfilePage;
