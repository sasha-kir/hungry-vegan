import React, { useState } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import './App.css';

import PrivateRoute from './PrivateRoute';
import PublicHomePage from './components/public-home-page/PublicHomePage';
import LoginPage from './components/login-page/LoginPage';
import HomePage from './components/home-page/HomePage';
import FsqAuthPage from './components/fsq-auth-page/FsqAuthPage';
import NotFoundPage from './components/404-page/NotFoundPage';
import { AuthContext } from './context/auth';

const App: React.FC = () => {
    const [authToken, setAuthToken] = useState<string | null>(localStorage.getItem('token'));

    const fsqAuthRoute = '/auth/foursquare';

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
                        <Route exact path="/">
                            <PublicHomePage />
                        </Route>
                        <Route exact path="/login">
                            <LoginPage />
                        </Route>
                        <PrivateRoute exact path="/home">
                            <HomePage />
                        </PrivateRoute>
                        <Route exact path={['/fsq-login', fsqAuthRoute]}>
                            <FsqAuthPage fsqAuthRoute={fsqAuthRoute} />
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
