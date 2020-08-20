import * as types from '../types';
import * as timezones from '../defined_timezones';
import * as timezoneTypes from '../defined_timezoneTypes';

export const initialState = {
	currentTime: new Date().toString(),
	timezone: timezones.HO_CHI_MINH,
	timezoneType: timezoneTypes.TYPE_TIMEZONE,
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case types.FETCH_NEW_TIME:
			return { ...state, currentTime: action.payload };
		case types.FETCH_TIMEZONE:
			return { ...state, timezoneType: action.payload };
		case types.SET_TIMEZONE:
			return { ...state, timezone: action.payload };
		case types.FETCH_TIMEZONETYPE:
			return { ...state };
		case types.SET_TIMEZONETYPE:
			return { ...state, timezoneType: action.payload };
		default:
			return state;
	}
};

export default reducer;
