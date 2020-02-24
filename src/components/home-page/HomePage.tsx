import React, { ReactElement, useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../config';

const HomePage: React.FC = () => {
    const [lists, setLists] = useState([]);

    useEffect(() => {
        const fetchLists = async (): Promise<void> => {
            const url = config.apiUrl + '/foursquare-lists';
            try {
                const { data } = await axios.get(url, {
                    headers: {
                        Authentication: localStorage.getItem('token'),
                    },
                });
                const listNames = data.data.map(listData => ({
                    name: listData.name,
                }));
                setLists(listNames);
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchLists();
    }, []);

    const renderLists = (): ReactElement => {
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
            <div style={{ color: 'white' }}>{renderLists()}</div>
        </>
    );
};

export default HomePage;
