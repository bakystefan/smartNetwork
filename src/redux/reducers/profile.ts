import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    profileRequest: [],
    profileSuccess: ['profileServer', 'sub', 'nickName', 'name', 'picture', 'updatedAt', 'email', 'emailVerified', 'superUser'],
    profileFailure: ['error'],
});

export const ProfileTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    sub: null,
    nickName: null,
    picture: null,
    name: null,
    updatedAt: null,
    email: null,
    emailVerified: null,
    superUser: null,
    fetching: false,
    error: null,
    profileServer: null
});

/* ------------- Reducers ------------- */

export const request = (state: any) => state.merge({ fetching: true });

export const success = (state: any, data: any) => {
    const { profileServer, sub, nickName, name, picture, updatedAt, email, emailVerified, superUser } = data;
    return state.merge({
        fetching: false,
        error: null,
        sub,
        nickName,
        name,
        picture,
        updatedAt,
        email,
        emailVerified,
        superUser,
        profileServer
    });
};

export const failure = (state: any, { error }: any) =>
    state.merge({
        fetching: false,
        error,
        sub: null,
        nickName: null,
        name: null,
        picture: null,
        updatedAt: null,
        email: null,
        emailVerified: null,
        superUser: null
    });


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.PROFILE_REQUEST]: request,
    [Types.PROFILE_SUCCESS]: success,
    [Types.PROFILE_FAILURE]: failure,
});

/* ------------- Selectors ------------- */
