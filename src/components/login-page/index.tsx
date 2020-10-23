import React, { ReactElement, useState } from 'react';

import { Link, useHistory, useLocation } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

import { useAuth } from 'context/auth';
import { ResponseStatus } from 'api';
import AuthApi from 'api/auth';
import { FancyButton, FormInput, CardWrapper } from 'components/common';
import './style.css';

const LoginPage = (): ReactElement => {
    const [isError, setError] = useState<boolean>(false);
    const { handleAuth } = useAuth();
    const history = useHistory();
    const location = useLocation<{ from: Record<string, unknown> }>();
    const { handleSubmit, clearErrors, setValue, control, errors } = useForm();

    const onSubmit = async (formData) => {
        const { status, data: token } = await AuthApi.loginWithCredentials(formData);
        if (token === null || status === ResponseStatus.error) {
            setError(true);
            return;
        }
        handleAuth(token);
        let referer = '/home';
        if (location.state) {
            referer = (location.state.from?.['pathname'] as string) || '/home';
        }
        history.push(referer);
    };

    const clearInputError = (): void => {
        if (Object.keys(errors).length !== 0) {
            clearErrors();
        }
        if (isError) setError(false);
    };

    const getUsernameError = (): string | undefined => {
        if (errors.username) return errors.username['message'];
    };

    const getPasswordError = (): string | undefined => {
        if (errors.password) return errors.password['message'];
        if (isError) return 'Wrong username or password';
    };

    return (
        <div className="page-wrapper">
            <CardWrapper className="login-form-wrapper">
                <form className="login-form" onSubmit={() => false} data-testid="login-form">
                    <Controller
                        as={FormInput}
                        name="username"
                        label="username"
                        control={control}
                        rules={{ required: 'Required field' }}
                        setValue={setValue}
                        onFocus={clearInputError}
                        errorMessage={getUsernameError()}
                    />
                    <Controller
                        as={FormInput}
                        name="password"
                        label="password"
                        type="password"
                        control={control}
                        rules={{ required: 'Required field' }}
                        onFocus={clearInputError}
                        setValue={setValue}
                        errorMessage={getPasswordError()}
                    />
                    <FancyButton
                        onClick={handleSubmit(onSubmit)}
                        className="login-btn"
                        data-testid="login-submit-btn"
                    >
                        submit
                    </FancyButton>
                </form>
                <Link to="/fsq-login">Login with Foursquare</Link>
                <Link to="/register">Register</Link>
            </CardWrapper>
        </div>
    );
};

export default LoginPage;
