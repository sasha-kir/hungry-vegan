import React, { useState, ReactElement } from 'react';
import { EditableCell } from 'components/common';
import { FiPlusCircle, FiChevronDown } from 'react-icons/fi';
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
    const [isOpen, setOpen] = useState<boolean>(false);

    const toggleRow = () => {
        setOpen(!isOpen);
    };

    const rowClasses = ['table-row'];
    if (noLocation) rowClasses.push('table-row-disabled');
    if (isOpen) rowClasses.push('table-row-open');

    return (
        <li className={rowClasses.join(' ')}>
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
            <FiPlusCircle className="table-icon desktop-icon" onClick={toggleRow} />
            <FiChevronDown className="table-icon mobile-icon" onClick={toggleRow} />
        </li>
    );
};

export default TableRow;
