import { put, take, call, select } from 'redux-saga/effects';

export function* callLogin(apiCall: any, postApiCall: any) {
    const response = yield apiCall;
    if (isUnauthorized(response)) {
        return response;
    }
    const { data: { error } } = response;
    if (error && error === -310) {
        yield postApiCall;
    }

    return yield apiCall;
}

function isUnauthorized(resp: any) {
    return resp.status !== 500;
}
