import axios from 'axios';
import {useAppDispatch} from "../redux/hooks";

const dispatch = useAppDispatch();

export type requestOptions = {
    get: 'get',
    post: 'post',
    delete: 'delete'
}

const URL = process.env.REACT_APP_API_URL;
const apikey = process.env.REACT_APP_API_KEY;

export async function apiCall(type: keyof requestOptions, action: (arg: any) => any) {
    switch(type) {
        case "get":
            return await axios.get(`${URL}/projects`, {
                headers: {
                    'x-api-key': `${apikey}`,
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                return dispatch(action(res.data));
            }).catch((err) => {
                console.log(err)
            })
        case "post" :
            return await axios.post(`${URL}/projects`, {
                headers: {
                    'x-api-key': `${apikey}`,
                    'Content-Type': 'application/json'
                }
            })
        case "delete":
            return await axios.delete(`${URL}/projects`, {
                headers: {
                    'x-api-key': `${apikey}`,
                    'Content-Type': 'application/json'
                }
            })
    }

}