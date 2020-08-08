import React from 'react';
import { ReactQueryConfigProvider } from 'react-query';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import { PrivateRoute, AuthProvider } from 'utils';
import NavigationBar from 'components/navigation-bar';
import PublicHomePage from 'components/public-home-page';
import LoginPage from 'components/login-page';
import RegisterPage from 'components/register-page';
import HomePage from 'components/home-page';
import ListDetailsPage from 'components/list-details-page';
import ProfilePage from 'components/profile-page';
import FsqAuthPage from 'components/fsq-auth-page';
import NotFoundPage from 'components/404-page';

const queryConfig = {
    queries: {
        retry: 0,
        refetchOnWindowFocus: false,
    },
};

const App: React.FC = () => {
    const fsqPaths = {
        login: '/auth/foursquare',
        connect: '/connect/foursquare',
    };

    return (
        <div className="body">
            <ReactQueryConfigProvider config={queryConfig}>
                <AuthProvider foursquarePaths={fsqPaths}>
                    <Router basename="/hungry-vegan">
                        <NavigationBar />
                        <Switch>
                            <Route exact path="/">
                                <PublicHomePage />
                            </Route>
                            <Route exact path="/:listOwner/lists/:listName">
                                <ListDetailsPage />
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
            </ReactQueryConfigProvider>
        </div>
    );
};

export default App;
