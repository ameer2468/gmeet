import axios from 'axios';

const URL = process.env.REACT_APP_API_URL;

export function getProjects() {
    return axios.get(`${URL}/projects`)
}