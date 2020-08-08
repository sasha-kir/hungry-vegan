import React, { ReactElement, useState } from 'react';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import { useFoursquareClientId } from 'hooks/useFoursquareClientId';
import './style.css';

interface ListsTableProps {
    lists?: PublicList[];
    updateLists?(lists: UserList[]): Promise<UserList[] | undefined>;
}

const ListsTable = ({ lists, updateLists }: ListsTableProps): ReactElement<HTMLUListElement> => {
    const initialLocations = lists ? lists.map((l) => l?.location) : [];
    const [locations, setLocations] = useState<string[]>(initialLocations);
    const [isEditingMode, setEditingMode] = useState<boolean>(false);
    const { data: fsqClientId } = useFoursquareClientId();

    const recordCellData = (rowIndex, value): void => {
        setLocations((currentLocations) =>
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
        if (lists && updateLists) {
            if (!locations.every((location, index) => initialLocations[index] === location)) {
                const listsForUpdate = lists.map((list, index) => ({
                    ...list,
                    location: locations[index],
                }));
                updateLists(listsForUpdate as UserList[]);
            }
            setEditingMode(false);
        }
    };

    if (!lists?.length) {
        return <p style={{ color: 'black', textAlign: 'center' }}>No lists yet</p>;
    }

    return (
        <ul className="responsive-table">
            <TableHeader isEditingMode={isEditingMode} saveEdit={saveEdit} startEdit={startEdit} />
            {lists.map((list, index) => {
                return (
                    <TableRow
                        key={list.id}
                        isEditingMode={isEditingMode}
                        list={list}
                        listIndex={index}
                        location={locations[index]}
                        recordData={recordCellData}
                        fsqClientId={fsqClientId || ''}
                    />
                );
            })}
        </ul>
    );
};

export default ListsTable;
