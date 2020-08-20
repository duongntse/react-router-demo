import React from 'react';
import Header from './header/Header';
import Content from './content/Content';
import { data } from './data';
// import './styles/timeline.min.css';
// import './styles/styles.css';
import './styles/styles.scss';
import './styles/timeline.scss';

class Panel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activities: data,
		};
	}

	handleSearch(val) {
		// reset the data if the search is empty
		if (val === '') {
			this.setState({
				activities: data,
			});
		} else {
			// const { activities } = this.state;
			const filtered = data.filter(
				(activity) => activity.actor && activity.actor.login.match(val)
			);
			this.setState({ activities: filtered });
		}
	}

	render() {
		const { activities } = this.state;
		return (
			<div className={'notificationsFrame'}>
				<div className={'panel'}>
					<Header
						title={`Timeline`}
						onSearch={this.handleSearch.bind(this)}
					/>
					<Content activities={activities} />
				</div>
			</div>
		);
	}
}

export default Panel;
