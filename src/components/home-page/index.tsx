import React, { ReactElement, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import config from '../../config';
import { FancyButton, FoursquareButton } from '../common';
import './style.css';

interface ListData {
    name: string;
}

enum FsqStatus {
    pending,
    success,
    rejected,
    error,
}

const HomePage: React.FC = () => {
    const [lists, setLists] = useState<ListData[]>([]);
    const [foursquareStatus, setFoursquareStatus] = useState<FsqStatus>(FsqStatus.pending);
    const { authToken, handleLogout } = useAuth();

    useEffect(() => {
        const fetchLists = async (): Promise<void> => {
            const url = config.apiUrl + '/foursquare-lists';
            setFoursquareStatus(FsqStatus.pending);
            try {
                const { data } = await axios.get(url, {
                    headers: {
                        Authentication: authToken,
                    },
                });
                const listNames = data.data.map(listData => ({
                    name: listData.name,
                }));
                setFoursquareStatus(FsqStatus.success);
                setLists(listNames);
            } catch (error) {
                if (error.response?.status === 400) {
                    setFoursquareStatus(FsqStatus.rejected);
                } else {
                    setFoursquareStatus(FsqStatus.error);
                }
            }
        };
        fetchLists();
    }, []);

    const renderLists = (): ReactElement<HTMLUListElement> => {
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
                <FoursquareButton style={{ width: '300px' }}>connect to foursquare</FoursquareButton>
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
