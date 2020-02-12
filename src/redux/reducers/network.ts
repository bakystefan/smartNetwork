import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    networkRequest: [],
    networkSuccess: ['orgId', 'selfServe', 'appSettings', 'orgLogo', 'orgName', 'networkList'],
    networkFailure: ['error'],
    storeRouterData: ['routerData']
});

export const NetworkTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    orgId: null,
    selfServe: false,
    appSettings: null,
    orgLogo: null,
    orgName: null,
    networkList: null,
    fetching: false,
    error: null,
    routerData: {
        ispUp: 0,
        ispDown: 0,
        receive: 0,
        transmit: 0
    }
});

/* ------------- Reducers ------------- */

export const request = (state: any) => state.merge({ fetching: true });

export const success = (state: any, data: any) => {
  const { orgId, selfServe, appSettings, orgLogo, orgName, networkList } = data;
    return state.merge({
        fetching: false,
        error: null,
        orgId,
        selfServe,
        appSettings,
        orgLogo,
        orgName,
        networkList,
    });
};

export const failure = (state: any, { error }: any) =>
    state.merge({
        fetching: false,
        error,
        orgId: null,
        selfServe: false,
        appSettings: null,
        orgLogo: null,
        orgName: null,
        networkList: null,
    });

export const storeDataAboutRouter = (state: any, data: any) => {
    console.log("AAAA!!!!!! DATAAA ROUTER", data);
    const { routerData } = data;
    return state.merge({
        routerData
    });
}


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.NETWORK_REQUEST]: request,
    [Types.NETWORK_SUCCESS]: success,
    [Types.NETWORK_FAILURE]: failure,
    [Types.STORE_ROUTER_DATA]: storeDataAboutRouter
});

/* ------------- Selectors ------------- */
