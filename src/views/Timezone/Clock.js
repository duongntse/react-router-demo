import React, { Component } from 'react';
import momentTz from 'moment-timezone';
import { connect } from 'react-redux';
import Zone from './Zone';
const path = require('path'),
	resolve = path.resolve,
	join = path.join;

export class Clock extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newTime: '',
		};
	}

	componentDidMount() {
		// const { timezone } = this.props;
		setInterval(() => {
			this.setState({
				// newTime: '',
			});
		}, 1000);
	}

	render() {
		const timezone = this.props.timezone;
		const content = `${momentTz
			.tz(timezone)
			.format('dddd DD, MMMM, YYYY hh:mm:ss A')}`;

		// const { newTime } = this.state;
		// console.log(`Clock timezone: ${timezone}`);
		return (
			<React.Fragment>
				<div
					id='clock'
					style={{
						width: '100%',
						position: 'absolute',
						textAlign: 'center',
						top: '0px',
					}}>
					<Zone /> {content}
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	timezone: state.time.timezone,
});

export default connect(mapStateToProps)(Clock);

// export default Clock;
