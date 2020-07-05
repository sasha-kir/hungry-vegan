import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { YMaps } from 'react-yandex-maps';
import { FiArrowLeft } from 'react-icons/fi';
import { ResponseStatus } from 'api';
import { CardWrapper, BeatLoader } from 'components/common';
import { useListDetails } from 'hooks/useListDetails';
import VenuesList from './components/venues-list';
import VenuesMap from './components/venues-map';

import './style.css';

const ListDetailsPage: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<UserListItem | null>(null);
    const { listName } = useParams();
    const history = useHistory();
    const { status, list: listDetails } = useListDetails(listName);

    const goBack = () => {
        history.goBack();
    };

    const selectItem = (item: UserListItem): void => {
        setSelectedItem(item);
    };

    const mapCenter =
        selectedItem === null ? listDetails?.coordinates : selectedItem.location.coordinates;
    const shouldZoom = selectedItem === null ? false : true;

    const renderDetails = () => {
        return (
            <>
                <div className="list-header">
                    <FiArrowLeft onClick={goBack} />
                    <h1 className="list-name">{listName}</h1>
                </div>

                <div className="list-container">
                    <VenuesList
                        listItems={listDetails.items}
                        selectItem={selectItem}
                        currentSelection={selectedItem}
                    />
                    <VenuesMap location={mapCenter} venues={listDetails.items} zoom={shouldZoom} />
                </div>
            </>
        );
    };

    const renderError = () => {
        return <h1>Error</h1>;
    };

    return (
        <YMaps query={{ lang: 'en_RU' }} preload>
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
