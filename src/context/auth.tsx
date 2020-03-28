/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext } from 'react';

interface AuthContextProps {
    authToken: string | null;
    foursquarePaths: { [key: string]: string };
    handleAuth(token: string): void;
    handleLogout(): void;
}

const defaultValue: AuthContextProps = {
    authToken: null,
    foursquarePaths: {},
    handleAuth: (token: string) => {},
    handleLogout: () => {},
};

export const AuthContext = createContext<AuthContextProps>(defaultValue);

export function useAuth() {
    return useContext(AuthContext);
}
