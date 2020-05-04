import React, { ReactElement, useState } from 'react';
import { FiEdit2, FiSave } from 'react-icons/fi';
import { EditableCell } from 'components/common';
import './style.css';

interface ListsTableProps {
    lists: UserList[];
    updateLists(lists: UserList[]): Promise<void>;
}

const ListsTable = ({ lists, updateLists }: ListsTableProps): ReactElement<HTMLUListElement> => {
    const initialLocations = lists.map(l => l.location);
    const [locations, setLocations] = useState<string[]>(initialLocations);
    const [isEditingMode, setEditingMode] = useState<boolean>(false);

    const recordCellData = (rowIndex, value) => {
        setLocations(currentLocations =>
            currentLocations.map((row, index) => {
                if (index === rowIndex) return value;
                return row;
            }),
        );
    };

    const startEdit = (): void => {
        setEditingMode(true);
    };

    const saveEdit = (): void => {
        if (!locations.every((location, index) => initialLocations[index] === location)) {
            const listsForUpdate = lists.map((list, index) => ({
                ...list,
                location: locations[index],
            }));
            updateLists(listsForUpdate);
        }
        setEditingMode(false);
    };

    if (lists.length === 0) {
        return <p style={{ color: 'white' }}>No lists yet</p>;
    }

    return (
        <ul className="responsive-table">
            <li className="table-header">
                <div className="col col-1">List</div>
                <div className="col-2 col-with-icon">
                    <div className="col">Location</div>
                    {isEditingMode ? (
                        <FiSave className="table-header-icon" onClick={saveEdit} />
                    ) : (
                        <FiEdit2 className="table-header-icon" onClick={startEdit} />
                    )}
                </div>
                <div className="col col-3"># of places</div>
                <div className="col col-4">Date created</div>
            </li>
            {lists.map((list, index) => {
                const location = locations[index];
                return (
                    <li className="table-row" key={list.id}>
                        <div className="col col-1" data-label="List">
                            {list.name}
                        </div>
                        <div className="col col-2" data-label="Location">
                            {isEditingMode ? (
                                <EditableCell
                                    value={location}
                                    placeholder="List location"
                                    row={index}
                                    recordData={recordCellData}
                                />
                            ) : (
                                location || '-'
                            )}
                        </div>
                        <div className="col col-3" data-label="# of places">
                            {list.itemsCount}
                        </div>
                        <div className="col col-4" data-label="Date created">
                            {new Date(list.createdAt * 1000).toLocaleDateString('ru-RU')}
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

export default ListsTable;
