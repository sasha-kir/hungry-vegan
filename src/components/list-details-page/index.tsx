import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { YMaps } from 'react-yandex-maps';
import { FiArrowLeft } from 'react-icons/fi';
import { ResponseStatus } from 'api';
import { CardWrapper, BeatLoader, LoadingError } from 'components/common';
import { useListDetails } from 'hooks/useListDetails';
import VenuesList from './components/venues-list';
import VenuesMap from './components/venues-map';

import errorIllustration from 'images/pizza.svg';
import './style.css';

const ListDetailsPage: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<UserListItem | null>(null);
    const { listOwner, listName } = useParams();
    const history = useHistory();
    const [fetchList, updateItem, { status, list: listDetails }] = useListDetails(
        listOwner,
        listName,
    );

    const goBack = () => {
        history.goBack();
    };

    const selectItem = (item: UserListItem): void => {
        item.id === selectedItem?.id ? setSelectedItem(null) : setSelectedItem(item);
    };

    const renderDetails = () => {
        return (
            <>
                <div className="list-header">
                    <FiArrowLeft onClick={goBack} />
                    <h1 className="list-name">{listName}</h1>
                </div>

                <div className="list-container">
                    <VenuesList
                        listItems={listDetails?.items}
                        selectItem={selectItem}
                        currentSelection={selectedItem}
                        updateItem={updateItem}
                    />
                    <VenuesMap
                        listLocation={listDetails?.coordinates}
                        listItems={listDetails?.items}
                        selectItem={selectItem}
                        currentSelection={selectedItem}
                    />
                </div>
            </>
        );
    };

    const renderError = () => {
        return (
            <LoadingError
                illustration={errorIllustration}
                retryMethod={fetchList}
                retryMethodParams={[listOwner, listName]}
            />
        );
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
