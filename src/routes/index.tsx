import React, { Suspense, lazy } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { PrivateRoute } from 'utils';

import NavigationBar from 'components/navigation-bar';
import HomePage from 'components/home-page';
import PublicListsPage from 'components/public-lists-page';
import ListDetailsPage from 'components/list-details-page';
import ProfilePage from 'components/profile-page';
const PublicHomePage = lazy(() => import('components/public-home-page'));
const LoginPage = lazy(() => import('components/login-page'));
const RegisterPage = lazy(() => import('components/register-page'));
const FsqAuthPage = lazy(() => import('components/fsq-auth-page'));
const NotFoundPage = lazy(() => import('components/404-page'));

interface RoutesProps {
    foursquarePaths: { [key: string]: string };
}

const Routes = ({ foursquarePaths }: RoutesProps) => {
    return (
        <Router basename="/hungry-vegan">
            <NavigationBar />
            <Suspense fallback={null}>
                <Switch>
                    <Route exact path="/">
                        <PublicHomePage />
                    </Route>
                    <Route exact path="/lists">
                        <PublicListsPage />
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
                    <Route exact path={['/fsq-login', ...Object.values(foursquarePaths)]}>
                        <FsqAuthPage />
                    </Route>
                    <Route>
                        <NotFoundPage />
                    </Route>
                </Switch>
            </Suspense>
        </Router>
    );
};

export default Routes;
