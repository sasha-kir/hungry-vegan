import React, { ReactElement, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import './LoginPage.css';

const LoginPage = (): ReactElement => {
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = data => {
        console.log(data);
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
            </article>
        </div>
    );
};

export default LoginPage;
