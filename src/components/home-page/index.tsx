import React, { ReactElement } from 'react';

import { ResponseStatus } from 'api';
import { useLists } from 'hooks/useLists';
import { useAuth } from 'context/auth';
import { FoursquareButton, CardWrapper, LoadingError } from 'components/common';
import ListsTable from './components/lists-table';
import listsPlaceholder from 'images/checklist.svg';
import './style.css';

const HomePage: React.FC = () => {
    const { foursquarePaths } = useAuth();
    const [fetchLists, updateLists, { lists, status }] = useLists();

    const renderFoursquareAuth = (): ReactElement => {
        return (
            <CardWrapper className="foursquare-wrapper">
                <p className="foursquare-message">You should authorize on Foursqaure</p>
                <FoursquareButton redirectPath={foursquarePaths.connect} className="connect-btn">
                    connect to foursquare
                </FoursquareButton>
            </CardWrapper>
        );
    };

    const renderLoading = (): ReactElement => {
        return (
            <CardWrapper className="loading-wrapper">
                <div className="loading-bar">Loading...</div>
            </CardWrapper>
        );
    };

    const renderLists = (): ReactElement => {
        return (
            <CardWrapper className="lists-wrapper">
                <ListsTable lists={lists} updateLists={updateLists} />
            </CardWrapper>
        );
    };

    const renderError = (): ReactElement => {
        return (
            <CardWrapper className="error-wrapper">
                <LoadingError illustration={listsPlaceholder} retryMethod={fetchLists} />
            </CardWrapper>
        );
    };

    return (
        <div className="page-wrapper home-page-wrapper">
            <div className="home-page-content">
                {status === ResponseStatus.pending && renderLoading()}
                {status === ResponseStatus.success && renderLists()}
                {status === ResponseStatus.rejected && renderFoursquareAuth()}
                {status === ResponseStatus.error && renderError()}
            </div>
        </div>
    );
};

export default HomePage;
