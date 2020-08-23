import React, { useRef, useEffect } from 'react';
import { FiEdit2 } from 'react-icons/fi';

import { useAuth } from 'context/auth';
import { formatDate, timeSince } from 'utils/date';
import { instagramLink, externalVenueLink } from 'utils/links';
import { DeliveryIcon, TakeawayIcon, ClosedIcon } from '../icons';

interface ItemViewProps {
    item: UserListItem;
    isSelected: boolean;
    toggleSelection(): void;
    toggleEdit(e): void;
}

const VenuesListItemView = ({ item, isSelected, toggleSelection, toggleEdit }: ItemViewProps) => {
    const { authToken } = useAuth();
    const itemRef = useRef<HTMLDivElement>(null);
    const itemClassName = isSelected ? 'list-item is-active' : 'list-item';

    useEffect(() => {
        if (isSelected) {
            setTimeout(() => {
                itemRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }, [isSelected]);

    const renderItemInfo = ({ item }: Pick<ItemViewProps, 'item'>) => {
        return (
            <div className="list-item-details">
                <ul>
                    <li data-label="city">{item.location.city || '—'}</li>
                    <li data-label="address">{item.location.address || '—'}</li>
                    <li data-label="instagram">
                        {item.instagram ? instagramLink(item.instagram) : '—'}
                    </li>
                    <li data-label="date added">{formatDate(item.addedAt)}</li>
                    <li data-label="date updated">{timeSince(item.updatedAt)}</li>
                </ul>
            </div>
        );
    };

    return (
        <>
            <div className={itemClassName} ref={itemRef} onClick={toggleSelection}>
                {isSelected ? externalVenueLink(item.id, item.name) : item.name}
                {authToken && isSelected && (
                    <FiEdit2 className="list-item-start-edit" onClick={toggleEdit} />
                )}
                <div className="list-item-tags">
                    {item.onlyDelivery && <DeliveryIcon />}
                    {item.onlyTakeaway && <TakeawayIcon />}
                    {item.maybeClosed && <ClosedIcon />}
                </div>
            </div>
            {isSelected && renderItemInfo({ item })}
        </>
    );
};

export default VenuesListItemView;
