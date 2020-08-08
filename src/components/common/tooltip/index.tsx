import React, { ReactElement } from 'react';
import './style.css';

interface TooltipProps {
    children: ReactElement | string;
    top?: string;
    left?: string;
    bottom?: string;
    right?: string;
    width?: string;
}
const Tooltip = ({
    children,
    top = 'auto',
    left = 'auto',
    right = 'auto',
    bottom = 'auto',
    width = '115px',
}: TooltipProps): ReactElement<HTMLDivElement> => {
    return (
        <div className="tooltip" style={{ top, left, bottom, right, width }}>
            {children}
        </div>
    );
};
export default Tooltip;
