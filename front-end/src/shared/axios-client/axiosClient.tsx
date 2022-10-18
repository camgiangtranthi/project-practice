import axios from 'axios';
import { UserResponse } from '../models/user';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const getUserFromLocalStorage = (): UserResponse => {
    return JSON.parse(localStorage.getItem('current_user') || '{}');
};

const axiosClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Content-type': 'multipart/form-data',
        'Authorization': getUserFromLocalStorage()?.token
    }
})

// Add a request interceptor
axiosClient.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// Add a response interceptor
axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosClient;
