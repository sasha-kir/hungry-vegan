type Coordinates = { latitude: number; longitude: number };

interface VenueLocation {
    address: string;
    coordinates: Coordinates;
    countryCode: string;
    city: string;
    country: string;
}

interface FoursquareListItem {
    id: string;
    name: string;
    addedAt: number;
    location: VenueLocation;
}

interface FoursquareList {
    id: string;
    name: string;
    url: string;
    city: string;
    createdAt: number;
    updatedAt: number;
    itemsCount: number;
    items?: ListItem[];
}
