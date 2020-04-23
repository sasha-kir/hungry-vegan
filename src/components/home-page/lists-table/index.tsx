import React, { ReactElement, useState } from 'react';
import { FiEdit2, FiSave } from 'react-icons/fi';
import { EditableCell } from 'components/common';
import './style.css';

interface ListsTableProps {
    lists: FoursquareList[];
}

const ListsTable = ({ lists }: ListsTableProps): ReactElement<HTMLUListElement> => {
    const [cities, setCities] = useState<string[]>(lists.map(l => l.city));
    const [isEditingMode, setEditingMode] = useState<boolean>(false);

    const updateCellData = (rowIndex, value) => {
        setCities(old =>
            old.map((row, index) => {
                if (index === rowIndex) return value;
                return row;
            }),
        );
    };

    const startEdit = (): void => {
        setEditingMode(true);
    };

    const saveEdit = (): void => {
        setEditingMode(false);
    };

    if (lists.length === 0) {
        return <p style={{ color: 'white' }}>No lists yet</p>;
    }

    return (
        <ul className="responsive-table">
            <li className="table-header">
                <div className="col col-1">List</div>
                <div className="col col-2">
                    City
                    {isEditingMode ? (
                        <FiSave className="table-header-icon" onClick={saveEdit} />
                    ) : (
                        <FiEdit2 className="table-header-icon" onClick={startEdit} />
                    )}
                </div>
                <div className="col col-3"># of places</div>
                <div className="col col-4">Date created</div>
            </li>
            {lists.map((list, index) => (
                <li className="table-row" key={list.id}>
                    <div className="col col-1" data-label="List">
                        {list.name}
                    </div>
                    <div className="col col-2" data-label="City">
                        {isEditingMode ? (
                            <EditableCell
                                value={list.city}
                                placeholder="List city"
                                row={index}
                                updateData={updateCellData}
                            />
                        ) : (
                            list.city || '-'
                        )}
                    </div>
                    <div className="col col-3" data-label="# of places">
                        {list.itemsCount}
                    </div>
                    <div className="col col-4" data-label="Date created">
                        {new Date(list.createdAt * 1000).toLocaleDateString('ru-RU')}
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default ListsTable;
