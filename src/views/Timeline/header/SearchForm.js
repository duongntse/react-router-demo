import React from 'react';
import PropTypes from 'prop-types';

class SearchForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			searchText: '',
		};
	}

	updateSearchInput(e) {
		this.setState({ searchText: e.target.value });
	}

	submitForm(e) {
		e.preventDefault();
		this.props.onSubmit(this.state.searchText);
	}

	render() {
		const searchVisible = this.props.searchVisible;
		// Classes to add to the <input /> element
		let searchInputClasses = ['searchInput'];
		if (searchVisible) {
			searchInputClasses.push('active');
		}
		return (
			<React.Fragment>
				<form onSubmit={this.submitForm.bind(this)}>
					<input
						onChange={this.updateSearchInput.bind(this)}
						value={this.state.searchText}
						type='text'
						className={searchInputClasses.join(' ')}
						placeholder='Search ...'
					/>
				</form>
			</React.Fragment>
		);
	}
}

SearchForm.propTypes = {
	onSubmit: PropTypes.func,
	searchVisible: PropTypes.bool,
};

SearchForm.default = {
	onSubmit: () => {},
	searchVisible: false,
};

export default SearchForm;
