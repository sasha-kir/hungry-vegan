import React from 'react';
import { Map, Clusterer, Placemark, ZoomControl } from 'react-yandex-maps';

import './style.css';

interface MapProps {
    listLocation: ListCoordinates | null;
    listItems: UserListItem[];
    currentSelection: UserListItem | null;
    selectItem(item: UserListItem): void;
}

const PLACEMARK_COLOR = '#19a186';

const VenuesMap = ({ listLocation, listItems, currentSelection, selectItem }: MapProps) => {
    const formatCoords = (location: ListCoordinates): [number, number] => [
        location.latitude,
        location.longitude,
    ];

    const shouldZoom = currentSelection === null ? false : true;

    let mapCoords: [number, number];
    if (currentSelection) {
        mapCoords = formatCoords(currentSelection.coordinates);
    } else if (listLocation) {
        mapCoords = formatCoords(listLocation);
    } else {
        mapCoords = formatCoords(listItems[0].coordinates);
    }

    const renderPlacemark = (item: UserListItem) => {
        const venueCoords = formatCoords(item.coordinates);

        const isSelected = item.id === currentSelection?.id;
        const placemarkColor = isSelected ? '#a786df' : PLACEMARK_COLOR;

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
        <Map className="venues-map" state={{ center: mapCoords, zoom: shouldZoom ? 14 : 10 }}>
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
            <Clusterer
                options={{
                    clusterIconColor: PLACEMARK_COLOR,
                    minClusterSize: 3,
                    hasBalloon: false,
                }}
            >
                {listItems.map((item) => renderPlacemark(item))}
            </Clusterer>
        </Map>
    );
};

export default VenuesMap;
