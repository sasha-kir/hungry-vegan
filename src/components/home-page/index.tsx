import React, { ReactElement, useEffect, useState } from 'react';
import { ResponseStatus } from '../../api';
import { getListsData } from '../../api/foursquare';
import { FoursquareButton } from '../common';
import './style.css';

interface ListData {
    name: string;
}

const HomePage: React.FC = () => {
    const [lists, setLists] = useState<ListData[]>([]);
    const [foursquareStatus, setFoursquareStatus] = useState<ResponseStatus>(ResponseStatus.pending);

    useEffect(() => {
        const fetchLists = async (): Promise<void> => {
            setFoursquareStatus(ResponseStatus.pending);
            const { status, listsData } = await getListsData();
            if (status === ResponseStatus.success) {
                const listNames = listsData.map(list => ({
                    name: list['name'],
                }));
                setLists(listNames);
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
                    <li key={list['name']}>{list['name']}</li>
                ))}
            </ul>
        );
    };

    const renderFoursquareAuth = (): ReactElement => {
        return (
            <>
                <p className="foursquare-message">You should authorize on Foursqaure</p>
                <FoursquareButton redirectPath="/connect/foursquare" style={{ width: '300px' }}>
                    connect to foursquare
                </FoursquareButton>
            </>
        );
    };

    return (
        <div className="home-page-wrapper">
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
