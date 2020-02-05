import apisauce from 'apisauce';

import AppConfig from '../config/app-config';

const create = (baseURL = AppConfig.apiUrl) => {

    const api = apisauce.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Accept: 'application/json'
        },
        timeout: 300000
    });

    const setAuthToken = (userAuth: any) => api.setHeader('Authorization', 'Bearer ' + userAuth);
    const removeAuthToken = () => api.deleteHeader('Authorization');
    const login = (userAuth: any) => api.post('user/login', userAuth);
    const refreshToken = (data: any) => api.post('user/refresh-token', data);
    const checkForUserInfo = (email: string) => api.get(`smart_user_by_email//${email}`)

    return {
        setAuthToken,
        removeAuthToken,
        login,
        refreshToken,
        checkForUserInfo
    };
};

// let's return back our create method as the default.
export default {
    create
};
