import React, { ReactElement } from 'react';

export const externalLink = (
    href: string,
    content: ReactElement | string,
): ReactElement<HTMLLinkElement> => {
    return (
        <a href={href} rel="noopener noreferrer" target="_blank">
            {content}
        </a>
    );
};

export const externalVenueLink = (
    venueId: string,
    venueName: string,
): ReactElement<HTMLLinkElement> => {
    const url = `https://foursquare.com/v/${venueId}`;
    return externalLink(url, venueName);
};

export const externalListLink = (
    listId: string,
    fsqClientId: string,
    text: string,
): ReactElement<HTMLLinkElement> => {
    const url = `http://foursquare.com/list/${listId}?ref=${fsqClientId}`;
    return externalLink(url, text);
};

export const instagramLink = (handle: string): ReactElement<HTMLLinkElement> => {
    const url = `https://instagram.com/${handle}`;
    return externalLink(url, handle);
};
