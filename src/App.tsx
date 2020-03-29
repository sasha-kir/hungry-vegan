import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import { PrivateRoute, AuthProvider } from './components/utils';
import NavigationBar from './components/navigation-bar';
import PublicHomePage from './components/public-home-page';
import LoginPage from './components/login-page';
import RegisterPage from './components/register-page';
import HomePage from './components/home-page';
import ProfilePage from './components/profile-page';
import FsqAuthPage from './components/fsq-auth-page';
import NotFoundPage from './components/404-page';

const App: React.FC = () => {
    const fsqPaths = {
        login: '/auth/foursquare',
        connect: '/connect/foursquare',
    };

    return (
        <div className="body">
            <AuthProvider foursquarePaths={fsqPaths}>
                <Router basename="/hungry-vegan">
                    <NavigationBar />
                    <Switch>
                        <Route exact path="/">
                            <PublicHomePage />
                        </Route>
                        <Route exact path="/login">
                            <LoginPage />
                        </Route>
                        <Route exact path="/register">
                            <RegisterPage />
                        </Route>
                        <PrivateRoute exact path="/home">
                            <HomePage />
                        </PrivateRoute>
                        <PrivateRoute exact path="/profile">
                            <ProfilePage />
                        </PrivateRoute>
                        <Route exact path={['/fsq-login', ...Object.values(fsqPaths)]}>
                            <FsqAuthPage />
                        </Route>
                        <Route>
                            <NotFoundPage />
                        </Route>
                    </Switch>
                </Router>
            </AuthProvider>
        </div>
    );
};

export default App;
