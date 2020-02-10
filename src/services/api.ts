import apisauce from 'apisauce';
import moment from 'moment-timezone';
import {
    Platform
} from 'react-native';

const forFirstAuthObject = {
    os: Platform.OS === 'ios' ? 'IOS' : 'Android',
    notif_client_id: Platform.OS === 'ios' ? 'APN' : 'Firebase',
    tz_iana: moment.tz.guess(true)
}

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
    const setAuthTokenForServer = (userAuth: any) => api.setHeader('Authorization', userAuth);
    const setTimezoneHeader = (timezoneString: string) => api.setHeader('Smart-Device-Timezone-IANA', timezoneString)
    const removeAuthToken = () => api.deleteHeader('Authorization');
    const refreshToken = (data: any) => api.post('user/refresh-token', data);
    const checkForUserInfo = (email: string) => api.get(`smart_user_by_email//${email}`)
    const setOnServer = (baseURL: string) => api.setBaseURL(`https://${baseURL}`);
    const getAllNetworks = (deviceId: string, userId: string) => api.get(`/app/smart_user/${userId}/device/${deviceId}`)
    const getAllNetworksFirstTime = (deviceId: string, userId: string) => api.post(`/app/smart_user/${userId}/device/${deviceId}`, { ...forFirstAuthObject } )
    
    return {
        setAuthToken,
        removeAuthToken,
        refreshToken,
        checkForUserInfo,
        setOnServer,
        getAllNetworks,
        setTimezoneHeader,
        setAuthTokenForServer,
        getAllNetworksFirstTime
    };
};

// let's return back our create method as the default.
export default {
    create
};
