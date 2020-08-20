import React from 'react';
import Item from './Item';

class Content extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activities: [],
		};
		this.getSliceNumb = this.getSliceNumb.bind(this);
	}

	getSliceNumb(activities) {
		const total = activities.length;
		let end = Math.round(Math.random() * total);
		while (end < 4) {
			end++;
		}
		let start = end - 4;
		return { start, end, total };
	}

	render() {
		const { activities } = this.props;
		const { start, end } = this.getSliceNumb(activities);

		return (
			<div className='content'>
				<div className='line'></div>

				{/* Timeline items */}
				{activities.slice(start, end).map((activity, ind) => (
					<Item key={ind} activity={activity} />
				))}

				{/* ... */}
			</div>
		);
	}
}

// Content.propTypes = {
// 	activities: PropTypes.array,
// };

export default Content;
