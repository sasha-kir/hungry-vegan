import React, { useEffect, useRef } from 'react';
import { FiTruck, FiShoppingBag } from 'react-icons/fi';

interface ListItemProps {
    item: UserListItem;
    isSelected: boolean;
    selectItem(item: UserListItem): void;
}

const VenuesListItem = ({ item, isSelected, selectItem }: ListItemProps) => {
    const className = isSelected ? 'list-item is-active' : 'list-item';
    const itemRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isSelected && itemRef.current) {
            itemRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [isSelected]);

    return (
        <div className={className} ref={itemRef} onClick={() => selectItem(item)}>
            {item.name}
            <div className="list-tags">
                {item.onlyDelivery && <FiTruck className="warning" />}
                {item.onlyTakeaway && <FiShoppingBag className="positive" />}
            </div>
        </div>
    );
};

export default VenuesListItem;
