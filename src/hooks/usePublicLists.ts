import { useQuery } from 'react-query';
import { getPublicLists } from 'api/lists';
import { sortByLocation } from 'utils/location';

export function usePublicLists() {
    const fetchData = async (): Promise<ListWithCoordinates[]> => {
        const lists = await getPublicLists();

        if (!lists) {
            return [];
        }

        return await sortByLocation(lists as ListWithCoordinates[]);
    };

    return useQuery('publicLists', fetchData);
}
