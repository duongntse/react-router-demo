import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import Navbar from '../Navbar';
import { Provider } from 'react-redux';
import { configureStore } from '../../../redux/configureStore';

describe('Navbar', () => {
	// Test go here
	let wrapper;
	const store = configureStore();
	it('wraps content in a div with .navbar class', () => {
		wrapper = mount(
			<Provider store={store}>
				<div className='root'>
					<Router>
						<Navbar />
					</Router>
				</div>
			</Provider>
		);
		expect(wrapper.find('.navbar').length).toEqual(1);
	});
});
