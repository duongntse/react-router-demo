import React from 'react';
import { TIMEZONE, IP } from '../types';
import { setTimezone } from '../../redux/actions/time';
import { connect } from 'react-redux';
import { readString } from 'react-papaparse';
import { zonecsvstring } from './zonecsvstring';

export const Zone = (props) => {
	// const { zones } = props;
	var results = readString(zonecsvstring, {
		header: true,
		worker: false,
	});
	var zones = results.data.map((d) => d.zone_name);
	const { timezone, timezoneType } = props.time;

	switch (timezoneType) {
		case TIMEZONE:
			return (
				<>
					<input
						list='zones'
						onMouseDown={(e) => (e.target.value = '')}
						onChange={(e) => props.setTimezone(e.target.value)}
						value={timezone}
					/>
					<datalist id='zones'>
						{zones.map((opt, ind) => {
							return (
								<option key={ind} value={opt}>
									{opt}
								</option>
							);
						})}
					</datalist>
				</>
			);
		case IP:
			return <></>;
		default:
			return <></>;
	}
};

const mapStateToProps = (state) => ({
	time: state.time,
});

const mapDispatchToProps = (dispatch) => ({
	setTimezone: (tz) => dispatch(setTimezone(tz)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Zone);
