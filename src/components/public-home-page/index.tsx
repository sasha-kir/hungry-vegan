import React, { ReactElement } from 'react';
import { Redirect } from 'react-router-dom';

import { ResponseStatus } from 'api';
import { useAuth } from 'context/auth';
import { usePublicLists } from 'hooks/usePublicLists';
import { CardWrapper, LoadingError, ListsTable } from 'components/common';
import listsPlaceholder from 'images/checklist.svg';
import './style.css';

const PublicHomePage = (): ReactElement => {
    const { authToken } = useAuth();
    const [fetchLists, { lists, status }] = usePublicLists();

    if (authToken !== null) {
        return <Redirect to="/home" />;
    }

    const renderDefault = (): ReactElement => {
        return (
            <div className="page-wrapper public-home-wrapper">
                <div className="heading">Hungry Vegan</div>
            </div>
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
                <ListsTable lists={lists} />
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
                {status === ResponseStatus.idle && renderDefault()}
                {status === ResponseStatus.pending && renderLoading()}
                {status === ResponseStatus.success && renderLists()}
                {status === ResponseStatus.error && renderError()}
            </div>
        </div>
    );
};

export default PublicHomePage;
