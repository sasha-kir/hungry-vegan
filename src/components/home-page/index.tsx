import React, { ReactElement, useEffect, useState } from 'react';
import { ResponseStatus } from 'api';
import { getUserLists, updateUserLists } from 'api/lists';
import { useAuth } from 'context/auth';
import { FoursquareButton, FormWrapper, FancyButton } from 'components/common';
import ListsTable from './lists-table';
import listsPlaceholder from 'images/checklist.svg';
import './style.css';

const HomePage: React.FC = () => {
    const [lists, setLists] = useState<FoursquareList[]>([]);
    const [responseStatus, setResponseStatus] = useState<ResponseStatus>(ResponseStatus.pending);
    const { foursquarePaths } = useAuth();

    const fetchLists = async (): Promise<void> => {
        setResponseStatus(ResponseStatus.pending);
        const { status, userLists } = await getUserLists();
        if (status === ResponseStatus.success && userLists !== null) {
            setLists(userLists);
        }
        setResponseStatus(status);
    };

    useEffect(() => {
        fetchLists();
    }, []);

    const updateLists = async (lists: FoursquareList[]): Promise<void> => {
        setResponseStatus(ResponseStatus.pending);
        const { status, userLists } = await updateUserLists(lists);
        if (status === ResponseStatus.success && userLists !== null) {
            setLists(userLists);
        }
        setResponseStatus(status);
    };

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
            <div className="lists-wrapper">
                <ListsTable lists={lists} updateLists={updateLists} />
            </div>
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
                {responseStatus === ResponseStatus.pending && renderLoading()}
                {responseStatus === ResponseStatus.success && renderLists()}
                {responseStatus === ResponseStatus.rejected && renderFoursquareAuth()}
                {responseStatus === ResponseStatus.error && renderError()}
            </div>
        </div>
    );
};

export default HomePage;
