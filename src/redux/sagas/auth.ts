import { call, put, select } from 'redux-saga/effects';
import { callApi } from './call-api-saga';
import { callLogin } from './call-login';
import moment from 'moment-timezone';
import DeviceInfo from 'react-native-device-info';

import LoginActions from '../reducers/auth';
import ProfileActions from '../reducers/profile';

const AUDIENCE = "https://smart.server/";
const SCOPE = "openid profile offline_access email app:normal";
const GRANT_TYPE = "http://auth0.com/oauth/grant-type/password-realm";

export const selectAuthToken = (state: any) => state.login.authToken;
export const selectAuthRefresh = (state: any) => state.login.authRefresh;

type LoginActionParams = {
	email: string;
	password: string;
}

export function* login(api: any, auth0Api: any, { email, password }: LoginActionParams){
	const checkUserCall = call(api.checkForUserInfo, email);
	const responseFromCheckUser = yield call(callApi, checkUserCall, api);
	const { ok: userFound, data } = responseFromCheckUser;
	console.log("JA SAM USER FOUND ", data);
	if (userFound) {
		const { data: { auth_client_id, auth_connection, app_server, _id } } = data;
		const fetchAuthCall = call(auth0Api.getTokens, {
			username: email,
			audience: AUDIENCE,
			scope: SCOPE,
			password,
			grant_type: GRANT_TYPE,
			realm: auth_connection,
			client_id: auth_client_id,
		})
		const fetchAuth = yield call(callApi, fetchAuthCall, auth0Api);
		const { data: authData, ok: authPass } = fetchAuth;

		if (authPass) {
			const { id_token, refresh_token, access_token, expires_in } = authData;
			yield call(api.setAuthToken, access_token);
			yield call(auth0Api.setAuthToken, access_token);
			const getUserCall = call(auth0Api.getUser);
			const getUserFetch = yield call(callApi, getUserCall, auth0Api);

			const { data, ok: profileFetchSuccess } = getUserFetch;
			const {
				sub,
				nickname,
				name,
				picture,
				updated_at,
				email,
				email_verified,
			} = data;

			if(profileFetchSuccess) {
				yield put(ProfileActions.profileSuccess(app_server, sub, nickname, name, picture, updated_at, email, email_verified, false))
				yield put(LoginActions.loginSuccess(id_token, refresh_token, access_token, expires_in));
				const deviceId = DeviceInfo.getUniqueId();
				const timezone = moment.tz.guess(true);
				api.setOnServer(app_server);
				api.setTimezoneHeader(timezone);
				api.setAuthTokenForServer(access_token);
				const fetchNetworksCall = call(api.getAllNetworks, deviceId, _id);
				const firstNetworkCall = call(api.getAllNetworksFirstTime, deviceId, _id);
				const fetchNetworks = yield call(callLogin, fetchNetworksCall, firstNetworkCall);
			}
		} else {
			yield put(LoginActions.loginFailure({ error: "Bad credentials"} || 'Network Error'));
		}

	} else {
		yield put(LoginActions.loginFailure({error: "Bad credentials"} || 'Network Error'));
	}
}

export function* refresh(api: any, { authRefresh }: any){
	// const authRefresh = yield select(selectAuthRefresh)
	console.log('authRefresh', authRefresh);
	const authObj = {
		refreshToken: authRefresh
	};

	console.log(authObj);

	//const response = yield call(api.refreshToken, authObj)

	const apiCall = call(api.refreshToken, authObj);
	const response = yield call(callApi, apiCall, api);
}

// attempts to logout
export function* logout(api: any){
	yield put(LoginActions.logoutSuccess());
}

// loads the login
export function* loginLoad(api: any){
	const authToken = yield select(selectAuthToken);

	// only set the token if we have it
	if (authToken) {
		yield call(api.setAuthToken, authToken);
	}

	yield put(LoginActions.loginLoadSuccess(true));
}
