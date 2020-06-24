import React from 'react';
import { useParams } from 'react-router-dom';
import { YMaps } from 'react-yandex-maps';
import { ResponseStatus } from 'api';
import { CardWrapper, BeatLoader } from 'components/common';
import { useListDetails } from 'hooks/useListDetails';
import YandexMap from './components/venues-map';

import './style.css';

const ListDetailsPage: React.FC = () => {
    const { listName } = useParams();
    const { status, list: listDetails } = useListDetails(listName);

    const renderItem = (item) => {
        return (
            <div className="list-item" key={item.id}>
                {item.name}
            </div>
        );
    };

    const renderDetails = () => {
        const listItems = listDetails.items;
        return (
            <>
                <h1 className="list-name">{listName}</h1>
                <div className="list-container">
                    <div className="list-venues">{listItems.map((item) => renderItem(item))}</div>
                    <YandexMap location={listDetails.coordinates} />
                </div>
            </>
        );
    };

    const renderError = () => {
        return <h1>Error</h1>;
    };

    return (
        <YMaps query={{ lang: 'en_RU' }}>
            <div className="page-wrapper list-page-wrapper">
                <CardWrapper className="list-container-wrapper">
                    <BeatLoader flag={status === ResponseStatus.pending} />
                    {status === ResponseStatus.success && renderDetails()}
                    {status === ResponseStatus.error && renderError()}
                </CardWrapper>
            </div>
        </YMaps>
    );
};

export default ListDetailsPage;
