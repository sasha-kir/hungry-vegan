import React, { ReactElement, useEffect, useState } from 'react';
import { ResponseStatus } from 'api';
import { getUserLists, updateUserLists } from 'api/foursquare';
import { useAuth } from 'context/auth';
import { FoursquareButton } from 'components/common';
import ListsTable from './lists-table';
import './style.css';

const HomePage: React.FC = () => {
    const [lists, setLists] = useState<FoursquareList[]>([]);
    const [responseStatus, setResponseStatus] = useState<ResponseStatus>(ResponseStatus.pending);
    const { foursquarePaths } = useAuth();

    useEffect(() => {
        const fetchLists = async (): Promise<void> => {
            setResponseStatus(ResponseStatus.pending);
            const { status, userLists } = await getUserLists();
            if (status === ResponseStatus.success && userLists !== null) {
                setLists(userLists);
            }
            setResponseStatus(status);
        };
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
            <>
                <p className="foursquare-message">You should authorize on Foursqaure</p>
                <FoursquareButton redirectPath={foursquarePaths.connect} className="connect-btn">
                    connect to foursquare
                </FoursquareButton>
            </>
        );
    };

    return (
        <div className="page-wrapper home-page-wrapper">
            <div className="home-page-content">
                {responseStatus === ResponseStatus.pending && (
                    <div style={{ color: 'white', textAlign: 'center' }}>Loading...</div>
                )}
                {responseStatus === ResponseStatus.success && (
                    <div className="lists-wrapper">
                        <ListsTable lists={lists} updateLists={updateLists} />
                    </div>
                )}
                {responseStatus === ResponseStatus.rejected && renderFoursquareAuth()}
                {responseStatus === ResponseStatus.error && (
                    <div style={{ color: 'red' }}>Error fetching Foursquare data</div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
