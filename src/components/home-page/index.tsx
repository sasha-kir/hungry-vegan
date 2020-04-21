import React, { ReactElement, useEffect, useState } from 'react';
import { ResponseStatus } from 'api';
import { getUserLists } from 'api/foursquare';
import { useAuth } from 'context/auth';
import { FoursquareButton } from 'components/common';
import ListsTable from './lists-table';
import './style.css';

const HomePage: React.FC = () => {
    const [lists, setLists] = useState<FoursquareList[]>([]);
    const [foursquareStatus, setFoursquareStatus] = useState<ResponseStatus>(
        ResponseStatus.pending,
    );
    const { foursquarePaths } = useAuth();

    useEffect(() => {
        const fetchLists = async (): Promise<void> => {
            setFoursquareStatus(ResponseStatus.pending);
            const { status, userLists } = await getUserLists();
            if (status === ResponseStatus.success && userLists !== null) {
                setLists(userLists);
            }
            setFoursquareStatus(status);
        };
        fetchLists();
    }, []);

    const renderFoursquareAuth = (): ReactElement => {
        return (
            <>
                <p className="foursquare-message">You should authorize on Foursqaure</p>
                <FoursquareButton redirectPath={foursquarePaths.connect} style={{ width: '300px' }}>
                    connect to foursquare
                </FoursquareButton>
            </>
        );
    };

    return (
        <div className="page-wrapper home-page-wrapper">
            <div className="home-page-content">
                {foursquareStatus === ResponseStatus.pending && (
                    <div style={{ color: 'white', textAlign: 'center' }}>Loading...</div>
                )}
                {foursquareStatus === ResponseStatus.success && (
                    <div className="lists-wrapper">
                        <ListsTable lists={lists} />
                    </div>
                )}
                {foursquareStatus === ResponseStatus.rejected && renderFoursquareAuth()}
                {foursquareStatus === ResponseStatus.error && (
                    <div style={{ color: 'red' }}>Error fetching Foursquare data</div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
