import React, { ReactElement } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '../../../context/auth';

const PrivateRoute = ({ children, ...rest }: RouteProps): ReactElement => {
    const { authToken } = useAuth();
    return (
        <Route
            {...rest}
            render={props =>
                authToken ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
