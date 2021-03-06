import { takeLatest, all, takeEvery } from 'redux-saga/effects';
import API from '../../services/api';
import auth0API from '../../services/authApi';

/* ------------- Types ------------- */

import { LoginTypes } from '../reducers/auth';

// ignite-jhipster-saga-redux-import-needle

/* ------------- Sagas ------------- */

import {
    login,
    logout,
    loginLoad,
    refresh,
} from './auth';


/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create();
const auth0Api = auth0API.create();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
    yield all([
        takeEvery(LoginTypes.LOGIN_LOAD, loginLoad, api),
        takeLatest(LoginTypes.LOGIN_REQUEST, login, api, auth0Api),
        takeLatest(LoginTypes.LOGOUT_REQUEST, logout, api),
        takeLatest(LoginTypes.REFRESH_REQUEST, refresh, api)
    ]);
}
