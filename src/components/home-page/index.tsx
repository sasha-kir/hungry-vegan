import React, { ReactElement } from 'react';
import { QueryStatus } from 'react-query';
import { useLists } from 'hooks/useLists';
import { useAuth } from 'context/auth';
import { FoursquareButton, CardWrapper, LoadingError, ListsTable } from 'components/common';
import listsPlaceholder from 'images/checklist.svg';
import './style.css';

const HomePage: React.FC = () => {
    const { foursquarePaths } = useAuth();
    const [updateLists, { data: lists, status, refetch }] = useLists();

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
                <LoadingError illustration={listsPlaceholder} retryMethod={refetch} />
            </CardWrapper>
        );
    };

    return (
        <div className="page-wrapper home-page-wrapper">
            <div className="lists-content">
                {status === QueryStatus.Loading && renderLoading()}
                {status === QueryStatus.Success && renderLists()}
                {status === 'rejected' && renderFoursquareAuth()}
                {status === QueryStatus.Error && renderError()}
            </div>
        </div>
    );
};

export default HomePage;
