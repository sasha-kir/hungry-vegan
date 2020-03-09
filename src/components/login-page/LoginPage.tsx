import React, { ReactElement, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

import { useAuth } from '../../context/auth';
import config from '../../config';
import { FancyButton, FormInput } from '../common';
import './LoginPage.css';

const LoginPage = (): ReactElement => {
    const [isError, setError] = useState<boolean>(false);
    const { handleAuth } = useAuth();
    const history = useHistory();
    const location = useLocation();
    const { handleSubmit, clearError, setValue, control, errors } = useForm();

    const onSubmit = async formData => {
        const url = config.apiUrl + '/login';
        try {
            const { data } = await axios.post(url, formData);
            handleAuth(data.token);
            let referer = '/home';
            if (location.state) {
                referer = location.state['from']['pathname'] || '/home';
            }
            history.push(referer);
        } catch (error) {
            setError(true);
        }
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
            <h1 className="heading">Log in</h1>

            <article className="login-form-wrapper">
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
            </article>
        </div>
    );
};

export default LoginPage;
