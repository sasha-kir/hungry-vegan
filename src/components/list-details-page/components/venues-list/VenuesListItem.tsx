import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FiEdit2, FiCheck, FiX, FiBox, FiShoppingBag, FiAlertTriangle } from 'react-icons/fi';
import VenuesListItemInfo from './VenuesListItemInfo';
import VenuesListItemEdit from './VenuesListItemEdit';

enum ListItemState {
    preview,
    fullInfo,
    editingMode,
}

interface ListItemProps {
    item: UserListItem;
    isSelected: boolean;
    selectItem(item: UserListItem): void;
}

const VenuesListItem = ({ item, isSelected, selectItem }: ListItemProps) => {
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

    const renderEditIcons = () => {
        return isEditingMode ? (
            <div className="list-item-stop-edit">
                <FiX className="cancel" onClick={toggleEdit} />
                <FiCheck className="save" />
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
            {itemState === ListItemState.fullInfo && <VenuesListItemInfo item={item} />}
            {isEditingMode && <VenuesListItemEdit item={item} />}
        </div>
    );
};

export default VenuesListItem;
