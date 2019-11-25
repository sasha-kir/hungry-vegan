import React, { useState, ReactElement } from 'react';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';

import './App.css';

import LoginPage from './components/login-page/LoginPage';
import HomePage from './components/home-page/HomePage';
import NotFoundPage from './components/404-page/NotFoundPage';

const App: React.FC = () => {
    const [auth, setAuth] = useState(false);

    const handleAuth = (): void => {
        setAuth(!auth);
    };

    return (
        <div className="body">
            <Router basename="/hungry-vegan">
                <Switch>
                    <Route exact path="/login" render={(): ReactElement => <LoginPage handleAuth={handleAuth} />} />
                    <Route
                        exact
                        path="/"
                        render={(): ReactElement => (auth ? <HomePage /> : <Redirect to="/login" />)}
                    />
                    <Route component={NotFoundPage} />
                </Switch>
            </Router>
        </div>
    );
};

export default App;
