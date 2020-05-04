import React, { ReactElement, useEffect, useState, useCallback } from 'react';

import { ResponseStatus } from 'api';
import { getUserLists, updateUserLists } from 'api/lists';
import { useAuth } from 'context/auth';
import { FoursquareButton, FormWrapper, FancyButton } from 'components/common';
import ListsTable from './lists-table';
import { sortByLocation } from 'utils/location';
import listsPlaceholder from 'images/checklist.svg';
import './style.css';

const HomePage: React.FC = () => {
    const [lists, setLists] = useState<UserList[]>([]);
    const [responseStatus, setResponseStatus] = useState<ResponseStatus>(ResponseStatus.pending);
    const { foursquarePaths } = useAuth();

    const partitionLists = async (userLists: UserList[]): Promise<UserList[]> => {
        const [noLocation, withLocation] = userLists.reduce(
            (res: UserList[][], list) => {
                list.coordinates === null ? res[0].push(list) : res[1].push(list);
                return res;
            },
            [[], []],
        );
        const sortedLists = await sortByLocation(withLocation);
        return [...sortedLists, ...noLocation];
    };

    const fetchLists = useCallback(async (): Promise<void> => {
        setResponseStatus(ResponseStatus.pending);
        const { status, data: userLists } = await getUserLists();
        if (status === ResponseStatus.success && userLists !== null) {
            const lists = await partitionLists(userLists);
            setLists(lists);
        }
        setResponseStatus(status);
    }, []);

    useEffect(() => {
        fetchLists();
    }, [fetchLists]);

    const updateLists = async (lists: UserList[]): Promise<void> => {
        setResponseStatus(ResponseStatus.pending);
        const { status, data: userLists } = await updateUserLists(lists);
        if (status === ResponseStatus.success && userLists !== null) {
            const lists = await partitionLists(userLists);
            setLists(lists);
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
                {responseStatus === ResponseStatus.pending && renderLoading()}
                {responseStatus === ResponseStatus.success && renderLists()}
                {responseStatus === ResponseStatus.rejected && renderFoursquareAuth()}
                {responseStatus === ResponseStatus.error && renderError()}
            </div>
        </div>
    );
};

export default HomePage;
