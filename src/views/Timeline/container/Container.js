import React from 'react';
class Container extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		//
		return <div className='containerTimer'>{this.props.children}</div>;
	}
}

export default Container;
