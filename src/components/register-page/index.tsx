import React, { ReactElement, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

import { useAuth } from 'context/auth';
import { ResponseStatus } from 'api';
import AuthApi from 'api/auth';
import { FancyButton, FormInput, CardWrapper } from 'components/common';
import { emailPattern } from 'utils/validation/patterns';
import './style.css';

const RegisterPage = (): ReactElement => {
    const [isError, setError] = useState<boolean>(false);
    const { handleAuth } = useAuth();
    const history = useHistory();
    const { handleSubmit, clearError, setValue, control, errors } = useForm();

    const onSubmit = async (formData) => {
        const { status, data: token } = await AuthApi.register(formData);
        if (token === null || status === ResponseStatus.error) {
            setError(true);
            return;
        }
        handleAuth(token);
        history.push('/home');
    };

    const clearInputError = (): void => {
        if (Object.keys(errors).length !== 0) {
            clearError();
        }
        if (isError) setError(false);
    };

    const getUsernameError = (): string | undefined => {
        if (errors.username) return errors.username['message'];
    };

    const getEmailError = (): string | undefined => {
        if (errors.email) return errors.email['message'];
    };

    const getPasswordError = (): string | undefined => {
        if (errors.password) return errors.password['message'];
        if (isError) return 'User already exists';
    };

    return (
        <div className="page-wrapper">
            <CardWrapper className="register-form-wrapper">
                <form className="register-form" onSubmit={() => false}>
                    <Controller
                        as={FormInput}
                        name="username"
                        control={control}
                        rules={{
                            required: 'Required field',
                            minLength: { value: 3, message: 'Minimum 3 characters' },
                        }}
                        setValue={setValue}
                        onFocus={clearInputError}
                        errorMessage={getUsernameError()}
                    />
                    <Controller
                        as={FormInput}
                        name="email"
                        control={control}
                        rules={{
                            required: 'Required field',
                            pattern: { value: emailPattern, message: 'Invalid email' },
                        }}
                        setValue={setValue}
                        onFocus={clearInputError}
                        errorMessage={getEmailError()}
                    />
                    <Controller
                        as={FormInput}
                        name="password"
                        type="password"
                        control={control}
                        rules={{
                            required: 'Required field',
                            minLength: { value: 5, message: 'Minimum 5 characters' },
                        }}
                        onFocus={clearInputError}
                        setValue={setValue}
                        errorMessage={getPasswordError()}
                    />
                    <FancyButton onClick={handleSubmit(onSubmit)} className="login-btn">
                        submit
                    </FancyButton>
                </form>
                <Link to="/fsq-login">Login with Foursquare</Link>
                <Link to="/login">Login to existing account</Link>
            </CardWrapper>
        </div>
    );
};

export default RegisterPage;
