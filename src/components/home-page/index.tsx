import React, { ReactElement, useEffect, useState } from 'react';
import { ResponseStatus } from 'api';
import { getUserLists } from 'api/foursquare';
import { useAuth } from 'context/auth';
import { FoursquareButton } from 'components/common';
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

    const renderLists = (): ReactElement<HTMLUListElement> => {
        if (lists.length === 0) {
            return <p style={{ color: 'white' }}>No lists yet</p>;
        }
        return (
            <ul className="responsive-table">
                <li className="table-header">
                    <div className="col col-1">List</div>
                    <div className="col col-2">City</div>
                    <div className="col col-3"># of places</div>
                    <div className="col col-4">Date created</div>
                </li>
                {lists.map(list => (
                    <li className="table-row" key={list.id}>
                        <div className="col col-1" data-label="List">
                            {list.name}
                        </div>
                        <div className="col col-2" data-label="City">
                            Moscow
                        </div>
                        <div className="col col-3" data-label="# of places">
                            {list.itemsCount}
                        </div>
                        <div className="col col-4" data-label="Date created">
                            {new Date(list.createdAt * 1000).toLocaleDateString('ru-RU')}
                        </div>
                    </li>
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
                {foursquareStatus === ResponseStatus.pending && (
                    <div style={{ color: 'white', textAlign: 'center' }}>Loading...</div>
                )}
                {foursquareStatus === ResponseStatus.success && (
                    <div className="lists-wrapper">{renderLists()}</div>
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
