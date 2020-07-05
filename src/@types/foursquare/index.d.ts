type ListCoordinates = { latitude: number; longitude: number };

interface VenueLocation {
    address: string;
    coordinates: ListCoordinates;
    countryCode: string;
    city: string;
    country: string;
}

interface UserListItem {
    id: string;
    name: string;
    addedAt: number;
    updatedAt: number;
    location: VenueLocation;
    coordinates: ListCoordinates;
    instagram: string | null;
    onlyDelivery: boolean;
    onlyTakeaway: boolean;
    maybeClosed: boolean;
}

interface UserList {
    id: string;
    name: string;
    url: string;
    location: string;
    coordinates: ListCoordinates | null;
    createdAt: number;
    updatedAt: number;
    itemsCount: number;
    items?: UserListItem[];
}

type ExtendedUserList = Required<UserList>;

type WithCoordinates = { coordinates: ListCoordinates };
type ListWithCoordinates = UserList & WithCoordinates;
