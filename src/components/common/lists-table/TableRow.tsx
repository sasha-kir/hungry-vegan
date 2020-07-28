import React, { useState, ReactElement } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { useMediaPredicate } from 'react-media-hook';
import AnimateHeight from 'react-animate-height';
import { FiChevronDown, FiMapPin, FiExternalLink } from 'react-icons/fi';
import { IoLogoFoursquare } from 'react-icons/io';

import { EditableCell } from 'components/common';
import { useAuth } from 'context/auth';
import { formatDate } from 'utils/date';

interface TableRowProps {
    isEditingMode: boolean;
    list: PublicList;
    listIndex: number;
    location: string;
    fsqClientId: string;
    recordData(index: number, value: string): void;
}

const TableRow = ({
    isEditingMode,
    list,
    listIndex,
    location,
    fsqClientId,
    recordData,
}: TableRowProps): ReactElement => {
    const { authToken } = useAuth();
    const noLocation = !location.length;
    const [isOpen, setOpen] = useState<boolean>(false);
    const [detailsHeight, setHeight] = useState<number>(0);
    const isMobile = useMediaPredicate('(max-width: 900px)');

    const toggleRow = () => {
        if (isEditingMode) {
            return;
        }
        if (!isOpen) {
            isMobile ? setHeight(70) : setHeight(60);
        } else {
            setHeight(0);
        }
        setOpen(!isOpen);
    };

    const rowClasses = ['table-row'];
    if (noLocation) rowClasses.push('table-row-disabled');
    isOpen ? rowClasses.push('table-row-open') : rowClasses.push('table-row-closed');

    const renderToggleIcon = () => {
        const parentSelector = isMobile ? `row-wrapper-${listIndex}` : `desktop-icon-${listIndex}`;
        const parent = document.getElementById(parentSelector);
        return parent !== null
            ? createPortal(
                  <FiChevronDown className="table-icon toggle-icon" onClick={toggleRow} />,
                  parent,
              )
            : null;
    };

    const foursquareUrl = `http://foursquare.com/list/${list.id}?ref=${fsqClientId}`;
    const listUrl = `/lists/${String(list.name).toLowerCase()}`;

    return (
        <div id={`row-wrapper-${listIndex}`} className="table-row-wrapper">
            <li className={rowClasses.join(' ')} onClick={toggleRow}>
                <div className="col col-1" data-label="list">
                    {list.name}
                </div>
                <div className="col col-2" data-label="location">
                    {authToken && isEditingMode ? (
                        <EditableCell
                            value={location}
                            placeholder="List location"
                            row={listIndex}
                            recordData={recordData}
                        />
                    ) : (
                        location || '—'
                    )}
                </div>
                <div className="col col-3" data-label="# of places">
                    {list.itemsCount}
                </div>
                <div className="col col-4" data-label="date updated">
                    {formatDate(list.updatedAt)}
                </div>
                <div id={`desktop-icon-${listIndex}`} className="col-5"></div>
            </li>
            {isOpen && <hr className="table-row-separator"></hr>}
            <AnimateHeight duration={300} height={detailsHeight}>
                <div className="table-row-details">
                    <div className="col link-block link-block-left" data-label="original list">
                        {!isMobile && <IoLogoFoursquare />}
                        <a href={foursquareUrl} rel="noopener noreferrer" target="_blank">
                            open in Foursquare
                        </a>
                        {isMobile && <FiExternalLink />}
                    </div>
                    <div className="col link-block link-block-right" data-label="details">
                        {!isMobile && <FiMapPin />}
                        <Link to={listUrl}>show details</Link>
                    </div>
                </div>
            </AnimateHeight>
            {renderToggleIcon()}
        </div>
    );
};

export default TableRow;
