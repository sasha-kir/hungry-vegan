// adapted from https://codesandbox.io/embed/github/tannerlinsley/react-table/tree/master/examples/editable-data
import React, { useState } from 'react';
import './style.css';

interface EditableCellProps {
    value: string;
    placeholder: string;
    row: number;
    recordData(row, value): void;
}

const EditableCell = ({ value: initialValue, placeholder, row, recordData }: EditableCellProps) => {
    const [value, setValue] = useState(initialValue);

    const onChange = e => {
        setValue(e.target.value);
    };

    const onBlur = () => {
        recordData(row, value);
    };

    return (
        <input
            className="editable-cell"
            autoComplete="no"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
        />
    );
};

export default EditableCell;
