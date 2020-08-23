import React, { useState, useEffect, useCallback } from 'react';
import { Map, Placemark, ZoomControl, GeolocationControl } from 'react-yandex-maps';

import './style.css';

interface MapProps {
    listLocation?: ListCoordinates | null;
    listItems?: UserListItem[];
    currentSelection: UserListItem | null;
    selectItem(item: UserListItem): void;
}

const DEFAULT_COLOR = '#001e1d';
const SELECTED_COLOR = '#19a186';

const VenuesMap = ({ listLocation, listItems, currentSelection, selectItem }: MapProps) => {
    const initialZoom = useCallback(() => {
        return currentSelection === null ? false : true;
    }, [currentSelection]);
    const [shouldZoom, setShouldZoom] = useState<boolean>(initialZoom);

    useEffect(() => {
        setShouldZoom(initialZoom);
    }, [initialZoom]);

    const formatCoords = (location: ListCoordinates): [number, number] => [
        location.latitude,
        location.longitude,
    ];

    let mapCoords: [number, number] = [0, 0];
    if (currentSelection) {
        mapCoords = formatCoords(currentSelection.coordinates);
    } else if (listLocation) {
        mapCoords = formatCoords(listLocation);
    } else if (listItems?.length) {
        mapCoords = formatCoords(listItems[0].coordinates);
    }

    const handleUserLocation = () => {
        setShouldZoom(true);
    };

    const renderPlacemark = (item: UserListItem) => {
        const venueCoords = formatCoords(item.coordinates);

        const isSelected = item.id === currentSelection?.id;
        const placemarkColor = isSelected ? SELECTED_COLOR : DEFAULT_COLOR;

        return (
            <Placemark
                key={item.id}
                onClick={() => selectItem(item)}
                modules={['geoObject.addon.hint']}
                geometry={venueCoords}
                properties={{
                    hintContent: item.name,
                }}
                options={{
                    preset: 'islands#dotIcon',
                    iconColor: placemarkColor,
                }}
            />
        );
    };

    return (
        <Map
            className="venues-map"
            state={{ center: mapCoords, zoom: shouldZoom ? 13 : 10 }}
            modules={['geolocation']}
        >
            <ZoomControl
                options={{
                    size: 'small',
                    position: {
                        left: 'auto',
                        right: 20,
                        top: 200,
                    },
                }}
            />
            {listItems && listItems.map((item) => renderPlacemark(item))}
            <GeolocationControl
                options={{ float: 'right' }}
                onLocationChange={handleUserLocation}
            />
        </Map>
    );
};

export default VenuesMap;
