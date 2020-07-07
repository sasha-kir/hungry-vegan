import React, { ReactElement } from 'react';
import { formatDate } from 'utils/date';

interface ItemInfoProps {
    item: UserListItem;
}

const VenuesListItemInfo = ({ item }: ItemInfoProps) => {
    const instagramLink = (handle: string): ReactElement<HTMLLinkElement> => (
        <a href={`https://instagram.com/${handle}`} rel="noopener noreferrer" target="_blank">
            {handle}
        </a>
    );

    return (
        <div className="list-item-details">
            <ul>
                <li data-label="city">{item.location.city || '—'}</li>
                <li data-label="address">{item.location.address || '—'}</li>
                <li data-label="instagram">
                    {item.instagram ? instagramLink(item.instagram) : '—'}
                </li>
                <li data-label="date added">{formatDate(item.addedAt)}</li>
                <li data-label="date updated">{formatDate(item.updatedAt)}</li>
            </ul>
        </div>
    );
};

export default VenuesListItemInfo;
