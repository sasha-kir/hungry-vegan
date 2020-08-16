import React, { ReactElement } from 'react';
import { QueryStatus } from 'react-query';

import { usePublicLists } from 'hooks/usePublicLists';
import { CardWrapper, LoadingError, ListsTable } from 'components/common';
import listsPlaceholder from 'images/checklist.svg';

const PublicListsPage = () => {
    const { data: lists, status, refetch } = usePublicLists();

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
        <div className="lists-content">
            {status === QueryStatus.Loading && renderLoading()}
            {status === QueryStatus.Success && renderLists()}
            {status === QueryStatus.Error && renderError()}
        </div>
    );
};

export default PublicListsPage;
