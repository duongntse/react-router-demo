import React, { useState } from 'react';
import Timezone from '../Timezone/Timezone';
import { connect } from 'react-redux';
import { fetchNewTime } from '../../redux/actions/time';
import { tryLogout } from '../../redux/actions/auth';
import momentTz from 'moment-timezone';
import Clock from '../Timezone/Clock';
import Timeline from '../Timeline/Timeline';
import Navbar from '../../components/Nav/Navbar';

export const Home = (props) => {
	const [timezoneType, setTimezoneType] = useState('timezone');
	const [timezone, setTimezone] = useState('');

	const onClickHandler = (e) => {
		console.log(
			`prepared for update timezone: ${timezoneType} ${timezone}`
		);
		props.updateTime(timezone, timezoneType);
	};

	const setTimezoneTypeHandler = (val) => {
		setTimezoneType(val);
	};

	const setTimezoneHandler = (val) => {
		setTimezone(val);
	};

	const { auth, time } = props;

	const timeline = (
		<>
			<Timezone
				timezoneTypeDefault={'timezone'}
				timezoneDefault={''}
				setTimezone={setTimezoneHandler}
				setTimezoneType={setTimezoneTypeHandler}
			/>

			<p>
				Current time:{' '}
				{momentTz.tz(time.currentTime, timezone).format('LLLL')}
			</p>
			<Clock timezone={timezone} />
			<p>Timezone: {timezone}</p>
			<button onClick={onClickHandler}>Update time</button>
			<Timeline />
		</>
	);

	return (
		<div className='home'>
			<h1>
				{auth.isLoggedIn ? (
					<h1>Welcome home!</h1>
				) : (
					'You need to know the secret'
				)}
			</h1>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	updateTime: (timezone, timezoneType) =>
		dispatch(fetchNewTime(timezone, timezoneType)),
	// login: () => dispatch(login()),
	logout: () => dispatch(tryLogout()),
});

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		time: state.time,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
