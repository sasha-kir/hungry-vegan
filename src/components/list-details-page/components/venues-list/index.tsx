import React from 'react';
import { FiTruck, FiShoppingBag } from 'react-icons/fi';
import './style.css';

interface VenuesListProps {
    listItems: UserListItem[];
    currentSelection: UserListItem | null;
    selectItem(item: UserListItem): void;
}

const VenuesList = ({ listItems, selectItem, currentSelection }: VenuesListProps) => {
    const renderItem = (item) => {
        const isSelected = currentSelection?.id === item.id;
        const className = isSelected ? 'list-item is-active' : 'list-item';
        return (
            <div className={className} key={item.id} onClick={() => selectItem(item)}>
                {item.name}
                <div className="list-tags">
                    {item.onlyDelivery && <FiTruck className="warning" />}
                    {item.onlyTakeaway && <FiShoppingBag className="positive" />}
                </div>
            </div>
        );
    };

    return <div className="venues-list">{listItems.map((item) => renderItem(item))}</div>;
};

export default VenuesList;
