import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    loginRequest: ['email', 'password'],
    loginSuccess: ['authToken', 'authRefresh', 'accessToken', 'millisecondsToExpire'],
    loginFailure: ['error'],
    logoutRequest: null,
    logoutSuccess: null,
    loginLoad: [],
    loginLoadSuccess: [],
    refreshRequest: ['authRefresh'],
    refreshSuccess: ['authToken'],
    refreshFailure: ['error'],
});

export const LoginTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    authToken: null,
    authRefresh: null,
    accessToken: null,
    millisecondsToExpire: null,
    error: null,
    fetching: false,
    loading: false
});

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state: any) =>
    state.merge({ fetching: true, error: true });

// we've successfully logged in
export const success = (state: any, data: any) => {
    const { authToken, authRefresh, millisecondsToExpire, accessToken } = data;
    return state.merge({
        fetching: false,
        error: null,
        authToken,
        authRefresh,
        accessToken,
        millisecondsToExpire
    });
};

// we've had a problem logging in
export const failure = (state: any, { error }: any) =>
    state.merge({
        fetching: false,
        error,
        authToken: null,
        authRefresh: null,
        millisecondsToExpire: null
    });

// we're attempting to load token from startup sagas
export const load = (state: any) =>
    state.merge({ loading: true, fetching: true });

export const loadSuccess = (state: any) =>
    state.merge({ loading: 'ok', fetching: false });

// we're attempting to load token from startup sagas
export const refresh = (state: any) => state.merge({ refresh: true });

export const refreshSuccess = (state: any, { authToken }: any) =>
    state.merge({ refresh: false, authToken });

export const refreshFailure = (state: any, { error }: any) =>
    state.merge({
        error,
        fetching: false,
        refresh: false,
        authToken: null,
        authRefresh: null
    });

// we need to logout, meaning clear access tokens and account
export const logoutRequest = (state: any) => INITIAL_STATE;

// we've logged out
export const logoutSuccess = (state: any) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.LOGIN_REQUEST]: request,
    [Types.LOGIN_SUCCESS]: success,
    [Types.LOGIN_FAILURE]: failure,
    [Types.LOGIN_LOAD]: load,
    [Types.LOGIN_LOAD_SUCCESS]: loadSuccess,
    [Types.LOGOUT_REQUEST]: logoutRequest,
    [Types.LOGOUT_SUCCESS]: logoutSuccess,

    [Types.REFRESH_REQUEST]: refresh,
    [Types.REFRESH_SUCCESS]: refreshSuccess,
    [Types.REFRESH_FAILURE]: refreshFailure,
});

/* ------------- Selectors ------------- */
