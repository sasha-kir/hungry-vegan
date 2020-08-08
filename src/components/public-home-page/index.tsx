import React, { ReactElement } from 'react';
import { Redirect } from 'react-router-dom';
import { QueryStatus } from 'react-query';

import { useAuth } from 'context/auth';
import { usePublicLists } from 'hooks/usePublicLists';
import { CardWrapper, LoadingError, ListsTable } from 'components/common';
import listsPlaceholder from 'images/checklist.svg';
import './style.css';

const PublicHomePage = (): ReactElement => {
    const { authToken } = useAuth();
    const { data: lists, status, refetch } = usePublicLists();

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
                <LoadingError illustration={listsPlaceholder} retryMethod={refetch} />
            </CardWrapper>
        );
    };

    return (
        <div className="page-wrapper home-page-wrapper">
            <div className="home-page-content">
                {status === QueryStatus.Idle && renderDefault()}
                {status === QueryStatus.Loading && renderLoading()}
                {status === QueryStatus.Success && renderLists()}
                {status === QueryStatus.Error && renderError()}
            </div>
        </div>
    );
};

export default PublicHomePage;
