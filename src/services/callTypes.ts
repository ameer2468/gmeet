import axios from 'axios';
import {loadToken} from "./loadToken";

const URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

export async function postService(urlPath: string, data: {}) {
    const authToken = await loadToken();
   return await axios.post(`${URL}/${urlPath}`, {
        ...data
        }, {
        headers: {
            'x-api-key': API_KEY as string,
            'Authorization': authToken
        },
    });
}

export async function fileService(urlPath: string, data: File, type?: string) {
    return await axios.put(`${urlPath}`, data, {
        headers: {
            'Content-Type': type as string
        },
    });
}

export async function putService(urlPath: string, data: {}, custom?: boolean, headers?: {}) {
    const authToken = await loadToken();
    const normHeaders = {
        'x-api-key': API_KEY as string,
        'Authorization': authToken,
        ...headers
    }
    const customHeaders = {...headers}
    return axios.put(`${custom ? urlPath : `${URL}/${urlPath}`}`,
        {...data},
        {
            headers: custom ? customHeaders : normHeaders
        });
}

export async function deleteService(urlPath: string, params?: {}) {
    const authToken = await loadToken();
    return axios.delete(`${URL}/${urlPath}`, {
        headers: {
            'x-api-key': API_KEY as string,
            'Authorization': authToken
        },
        data: {
            ...params
        }
    })
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
