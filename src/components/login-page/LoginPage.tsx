import React, { ReactElement, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { useAuth } from '../../context/auth';
import config from '../../config';
import { FancyButton } from '../common';
import './LoginPage.css';

const LoginPage = (): ReactElement => {
    const [isError, setError] = useState<boolean>(false);
    const { handleAuth } = useAuth();
    const history = useHistory();
    const location = useLocation();
    const { register, handleSubmit, errors } = useForm();

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

    const clearError = (): void => {
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
                    <div className="form-input-wrapper">
                        <label>username</label>
                        <input name="username" ref={register({ required: 'Required field' })} />
                        {renderUsernameError()}
                    </div>
                    <div className="form-input-wrapper">
                        <label>password</label>
                        <input
                            name="password"
                            onFocus={clearError}
                            type="password"
                            ref={register({ required: true })}
                        />
                        {renderPasswordError()}
                    </div>
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
