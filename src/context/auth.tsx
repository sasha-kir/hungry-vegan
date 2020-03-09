/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext } from 'react';

interface AuthContextProps {
    authToken: string | null;
    handleAuth(token: string): void;
    handleLogout(): void;
    fsqAuthRoute: string;
}

const defaultValue: AuthContextProps = {
    authToken: null,
    handleAuth: (token: string) => {},
    handleLogout: () => {},
    fsqAuthRoute: '',
};

export const AuthContext = createContext<AuthContextProps>(defaultValue);

export function useAuth() {
    return useContext(AuthContext);
}
