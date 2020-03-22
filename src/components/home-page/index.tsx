import React, { ReactElement, useEffect, useState } from 'react';
import { useAuth } from '../../context/auth';
import { FsqStatus, getListsData } from '../../api/foursquare';
import { FancyButton, FoursquareButton } from '../common';
import './style.css';

interface ListData {
    name: string;
}

const HomePage: React.FC = () => {
    const [lists, setLists] = useState<ListData[]>([]);
    const [foursquareStatus, setFoursquareStatus] = useState<FsqStatus>(FsqStatus.pending);
    const { authToken, handleLogout } = useAuth();

    useEffect(() => {
        const fetchLists = async (): Promise<void> => {
            setFoursquareStatus(FsqStatus.pending);
            if (authToken === null) {
                handleLogout();
                return;
            }
            const { status, listsData } = await getListsData(authToken);
            switch (status) {
                case FsqStatus.success:
                    const listNames = listsData.map(list => ({
                        name: list['name'],
                    }));
                    setLists(listNames);
                    break;
                case FsqStatus.unauthorized:
                    handleLogout();
                    break;
                default:
                    break;
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
                {foursquareStatus === FsqStatus.pending && <div style={{ color: 'white' }}>Loading...</div>}
                {foursquareStatus === FsqStatus.success && <div style={{ color: 'white' }}>{renderLists()}</div>}
                {foursquareStatus === FsqStatus.rejected && renderFoursquareAuth()}
                {foursquareStatus === FsqStatus.error && (
                    <div style={{ color: 'red' }}>Error fetching Foursquare data</div>
                )}
            </div>
            <FancyButton onClick={handleLogout}>Logout</FancyButton>
        </div>
    );
};

export default HomePage;
