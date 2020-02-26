import React, { useState } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import './App.css';

import PrivateRoute from './PrivateRoute';
import LoginPage from './components/login-page/LoginPage';
import HomePage from './components/home-page/HomePage';
import AuthPage from './components/auth-page/AuthPage';
import NotFoundPage from './components/404-page/NotFoundPage';
import config from './config';

const App: React.FC = () => {
    const [auth, setAuth] = useState(false);
    const redirectUrl: string = config.baseUrl + '/auth/foursquare';

    const handleAuth = (token: string): void => {
        setAuth(true);
        localStorage.setItem('token', token);
    };

    return (
        <div className="body">
            <Router basename="/hungry-vegan">
                <Switch>
                    <Route exact path="/login">
                        <LoginPage redirectUrl={redirectUrl} />
                    </Route>
                    <PrivateRoute exact path="/" auth={auth}>
                        <HomePage />
                    </PrivateRoute>
                    <Route exact path="/auth/foursquare">
                        <AuthPage redirectUrl={redirectUrl} handleAuth={handleAuth} />
                    </Route>
                    <Route>
                        <NotFoundPage />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};

export default App;
