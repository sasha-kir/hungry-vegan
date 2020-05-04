// https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
const estimateDistance = (
    { latitude: lat1, longitude: lon1 }: ListCoordinates,
    { latitude: lat2, longitude: lon2 }: ListCoordinates,
): number => {
    const p = Math.PI / 180;
    const cos = Math.cos;
    const a =
        0.5 -
        cos((lat2 - lat1) * p) / 2 +
        (cos(lat1 * p) * cos(lat2 * p) * (1 - cos((lon2 - lon1) * p))) / 2;
    return Math.asin(Math.sqrt(a));
};

export const fetchUserLocation = async (): Promise<ListCoordinates> => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            position => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            error => {
                reject(error);
            },
        );
    });
};

export const sortByLocation = async (locations: ExtendedList[]): Promise<ExtendedList[]> => {
    const currentLocation = await fetchUserLocation();
    const sorted = [...locations].sort(
        (a, b) =>
            estimateDistance(currentLocation, a.coordinates) -
            estimateDistance(currentLocation, b.coordinates),
    );
    return sorted;
};
