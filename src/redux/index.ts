import { combineReducers } from 'redux';
import configureStore from './store';
import rootSaga from './sagas';

export const reducers = combineReducers({
    auth: require('./reducers/auth').reducer,
});

export default () => {
    let finalReducers: any = reducers;
    // If rehydration is on use persistReducer otherwise default combineReducers

    let { store } = configureStore(
        finalReducers,
        rootSaga
    );

    return store;
};
