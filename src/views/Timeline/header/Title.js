import React from 'react';
import MenuIcon from './MenuIcon';

class Title extends React.Component {
	render() {
		return <span className='title'>{this.props.title}</span>;
	}
}

export default Title;
