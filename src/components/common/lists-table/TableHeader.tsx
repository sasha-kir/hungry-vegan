import React, { ReactElement } from 'react';
import { FiInfo, FiEdit2, FiSave } from 'react-icons/fi';
import { useAuth } from 'context/auth';
import { Tooltip } from 'components/common';

interface TableHeaderProps {
    isEditingMode: boolean;
    startEdit(): void;
    saveEdit(): void;
}

const TableHeader = ({ isEditingMode, startEdit, saveEdit }: TableHeaderProps): ReactElement => {
    const { authToken } = useAuth();

    const renderEditing = () => {
        return isEditingMode ? (
            <FiSave className="table-icon" onClick={saveEdit} />
        ) : (
            <FiEdit2 className="table-icon" onClick={startEdit} />
        );
    };

    return (
        <li className="table-header">
            <div className="col-1 col-with-icon">
                <div className="col">List</div>
                <FiInfo className="table-icon" />
                <Tooltip top="2px" left="130px">
                    sorted by closest to your location
                </Tooltip>
            </div>
            <div className="col-2 col-with-icon">
                <div className="col">Location</div>
                {authToken && renderEditing()}
            </div>
            <div className="col col-3"># of places</div>
            <div className="col col-4">Date updated</div>
        </li>
    );
};

export default TableHeader;
