import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import config from '../../config';
import './LoginPage.css';

interface LoginPageProps {
    handleAuth(token: string): void;
}

const LoginPage = ({ handleAuth }: LoginPageProps): ReactElement => {
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = async formData => {
        const url = config.apiUrl + '/login';
        try {
            const { data } = await axios.post(url, formData);
            handleAuth(data.token);
        } catch (error) {
            console.error(error.message);
        }
    };

    const renderError = () => {
        return <div className="input-error">Required field</div>;
    };

    return (
        <div className="login-wrapper">
            <h1 className="heading">Log in</h1>

            <article className="login-form-wrapper">
                <form className="login-form" onSubmit={() => false}>
                    <div className="form-input-wrapper">
                        <label>username</label>
                        <input name="username" ref={register({ required: true })} />
                        {errors.username && renderError()}
                    </div>
                    <div className="form-input-wrapper">
                        <label>password</label>
                        <input name="password" type="password" ref={register({ required: true })} />
                        {errors.password && renderError()}
                    </div>
                    <button onClick={handleSubmit(onSubmit)} className="login-btn">
                        submit
                    </button>
                </form>
                <Link to="/register">Don't have an account?</Link>
            </article>
        </div>
    );
};

export default LoginPage;
