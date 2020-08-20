import { combineReducers } from 'redux';

import * as auth from './auth';
import * as time from './time';

export const initialState = {
	auth: auth.initialState,
	time: time.initialState,
};

export const rootReducer = combineReducers({
	auth: auth.reducer,
	time: time.reducer,
});
