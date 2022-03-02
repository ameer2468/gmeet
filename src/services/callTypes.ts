import axios from 'axios';
import {loadToken} from "./loadToken";

const URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

export async function postService(urlPath: string, data: {}) {
    const authToken = await loadToken();
    return axios.post(`${URL}/${urlPath}`, {
        ...data,
        headers: {
            'x-api-key': API_KEY as string,
            'Authorization': authToken
        },
    });
}

export async function getService(urlPath: string, params?: {}) {
const authToken = await loadToken();
    return axios.get(`${URL}/${urlPath}`, {
        headers: {
            'x-api-key': API_KEY as string,
            'Authorization': authToken
        },
        params: {
            ...params
        }
    });
}
