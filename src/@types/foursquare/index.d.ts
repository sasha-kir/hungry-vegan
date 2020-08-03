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

interface PublicList {
    id: string;
    name: string;
    owner: string;
    location: string;
    coordinates: ListCoordinates | null;
    updatedAt: number;
    itemsCount: number;
}

interface UserList extends PublicList {
    url: string;
    createdAt: number;
    items?: UserListItem[];
}

type ExtendedUserList = Required<UserList>;

type WithCoordinates = { coordinates: ListCoordinates };
type ListWithCoordinates = UserList & WithCoordinates;
