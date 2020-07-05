import React, { useEffect, useRef, ReactElement } from 'react';
import { FiTruck, FiShoppingBag } from 'react-icons/fi';
import { formatDate } from 'utils/date';

interface ListItemProps {
    item: UserListItem;
    isSelected: boolean;
    selectItem(item: UserListItem): void;
}

const VenuesListItem = ({ item, isSelected, selectItem }: ListItemProps) => {
    const itemClassName = isSelected ? 'list-item is-active' : 'list-item';
    const itemRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isSelected) {
            itemRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [isSelected]);

    const instagramLink = (handle: string): ReactElement<HTMLLinkElement> => (
        <a href={`https://instagram.com/${handle}`} rel="noopener noreferrer" target="_blank">
            {handle}
        </a>
    );

    return (
        <div className="list-item-wrapper">
            <div className={itemClassName} ref={itemRef} onClick={() => selectItem(item)}>
                {item.name}
                <div className="list-item-tags">
                    {item.onlyDelivery && <FiTruck className="warning" />}
                    {item.onlyTakeaway && <FiShoppingBag className="positive" />}
                </div>
            </div>
            {isSelected && (
                <div className="list-item-details">
                    <ul>
                        <li data-label="City">{item.location.city || '—'}</li>
                        <li data-label="Address">{item.location.address || '—'}</li>
                        <li data-label="Instagram">
                            {item.instagram ? instagramLink(item.instagram) : '—'}
                        </li>
                        <li data-label="Added">{formatDate(item.addedAt)}</li>
                        <li data-label="Updated">{formatDate(item.updatedAt)}</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default VenuesListItem;
