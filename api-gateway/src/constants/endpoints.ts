import axios from 'axios';

export const USER_SERVICE_ENDPOINT = 'http://user-srv:3000';
export const POST_SERVICE_ENDPOINT = 'http://post-srv:3000';

export const POST_SERVICE_INSTANCE = axios.create({
    baseURL: POST_SERVICE_ENDPOINT,
});
