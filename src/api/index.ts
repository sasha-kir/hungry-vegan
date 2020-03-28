import axios from 'axios';
import config from '../config';

export enum ResponseStatus {
    idle,
    pending,
    success,
    rejected,
    unauthorized,
    error,
}

export const authApi = axios.create({
    baseURL: config.apiUrl,
});

// api with required auth header
export const api = axios.create({
    baseURL: config.apiUrl,
});
