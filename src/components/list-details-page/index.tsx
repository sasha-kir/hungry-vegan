import React from 'react';
import { useParams } from 'react-router-dom';
import { ResponseStatus } from 'api';
import { CardWrapper, BeatLoader } from 'components/common';
import { useListDetails } from 'hooks/useListDetails';
import './style.css';

const ListDetailsPage: React.FC = () => {
    const { listName } = useParams();
    const { status, list: listDetails } = useListDetails(listName);

    const renderItem = (item) => {
        return <div key={item.id}>{item.name}</div>;
    };

    const renderDetails = () => {
        const listItems = listDetails.items;
        return (
            <>
                <h1>{listName}</h1>
                <div>{listItems.map((item) => renderItem(item))}</div>
            </>
        );
    };

    const renderError = () => {
        return <h1>Error</h1>;
    };

    return (
        <div className="page-wrapper">
            <CardWrapper>
                <BeatLoader flag={status === ResponseStatus.pending} />
                {status === ResponseStatus.success && renderDetails()}
                {status === ResponseStatus.error && renderError()}
            </CardWrapper>
        </div>
    );
};

export default ListDetailsPage;
