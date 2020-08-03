import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FiEdit2, FiBox, FiShoppingBag, FiAlertTriangle } from 'react-icons/fi';
import VenuesListItemInfo from './VenuesListItemInfo';
import VenuesListItemEdit from './VenuesListItemEdit';
import { useAuth } from 'context/auth';
import { externalVenueLink } from 'utils/links';

enum ListItemState {
    preview,
    fullInfo,
    editingMode,
}

interface ListItemProps {
    item: UserListItem;
    isSelected: boolean;
    selectItem(item: UserListItem): void;
    updateItem(item: UserListItem): void;
}

const VenuesListItem = ({ item, isSelected, selectItem, updateItem }: ListItemProps) => {
    const { authToken } = useAuth();
    const getInitialState = useCallback(
        () => (isSelected ? ListItemState.fullInfo : ListItemState.preview),
        [isSelected],
    );
    const [itemState, setItemState] = useState<ListItemState>(getInitialState);
    const isEditingMode = itemState === ListItemState.editingMode;
    const itemClassName = isSelected ? 'list-item is-active' : 'list-item';
    const itemRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isEditingMode || (!isSelected && isEditingMode)) {
            setItemState(getInitialState);
        }
    }, [isSelected, isEditingMode, getInitialState]);

    useEffect(() => {
        if (isSelected) {
            setTimeout(() => {
                itemRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }, [isSelected]);

    const toggleEdit = () => {
        if (itemState === ListItemState.editingMode) {
            setItemState(getInitialState);
        } else {
            setItemState(ListItemState.editingMode);
        }
    };

    const saveEdit = (updatedItem: UserListItem) => {
        toggleEdit();
        updateItem(updatedItem);
    };

    return (
        <div className="list-item-wrapper">
            {isEditingMode ? (
                <VenuesListItemEdit item={item} toggleEdit={toggleEdit} saveEdit={saveEdit} />
            ) : (
                <>
                    <div className={itemClassName} ref={itemRef} onClick={() => selectItem(item)}>
                        {isSelected ? externalVenueLink(item.id, item.name) : item.name}
                        {authToken && isSelected && (
                            <FiEdit2 className="list-item-start-edit" onClick={toggleEdit} />
                        )}
                        <div className="list-item-tags">
                            {item.onlyDelivery && <FiBox className="negative" />}
                            {item.onlyTakeaway && <FiShoppingBag className="positive" />}
                            {item.maybeClosed && <FiAlertTriangle className="negative" />}
                        </div>
                    </div>
                    {isSelected && <VenuesListItemInfo item={item} />}
                </>
            )}
        </div>
    );
};

export default VenuesListItem;
