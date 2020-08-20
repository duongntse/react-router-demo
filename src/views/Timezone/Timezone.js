import React from 'react';
import Zone from './Zone';
import TimezoneType from './TimezoneType';
import { readString } from 'react-papaparse';
import { zonecsvstring } from './zonecsvstring';

// http://worldtimeapi.org/api/timezone/Australia/Melbourne
// http://worldtimeapi.org/api/timezone/Europe/London
// http://worldtimeapi.org/api/ip

const timezoneTypes = ['timezone', 'ip'];
var zones = ['America/Toronto', 'Europe/London', 'Australia/Melbourne'];
zones = [];
// zone_id,country_code,zone_name
const zoneDefaultHCM = 'Asia/Ho_Chi_Minh';
class Timezone extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			timeZoneType: timezoneTypes[0], // timezone
			timezones: [],
		};
	}

	selectedTypeHandler(e) {
		const val = e.target.value;
		this.setState({ timeZoneType: val });
		console.log(`selectedType: ${val}`);

		this.props.setTimezoneType(val);
	}

	selectedZoneHandler(e) {
		const val = e.target.value;
		this.setState({ zone: val });
		console.log(`selectedZone: ${val}`);
		this.props.setTimezone(val);
	}

	componentWillMount() {
		// const data = await new Promise((resolve, reject) => {
		// })
		var results = readString(zonecsvstring, {
			header: true,
			worker: false,
		});
		var newResults = results.data.map((d) => d.zone_name);
		// console.log(newResults);
		this.setState({ timezones: newResults });
	}

	componentDidMount() {
		const { timezones } = this.state;
		var timezone = this.props.timezoneDefault || zoneDefaultHCM;
		this.props.setTimezone(timezone);
	}

	render() {
		const { timeZoneType, timezones } = this.state;
		return (
			<div>
				<label htmlFor='typeOfTimezone'>
					Choose a type of timezone:
				</label>
				<TimezoneType
					timezoneTypeDefault={this.props.timezoneTypeDefault}
					types={timezoneTypes}
					onSelected={this.selectedTypeHandler.bind(this)}
				/>
				<Zone />
			</div>
		);
	}
}

export default Timezone;
