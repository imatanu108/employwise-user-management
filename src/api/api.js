import axios from 'axios';

const baseURL = "https://reqres.in/api";

export const api = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    }
});
