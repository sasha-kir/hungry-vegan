import React, { ReactElement, useEffect, useState } from 'react';
import { ResponseStatus } from '../../api';
import { getUserLists } from '../../api/foursquare';
import { useAuth } from '../../context/auth';
import { FoursquareButton } from '../common';
import './style.css';

const HomePage: React.FC = () => {
    const [lists, setLists] = useState<FoursquareList[]>([]);
    const [foursquareStatus, setFoursquareStatus] = useState<ResponseStatus>(ResponseStatus.pending);
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

    const renderLists = (): ReactElement<HTMLUListElement> => {
        if (lists.length === 0) {
            return <p style={{ color: 'white' }}>No lists yet</p>;
        }
        return (
            <ul>
                {lists.map(list => (
                    <li key={list.id}>{list.name}</li>
                ))}
            </ul>
        );
    };

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
                {foursquareStatus === ResponseStatus.pending && <div style={{ color: 'white' }}>Loading...</div>}
                {foursquareStatus === ResponseStatus.success && <div style={{ color: 'white' }}>{renderLists()}</div>}
                {foursquareStatus === ResponseStatus.rejected && renderFoursquareAuth()}
                {foursquareStatus === ResponseStatus.error && (
                    <div style={{ color: 'red' }}>Error fetching Foursquare data</div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
