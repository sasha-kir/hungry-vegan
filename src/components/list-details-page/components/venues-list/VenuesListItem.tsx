import React, { useState, useEffect, useRef, ReactElement } from 'react';
import { FiEdit2, FiSave, FiXCircle, FiBox, FiShoppingBag, FiAlertTriangle } from 'react-icons/fi';
import { formatDate } from 'utils/date';
import VenuesListItemEdit from './VenuesListItemEdit';

interface ListItemProps {
    item: UserListItem;
    isSelected: boolean;
    selectItem(item: UserListItem): void;
}

const VenuesListItem = ({ item, isSelected, selectItem }: ListItemProps) => {
    const [isEditingMode, setEditingMode] = useState<boolean>(false);
    const isFullView = isSelected && !isEditingMode;
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

    const toggleEdit = () => {
        setEditingMode(!isEditingMode);
    };

    const renderEditIcons = () => {
        return isEditingMode ? (
            <div className="list-item-stop-edit">
                <FiXCircle className="cancel" onClick={toggleEdit} />
                <FiSave className="save" />
            </div>
        ) : (
            <FiEdit2 className="list-item-start-edit" onClick={toggleEdit} />
        );
    };

    return (
        <div className="list-item-wrapper">
            <div className={itemClassName} ref={itemRef} onClick={() => selectItem(item)}>
                {item.name}
                {isSelected && renderEditIcons()}
                {!isEditingMode && (
                    <div className="list-item-tags">
                        {item.onlyDelivery && <FiBox className="negative" />}
                        {item.onlyTakeaway && <FiShoppingBag className="positive" />}
                        {item.maybeClosed && <FiAlertTriangle className="negative" />}
                    </div>
                )}
            </div>
            {isFullView && (
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
            )}
            {isEditingMode && <VenuesListItemEdit item={item} />}
        </div>
    );
};

export default VenuesListItem;
