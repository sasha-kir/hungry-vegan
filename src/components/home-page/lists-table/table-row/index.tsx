import React, { ReactElement } from 'react';
import { EditableCell } from 'components/common';
import './style.css';

interface TableRowProps {
    isEditingMode: boolean;
    list: UserList;
    listIndex: number;
    location: string;
    recordData(index: number, value: string): void;
}

const TableRow = ({
    isEditingMode,
    list,
    listIndex,
    location,
    recordData,
}: TableRowProps): ReactElement => {
    const noLocation = location.length <= 1;
    return (
        <li className={`table-row ${noLocation ? 'table-row-disabled' : ''}`}>
            <div className="col col-1" data-label="List">
                {list.name}
            </div>
            <div className="col col-2" data-label="Location">
                {isEditingMode ? (
                    <EditableCell
                        value={location}
                        placeholder="List location"
                        row={listIndex}
                        recordData={recordData}
                    />
                ) : (
                    location
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
};

export default TableRow;
