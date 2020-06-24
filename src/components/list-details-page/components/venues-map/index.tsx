import React from 'react';
import { Map } from 'react-yandex-maps';

import './style.css';

interface MapProps {
    location: ListCoordinates | null;
}

const YandexMap = ({ location }: MapProps) => {
    const mapCoords = location ? [location.latitude, location.longitude] : [55.684758, 37.738521];

    return <Map className="venues-map" state={{ center: mapCoords, zoom: 10 }} />;
};

export default YandexMap;
