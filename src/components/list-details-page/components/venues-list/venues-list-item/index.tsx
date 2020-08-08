import React, { useState, useEffect, useCallback } from 'react';
import { AiOutlineRollback } from 'react-icons/ai';
import { QueryStatus } from 'react-query';

import { useListItemMutation } from 'hooks/useListDetails';
import VenuesListItemView from './VenuesListItemView';
import VenuesListItemEdit from './VenuesListItemEdit';

enum ListItemState {
    preview,
    fullInfo,
    editingMode,
    error,
}

interface ListItemProps {
    item: UserListItem;
    isSelected: boolean;
    selectItem(item: UserListItem | null): void;
}

const VenuesListItem = ({ item, isSelected, selectItem }: ListItemProps) => {
    const [updateItem, { status }] = useListItemMutation();

    const getInitialState = useCallback(
        () => (isSelected ? ListItemState.fullInfo : ListItemState.preview),
        [isSelected],
    );
    const [itemState, setItemState] = useState<ListItemState>(getInitialState);
    const isEditingMode = itemState === ListItemState.editingMode;

    useEffect(() => {
        if (!isEditingMode || (!isSelected && isEditingMode)) {
            setItemState(getInitialState);
        }
        if (status === QueryStatus.Error) {
            setItemState(ListItemState.error);
        }
    }, [isSelected, isEditingMode, getInitialState, status]);

    const toggleSelection = () => {
        isSelected ? selectItem(null) : selectItem(item);
    };

    const toggleEdit = (event) => {
        event?.stopPropagation();
        if (itemState === ListItemState.editingMode) {
            setItemState(getInitialState);
        } else {
            setItemState(ListItemState.editingMode);
        }
    };

    const saveEdit = async (updatedItem: UserListItem) => {
        setItemState(getInitialState);
        await updateItem(updatedItem);
    };

    const renderError = () => {
        const handleClick = () => {
            setItemState(ListItemState.fullInfo);
        };
        return (
            <div className="list-item-error">
                Error!
                <AiOutlineRollback onClick={handleClick} className="list-item-icon" />
            </div>
        );
    };

    return (
        <div className="list-item-wrapper">
            {itemState === ListItemState.editingMode && (
                <VenuesListItemEdit item={item} toggleEdit={toggleEdit} saveEdit={saveEdit} />
            )}
            {[ListItemState.preview, ListItemState.fullInfo].includes(itemState) && (
                <VenuesListItemView
                    item={item}
                    isSelected={isSelected}
                    toggleSelection={toggleSelection}
                    toggleEdit={toggleEdit}
                />
            )}
            {itemState === ListItemState.error && renderError()}
        </div>
    );
};

export default VenuesListItem;
