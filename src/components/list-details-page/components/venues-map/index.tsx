import React from 'react';
import { Map, Placemark } from 'react-yandex-maps';

import './style.css';

interface MapProps {
    location: ListCoordinates | null;
    venues: UserListItem[];
    zoom: boolean;
}

const VenuesMap = ({ location, venues, zoom }: MapProps) => {
    const mapCoords = location ? [location.latitude, location.longitude] : [55.684758, 37.738521];

    const renderPlacemark = (venue: UserListItem) => {
        const venueCoords = venue.location.coordinates;
        const coordsArray = [venueCoords.latitude, venueCoords.longitude];

        const isSelected = coordsArray[0] === mapCoords[0] && coordsArray[1] === mapCoords[1];
        const placemarkColor = isSelected ? '#a786df' : '#19a186';

        return (
            <Placemark
                key={1}
                modules={['geoObject.addon.hint']}
                geometry={coordsArray}
                properties={{
                    hintContent: venue.name,
                }}
                options={{
                    preset: 'islands#dotIcon',
                    iconColor: placemarkColor,
                }}
            />
        );
    };

    return (
        <Map className="venues-map" state={{ center: mapCoords, zoom: zoom ? 14 : 10 }}>
            {venues.map((venue) => renderPlacemark(venue))}
        </Map>
    );
};

export default VenuesMap;
