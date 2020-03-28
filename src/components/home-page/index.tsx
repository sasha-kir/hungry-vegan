import React, { ReactElement, useEffect, useState } from 'react';
import { useAuth } from '../../context/auth';
import { ResponseStatus } from '../../api';
import { getListsData } from '../../api/foursquare';
import { FancyButton, FoursquareButton } from '../common';
import './style.css';

interface ListData {
    name: string;
}

const HomePage: React.FC = () => {
    const [lists, setLists] = useState<ListData[]>([]);
    const [foursquareStatus, setFoursquareStatus] = useState<ResponseStatus>(ResponseStatus.pending);
    const { handleLogout } = useAuth();

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
            <h1 className="home-page-header">Home</h1>
            <div className="home-page-content">
                {foursquareStatus === ResponseStatus.pending && <div style={{ color: 'white' }}>Loading...</div>}
                {foursquareStatus === ResponseStatus.success && <div style={{ color: 'white' }}>{renderLists()}</div>}
                {foursquareStatus === ResponseStatus.rejected && renderFoursquareAuth()}
                {foursquareStatus === ResponseStatus.error && (
                    <div style={{ color: 'red' }}>Error fetching Foursquare data</div>
                )}
            </div>
            <FancyButton onClick={handleLogout}>Logout</FancyButton>
        </div>
    );
};

export default HomePage;
