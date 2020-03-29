import React, { ReactElement, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

import { useAuth } from '../../context/auth';
import { ResponseStatus } from '../../api/';
import { register } from '../../api/login';
import { FancyButton, FormInput, FormWrapper } from '../common';
import './style.css';

const RegisterPage = (): ReactElement => {
    const [isError, setError] = useState<boolean>(false);
    const { handleAuth } = useAuth();
    const history = useHistory();
    const { handleSubmit, clearError, setValue, control, errors } = useForm();

    const emailPattern = /^[^@\s]+@[^@\s\.]+\.[^@\s\.]+$/;

    const onSubmit = async formData => {
        const { status, token } = await register(formData);
        if (token === null || status === ResponseStatus.error) {
            setError(true);
            return;
        }
        handleAuth(token);
        history.push('/home');
    };

    const clearInputError = (): void => {
        clearError();
        if (isError) setError(false);
    };

    const renderError = (message: string): ReactElement<HTMLDivElement> => {
        return <div className="input-error">{message}</div>;
    };

    const renderUsernameError = (): ReactElement | undefined => {
        if (errors.username) return renderError(errors.username['message']);
    };

    const renderEmailError = (): ReactElement | undefined => {
        if (errors.email) return renderError(errors.email['message']);
    };

    const renderPasswordError = (): ReactElement | undefined => {
        if (errors.password) return renderError(errors.password['message']);
        if (isError) return renderError('User already exists');
    };

    return (
        <div className="login-wrapper">
            <FormWrapper className="register-form-wrapper">
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
                        renderError={renderUsernameError}
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
                        renderError={renderEmailError}
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
                        renderError={renderPasswordError}
                    />
                    <FancyButton onClick={handleSubmit(onSubmit)} className="login-btn">
                        submit
                    </FancyButton>
                </form>
                <Link to="/fsq-login">Login with Foursquare</Link>
                <Link to="/login">Login to existing account</Link>
            </FormWrapper>
        </div>
    );
};

export default RegisterPage;
