import { ResponseStatus } from '..';
import { loginWithCredentials, register } from './internal';
import { foursquareLogin, foursquareConnect, getClientId } from './foursquare';

export interface LoginResponse {
    status: ResponseStatus;
    token: string | null;
}

export { loginWithCredentials, register, foursquareLogin, getClientId, foursquareConnect };
