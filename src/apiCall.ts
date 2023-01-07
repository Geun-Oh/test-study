import axios from 'axios';

const URL = "https://jsonplaceholder.typicode.com";

export const findOne = (id: string | number) => {
    return axios
    .get(`${URL}/users/${id}`)
    .then((res) => res.data)
}