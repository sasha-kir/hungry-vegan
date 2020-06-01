import React, { ReactElement } from 'react';

import { ResponseStatus } from 'api';
import { useLists } from 'hooks/useLists';
import { useAuth } from 'context/auth';
import { FoursquareButton, FormWrapper, FancyButton } from 'components/common';
import ListsTable from './lists-table';
import listsPlaceholder from 'images/checklist.svg';
import './style.css';

const HomePage: React.FC = () => {
    const { foursquarePaths } = useAuth();
    const [fetchLists, updateLists, { lists, status }] = useLists();

    const renderFoursquareAuth = (): ReactElement => {
        return (
            <FormWrapper className="foursquare-wrapper">
                <p className="foursquare-message">You should authorize on Foursqaure</p>
                <FoursquareButton redirectPath={foursquarePaths.connect} className="connect-btn">
                    connect to foursquare
                </FoursquareButton>
            </FormWrapper>
        );
    };

    const renderLoading = (): ReactElement => {
        return (
            <FormWrapper className="loading-wrapper">
                <div className="loading-bar">Loading...</div>
            </FormWrapper>
        );
    };

    const renderLists = (): ReactElement => {
        return (
            <FormWrapper className="lists-wrapper">
                <ListsTable lists={lists} updateLists={updateLists} />
            </FormWrapper>
        );
    };

    const renderError = (): ReactElement => {
        return (
            <FormWrapper className="error-wrapper">
                <img src={listsPlaceholder} alt="checklist" />
                <div className="error-message">Error fetching lists</div>
                <FancyButton styleType="small" onClick={fetchLists}>
                    retry
                </FancyButton>
            </FormWrapper>
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
