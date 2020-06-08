import React, { ReactElement } from 'react';
import { FiInfo, FiEdit2, FiSave } from 'react-icons/fi';
import './style.css';

interface TableHeaderProps {
    isEditingMode: boolean;
    startEdit(): void;
    saveEdit(): void;
}

const TableHeader = ({ isEditingMode, startEdit, saveEdit }: TableHeaderProps): ReactElement => {
    return (
        <li className="table-header">
            <div className="col-1 col-with-icon">
                <div className="col">List</div>
                <FiInfo className="table-icon" />
                <div className="tooltip">sorted by closest to your location</div>
            </div>
            <div className="col-2 col-with-icon">
                <div className="col">Location</div>
                {isEditingMode ? (
                    <FiSave className="table-icon" onClick={saveEdit} />
                ) : (
                    <FiEdit2 className="table-icon" onClick={startEdit} />
                )}
            </div>
            <div className="col col-3"># of places</div>
            <div className="col col-4">Date created</div>
        </li>
    );
};

export default TableHeader;
