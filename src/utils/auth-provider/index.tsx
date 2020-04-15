import React, { useState, ReactNode } from 'react';
import { AuthContext } from 'context/auth';
import { api } from 'api';

interface AuthProviderProps {
    children: ReactNode;
    foursquarePaths: { [key: string]: string };
}

const AuthProvider = ({ children, foursquarePaths }: AuthProviderProps) => {
    const [authToken, setAuthToken] = useState<string | null>(localStorage.getItem('token'));

    const handleAuth = (token: string): void => {
        localStorage.setItem('token', token);
        setAuthToken(token);
    };

    const handleLogout = (): void => {
        localStorage.clear();
        setAuthToken(null);
    };

    api.interceptors.request.use(request => {
        request.headers['Authentication'] = localStorage.getItem('token');
        return request;
    });

    api.interceptors.response.use(
        response => response,
        error => {
            switch (error.response?.status) {
                case 401:
                    handleLogout();
                    break;
                default:
                    return Promise.reject(error);
            }
        },
    );

    const AuthContextValue = {
        authToken,
        foursquarePaths,
        handleAuth,
        handleLogout,
    };

    return <AuthContext.Provider value={AuthContextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
