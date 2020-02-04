import { call, put, select } from 'redux-saga/effects';

import LoginActions from '../reducers/auth';

import { callApi } from './call-api-saga';

export const selectAuthToken = (state: any) => state.login.authToken;
export const selectAuthRefresh = (state: any) => state.login.authRefresh;
// attempts to login

export function* login(api: any, { email, password }: any){
	const authObj = {
		email: email,
		password: password
	};

	const apiCall = call(api.login, authObj);
	const response = yield call(callApi, apiCall, api);

	if (response.ok) {
		yield call(api.setAuthToken, response.data.idToken);
		yield put(LoginActions.loginSuccess(response.data.idToken, response.data.refreshToken));
	} else {
		yield put(LoginActions.loginFailure(response.data || 'Network Error'));
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
