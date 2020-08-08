import React from 'react';
import VenuesListItem from './venues-list-item';
import './style.css';

interface VenuesListProps {
    listItems?: UserListItem[];
    currentSelection: UserListItem | null;
    selectItem(item: UserListItem | null): void;
}

const VenuesList = ({ listItems, selectItem, currentSelection }: VenuesListProps) => {
    return (
        <div className="venues-list-container">
            <div className="venues-list">
                {listItems?.length ? (
                    listItems.map((item) => {
                        const isSelected = currentSelection?.id === item.id;
                        return (
                            <VenuesListItem
                                key={item.id}
                                item={item}
                                isSelected={isSelected}
                                selectItem={selectItem}
                            />
                        );
                    })
                ) : (
                    <div>No items on this list yet</div>
                )}
            </div>
        </div>
    );
};

export default VenuesList;
