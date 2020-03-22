import React, { useState } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import './App.css';

import PrivateRoute from './PrivateRoute';
import PublicHomePage from './components/public-home-page';
import LoginPage from './components/login-page';
import HomePage from './components/home-page';
import ProfilePage from './components/profile-page';
import FsqAuthPage from './components/fsq-auth-page';
import NotFoundPage from './components/404-page';
import { AuthContext } from './context/auth';

const App: React.FC = () => {
    const [authToken, setAuthToken] = useState<string | null>(localStorage.getItem('token'));
    const fsqLoginPath = '/auth/foursquare';
    const fsqConnectPath = '/connect/foursquare';

    const handleAuth = (token: string): void => {
        localStorage.setItem('token', token);
        setAuthToken(token);
    };

    const handleLogout = (): void => {
        localStorage.clear();
        setAuthToken(null);
    };

    const AuthContextValue = {
        authToken,
        fsqLoginPath,
        fsqConnectPath,
        handleAuth,
        handleLogout,
    };

    return (
        <div className="body">
            <AuthContext.Provider value={AuthContextValue}>
                <Router basename="/hungry-vegan">
                    <Switch>
                        <Route exact path="/">
                            <PublicHomePage />
                        </Route>
                        <Route exact path="/login">
                            <LoginPage />
                        </Route>
                        <PrivateRoute exact path="/home">
                            <HomePage />
                        </PrivateRoute>
                        <PrivateRoute exact path="/profile">
                            <ProfilePage />
                        </PrivateRoute>
                        <Route exact path={['/fsq-login', fsqLoginPath, fsqConnectPath]}>
                            <FsqAuthPage />
                        </Route>
                        <Route>
                            <NotFoundPage />
                        </Route>
                    </Switch>
                </Router>
            </AuthContext.Provider>
        </div>
    );
};

export default App;
