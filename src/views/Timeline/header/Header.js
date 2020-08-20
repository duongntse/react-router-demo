import React from 'react';
import PropTypes from 'prop-types';
import MenuIcon from './MenuIcon';
import Title from './Title';
import SearchForm from './SearchForm';

class Header extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			searchVisible: false,
		};
	}
	showSearch() {
		this.setState({ searchVisible: !this.state.searchVisible });
	}

	render() {
		return (
			<div className='header'>
				<MenuIcon />
				<Title title={this.props.title} />
				<SearchForm
					searchVisible={this.state.searchVisible}
					onSubmit={this.props.onSearch}
				/>
				{/* Adding an onClick handler to call the showSearch button */}
				<div
					onClick={this.showSearch.bind(this)}
					className='fa fa-search searchIcon'></div>
			</div>
		);
	}
}

Header.defaultProps = {
	title: 'Timeline',
	onSearch: PropTypes.func,
};

Header.propTypes = {
	title: PropTypes.string,
};

export default Header;
