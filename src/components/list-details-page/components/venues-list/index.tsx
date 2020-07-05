import React from 'react';
import VenuesListItem from './VenuesListItem';
import './style.css';

interface VenuesListProps {
    listItems: UserListItem[];
    currentSelection: UserListItem | null;
    selectItem(item: UserListItem): void;
}

const VenuesList = ({ listItems, selectItem, currentSelection }: VenuesListProps) => {
    return (
        <div className="venues-list">
            {listItems.map((item) => {
                const isSelected = currentSelection?.id === item.id;
                return (
                    <VenuesListItem
                        key={item.id}
                        item={item}
                        isSelected={isSelected}
                        selectItem={selectItem}
                    />
                );
            })}
        </div>
    );
};

export default VenuesList;
