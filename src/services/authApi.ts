import apisauce from 'apisauce';
import AppConfig from '../config/app-config';

const create = (baseURL = AppConfig.auth0URL) => {

    const api = apisauce.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
            Accept: '*/*'
        },
        timeout: 10000
    });

    const setAuthToken = (userAuth: string) => api.setHeader('Authorization', 'Bearer ' + userAuth);
    const removeAuthToken = () => api.deleteHeader('Authorization');
    const getTokens = (data: any) => api.post('oauth/token', data);
    const getUser = () => api.get('userinfo') 

    return {
        setAuthToken,
        removeAuthToken,
        getTokens,
        getUser
    };
};

// let's return back our create method as the default.
export default {
    create
};
