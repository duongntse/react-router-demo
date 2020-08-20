import React from 'react';
// import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { fetchNewTime } from '../redux/actions/time';

const ServerTime = (props) => {
	console.log(process.env);
	return (
		<div>
			<h1>TIME_SERVER: {process.env.TIME_SERVER}</h1>
			<p>Current time: {props.currentTime}</p>
			<button onClick={props.updateTime}>Update time</button>
			{/* <Link to="/about">Go to about</Link> */}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		currentTime: state.time.currentTime,
	};
};

const mapDispatchToProps = (dispatch) => ({
	updateTime: () => dispatch(fetchNewTime()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ServerTime);
