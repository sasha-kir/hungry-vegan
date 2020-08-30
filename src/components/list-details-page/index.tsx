import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { QueryStatus } from 'react-query';
import { YMaps } from 'react-yandex-maps';
import { FiArrowLeft, FiRefreshCcw } from 'react-icons/fi';

import { CardWrapper, BeatLoader, LoadingError } from 'components/common';
import { useListDataQuery, useListDataRefresh } from 'hooks/useListDetails';
import VenuesList from './components/venues-list';
import VenuesMap from './components/venues-map';

import errorIllustration from 'images/pizza.svg';
import './style.css';

interface ListPageParams {
    listOwner: string;
    listName: string;
}

const ListDetailsPage: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<UserListItem | null>(null);
    const { listOwner, listName } = useParams<ListPageParams>();
    const history = useHistory();

    const { status, data: listDetails, refetch } = useListDataQuery({ listOwner, listName });
    const [refreshData] = useListDataRefresh();

    const goBack = () => {
        history.goBack();
    };

    const refreshList = () => {
        refreshData({ listOwner, listName });
    };

    const selectItem = (item: UserListItem | null): void => {
        setSelectedItem(item);
    };

    const renderDetails = () => {
        return (
            <>
                <div className="list-header">
                    <FiArrowLeft onClick={goBack} />
                    <h1 className="list-name">{listName}</h1>
                    <FiRefreshCcw className="list-refresh" onClick={refreshList} />
                </div>

                <div className="list-container">
                    <VenuesList
                        listItems={listDetails?.items}
                        selectItem={selectItem}
                        currentSelection={selectedItem}
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
        return <LoadingError illustration={errorIllustration} retryMethod={refetch} />;
    };

    return (
        <YMaps query={{ lang: 'en_RU', apikey: process.env.REACT_APP_YANDEX_API_KEY }} preload>
            <div className="page-wrapper list-page-wrapper">
                <CardWrapper className="list-container-wrapper">
                    <BeatLoader flag={status === QueryStatus.Loading} />
                    {status === QueryStatus.Success && renderDetails()}
                    {status === QueryStatus.Error && renderError()}
                </CardWrapper>
            </div>
        </YMaps>
    );
};

export default ListDetailsPage;
