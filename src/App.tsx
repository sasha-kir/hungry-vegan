import React, { useState } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import './App.css';

import PrivateRoute from './PrivateRoute';
import LoginPage from './components/login-page/LoginPage';
import HomePage from './components/home-page/HomePage';
import AuthPage from './components/auth-page/AuthPage';
import NotFoundPage from './components/404-page/NotFoundPage';
import { AuthContext } from './context/auth';
import config from './config';

const App: React.FC = () => {
    const [authToken, setAuthToken] = useState<string | null>(localStorage.getItem('token'));

    const redirectUrl: string = config.baseUrl + '/auth/foursquare';

    const handleAuth = (token: string): void => {
        localStorage.setItem('token', token);
        setAuthToken(token);
    };

    const handleLogout = (): void => {
        localStorage.clear();
        setAuthToken(null);
    };

    return (
        <div className="body">
            <AuthContext.Provider value={{ authToken, handleAuth, handleLogout }}>
                <Router basename="/hungry-vegan">
                    <Switch>
                        <Route exact path="/login">
                            <LoginPage />
                        </Route>
                        <PrivateRoute exact path="/">
                            <HomePage />
                        </PrivateRoute>
                        <Route exact path="/auth/foursquare">
                            <AuthPage redirectUrl={redirectUrl} />
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
