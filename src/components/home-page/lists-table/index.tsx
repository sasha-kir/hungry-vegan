import React, { ReactElement, useState } from 'react';
import { FiEdit2, FiSave } from 'react-icons/fi';
import { EditableCell } from 'components/common';
import './style.css';

interface ListsTableProps {
    lists: FoursquareList[];
    updateLists(lists: FoursquareList[]): Promise<void>;
}

const ListsTable = ({ lists, updateLists }: ListsTableProps): ReactElement<HTMLUListElement> => {
    const initialCities = lists.map(l => l.city);
    const [cities, setCities] = useState<string[]>(initialCities);
    const [isEditingMode, setEditingMode] = useState<boolean>(false);

    const recordCellData = (rowIndex, value) => {
        setCities(currentCities =>
            currentCities.map((row, index) => {
                if (index === rowIndex) return value;
                return row;
            }),
        );
    };

    const startEdit = (): void => {
        setEditingMode(true);
    };

    const saveEdit = (): void => {
        if (!cities.every((city, index) => initialCities[index] === city)) {
            const listsForUpdate = lists.map((list, index) => ({ ...list, city: cities[index] }));
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
                    <div className="col">City</div>
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
                const city = cities[index];
                return (
                    <li className="table-row" key={list.id}>
                        <div className="col col-1" data-label="List">
                            {list.name}
                        </div>
                        <div className="col col-2" data-label="City">
                            {isEditingMode ? (
                                <EditableCell
                                    value={city}
                                    placeholder="List city"
                                    row={index}
                                    recordData={recordCellData}
                                />
                            ) : (
                                city || '-'
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
