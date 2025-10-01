import axios from 'axios';
import Cookies from "js-cookie";
import { API_BASE_URL } from '../settings/config';

const instance = axios.create({
    // baseURL: window.location.hostname === 'localhost' ? 'http://localhost:5001/api/v1' : 'https://api.mysite.com/api/v1'
    baseURL: API_BASE_URL
});
instance.defaults.headers.common['Content-Type'] = 'multipart/form-data';

//validate response
instance.interceptors.response.use((response) => {
    return response;
}, (error) => {
        if (error.response.status === 401) {
            Cookies.remove("access_token");
            Cookies.remove("user_id");
            return window.location.href = '/login'
        }
    return Promise.reject(error);
});

// Set the AUTH token for any request
instance.interceptors.request.use((config) => {
    const token = Cookies.get('access_token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';

    // Chỉ set Content-Type nếu không phải FormData
    const isFormData = config.data instanceof FormData;

    if (!isFormData) {
        if (config.method === 'put') {
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        } else {
            config.headers['Content-Type'] = 'application/json';
        }
    }

    return config;
});

export default instance;