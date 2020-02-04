// a library to wrap and simplify api calls
import apisauce from 'apisauce';

import AppConfig from '../config/app-config';

// our "constructor"
const create = (baseURL = AppConfig.apiUrl) => {
    // ------
    // STEP 1
    // ------
    //
    // Create and configure an apisauce-based api object.
    //
    const api = apisauce.create({
        // base URL is read from the "constructor"
        baseURL,
        // here are some default headers
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Accept: 'application/json'
        },
        // 10 second timeout...
        timeout: 300000
    });

    const setAuthToken = (userAuth: any) => api.setHeader('Authorization', 'Bearer ' + userAuth);
    const removeAuthToken = () => api.deleteHeader('Authorization');
    const login = (userAuth: any) => api.post('user/login', userAuth);
    const refreshToken = (data: any) => api.post('user/refresh-token', data);

    return {
        setAuthToken,
        removeAuthToken,
        login,
        refreshToken,
    };
};

// let's return back our create method as the default.
export default {
    create
};
