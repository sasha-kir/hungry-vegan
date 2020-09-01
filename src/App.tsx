import React from 'react';
import { ReactQueryConfigProvider } from 'react-query';
import { AuthProvider } from 'utils';
import Routes from 'routes';

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
                    <Routes foursquarePaths={fsqPaths} />
                </AuthProvider>
            </ReactQueryConfigProvider>
        </div>
    );
};

export default App;
