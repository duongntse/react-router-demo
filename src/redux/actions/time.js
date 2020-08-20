import * as types from '../types';
import * as timezones from '../defined_timezones';
import * as timezoneTypes from '../defined_timezoneTypes';
const host = process.env.TIME_SERVER;
console.log(host);
// const host = 'http://worldtimeapi.org/api';
// http://worldtimeapi.org/api/ip
// http://worldtimeapi.org/api/timezone/Europe/London

export const fetchNewTime = (timezone = 'pst', str = 'now') => ({
	type: types.FETCH_NEW_TIME,
	payload: new Date().toString(),
	meta: {
		type: 'api',
		url: host + '/' + timezone + '/' + str + '.json',
	},
});

export const setTimezone = (timezone = timezones.LONDON) => ({
	type: types.SET_TIMEZONE,
	payload: timezone,
});

export const fetchTimezone = (timezoneType = timezoneTypes.TYPE_TIMEZONE) => ({
	type: types.FETCH_TIMEZONE,
	payload: timezoneType,
});

export const setTimezoneType = (
	timezoneType = timezoneTypes.TYPE_TIMEZONE
) => ({
	type: types.SET_TIMEZONETYPE,
	payload: timezoneType,
});

export const fetchTimezoneType = () => ({
	type: types.FETCH_TIMEZONETYPE,
});
