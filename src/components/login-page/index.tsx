import React, { ReactElement, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

import { useAuth } from '../../context/auth';
import { ResponseStatus } from '../../api/';
import { loginWithCredentials } from '../../api/login';
import { FancyButton, FormInput, FormWrapper } from '../common';
import './style.css';

const LoginPage = (): ReactElement => {
    const [isError, setError] = useState<boolean>(false);
    const { handleAuth } = useAuth();
    const history = useHistory();
    const location = useLocation();
    const { handleSubmit, clearError, setValue, control, errors } = useForm();

    const onSubmit = async formData => {
        const { status, token } = await loginWithCredentials(formData);
        if (token === null || status === ResponseStatus.error) {
            setError(true);
            return;
        }
        handleAuth(token);
        let referer = '/home';
        if (location.state) {
            referer = location.state['from']['pathname'] || '/home';
        }
        history.push(referer);
    };

    const clearInputError = (): void => {
        clearError();
        if (isError) setError(false);
    };

    const renderError = (message: string): ReactElement<HTMLDivElement> => {
        return <div className="input-error">{message}</div>;
    };

    const renderUsernameError = (): ReactElement | undefined => {
        if (errors.username) return renderError('Required field');
    };

    const renderPasswordError = (): ReactElement | undefined => {
        if (errors.password) return renderError('Required field');
        if (isError) return renderError('Wrong username or password');
    };

    return (
        <div className="login-wrapper">
            <FormWrapper>
                <form className="login-form" onSubmit={() => false}>
                    <Controller
                        as={FormInput}
                        name="username"
                        control={control}
                        rules={{ required: 'Required field' }}
                        setValue={setValue}
                        onFocus={clearInputError}
                        renderError={renderUsernameError}
                    />
                    <Controller
                        as={FormInput}
                        name="password"
                        type="password"
                        control={control}
                        rules={{ required: 'Required field' }}
                        onFocus={clearInputError}
                        setValue={setValue}
                        renderError={renderPasswordError}
                    />
                    <FancyButton onClick={handleSubmit(onSubmit)} className="login-btn">
                        submit
                    </FancyButton>
                </form>
                <Link to="/fsq-login">Login with Foursquare</Link>
                <Link to="/register">Register</Link>
            </FormWrapper>
        </div>
    );
};

export default LoginPage;
