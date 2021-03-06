import React, { useState, ReactNode } from 'react';
import { queryCache } from 'react-query';
import { AuthContext } from 'context/auth';
import { api } from 'api';

interface AuthProviderProps {
    children: ReactNode;
    foursquarePaths: { [key: string]: string };
}

const AuthProvider = ({ children, foursquarePaths }: AuthProviderProps) => {
    const initialToken = () => localStorage.getItem('token');
    const [authToken, setAuthToken] = useState<string | null>(initialToken);

    const handleAuth = (token: string): void => {
        localStorage.setItem('token', token);
        setAuthToken(token);
    };

    const handleLogout = (): void => {
        localStorage.removeItem('token');
        setAuthToken(null);
        queryCache.removeQueries('userLists');
        queryCache.removeQueries('userData');
    };

    api.interceptors.request.use((request) => {
        request.headers['Authentication'] = localStorage.getItem('token');
        return request;
    });

    api.interceptors.response.use(
        (response) => response,
        (error) => {
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
