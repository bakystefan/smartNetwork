import { call, put, select } from 'redux-saga/effects';
import apisauce from 'apisauce';

import LoginActions from '../reducers/auth';

import { callApi } from './call-api-saga';

export const selectAuthToken = (state: any) => state.login.authToken;
export const selectAuthRefresh = (state: any) => state.login.authRefresh;

type LoginActionParams = {
	email: string;
	password: string;
}

export function* login(api: any, { email, password }: LoginActionParams){
	const checkUserCall = call(api.checkForUserInfo, email);
	const responseFromCheckUser = yield call(callApi, checkUserCall, api);
	const { ok: userFound, data } = responseFromCheckUser;
	if (userFound) {
		const { data: { auth_client_id, auth_connection } } = data;
		const audience = "https://smart.server/";
		const scope = "openid profile offline_access email app:normal";

		const auth0Api = apisauce.create({
			baseURL: "https://c-dev.auth0.com/oauth/token",
			headers: {
				'Content-Type': 'application/json',
				Accept: '*/*'
			},
			timeout: 10000
		});

		const fetchAuth = yield auth0Api.post(null, {
			username: email,
			client_id: auth_client_id,
			audience,
			scope,
			realm: auth_connection,
			password,
			grant_type: "http://auth0.com/oauth/grant-type/password-realm"
		});
		const { data: authData, ok: authPass } = fetchAuth; 
		if (authPass) {
			const { id_token, refresh_token, access_token, expires_in } = authData;
			yield call(api.setAuthToken, id_token);
			yield put(LoginActions.loginSuccess(id_token, refresh_token, access_token, expires_in));
		} else {
			yield put(LoginActions.loginFailure(data || 'Network Error'));
		}

	} else {
		yield put(LoginActions.loginFailure(data || 'Network Error'));
	}
	
	// const apiCall = call(api.login, authObj);
	// const response = yield call(callApi, apiCall, api);

	// if (response.ok) {
	// 	yield call(api.setAuthToken, response.data.idToken);
	// 	yield put(LoginActions.loginSuccess(response.data.idToken, response.data.refreshToken));
	// } else {
	// 	yield put(LoginActions.loginFailure(response.data || 'Network Error'));
	// }
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
