import React, { ReactElement, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import config from '../../config';

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
    const { handleLogout } = useAuth();

    useEffect(() => {
        const fetchLists = async (): Promise<void> => {
            const url = config.apiUrl + '/foursquare-lists';
            setFoursquareStatus(FsqStatus.pending);
            try {
                const { data } = await axios.get(url, {
                    headers: {
                        Authentication: localStorage.getItem('token'),
                    },
                });
                const listNames = data.data.map(listData => ({
                    name: listData.name,
                }));
                setFoursquareStatus(FsqStatus.success);
                setLists(listNames);
            } catch (error) {
                if (error.response.status === 400) {
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
    return (
        <>
            <div style={{ color: 'white', fontSize: '30px' }}>Home</div>
            {foursquareStatus === FsqStatus.pending && <div style={{ color: 'white' }}>Loading...</div>}
            {foursquareStatus === FsqStatus.success && <div style={{ color: 'white' }}>{renderLists()}</div>}
            {foursquareStatus === FsqStatus.rejected && (
                <div style={{ color: 'white' }}>You should authorize on Foursqaure</div>
            )}
            {foursquareStatus === FsqStatus.error && <div style={{ color: 'red' }}>Error fetching Foursquare data</div>}
            <button onClick={handleLogout}>Logout</button>
        </>
    );
};

export default HomePage;
