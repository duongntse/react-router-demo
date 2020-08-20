import moment from 'moment';

export const apiMiddleware = (store) => (next) => (action) => {
	console.log('apiMiddleWare');
	if (!action.meta || action.meta.type !== 'api') {
		return next(action);
	}
	// This is an api request

	// Find the request URL and compose request options from meta
	const { url } = action.meta;
	const fetchOptions = Object.assign({}, action.meta);

	// Make the request
	fetch(url, fetchOptions)
		// convert the response to json
		.then((resp) => resp.json())
		.then((json) => {
			if (typeof action.meta.onSuccess === 'function') {
				action.meta.onSuccess(json);
			}
			return json; // For the next promise in the chain
		})
		.then((json) => {
			console.log(json);
			// respond back to the user
			// by dispatching the original action without
			// the meta object
			/* 
            {
                abbreviation: "BST",
                client_ip: "27.79.100.78",
                datetime: "2020-08-06T09:37:42.484746+01:00",
                day_of_week: 4,
                day_of_year: 219,
                dst: true,
                dst_from: "2020-03-29T01:00:00+00:00",
                dst_offset: 3600,
                dst_until: "2020-10-25T01:00:00+00:00",
                raw_offset: 0,
                timezone: "Europe/London",
                unixtime: 1596703062,
                utc_datetime: "2020-08-06T08:37:42.484746+00:00",
                utc_offset: "+01:00",
                week_number: 32
                }
            */
			let newAction = Object.assign({}, action, {
				payload: json.dateString,
			});

			// console.log(
			// 	`api datetime: ${moment(json.datetime).format('LLLL')}`
			// );
			delete newAction.meta;
			store.dispatch(newAction);
			// console.log(
			// 	`new timezone  ${JSON.stringify(
			// 		json.timezone
			// 	)}: ${JSON.stringify(json.datetime)}`
			// );
			// console.log(`dispatched newAction: ${JSON.stringify(newAction)}`);
			console.log(json);
			// console.log('newAction: ');
			// console.log(newAction);
		});
};

export default apiMiddleware;
