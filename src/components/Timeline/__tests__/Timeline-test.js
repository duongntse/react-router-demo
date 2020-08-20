import React from 'react';
import { shallow, mount } from 'enzyme';
import Timeline from '../../../views/Timeline/Timeline';
import Panel from '../../../views/Timeline/Panel';
import Content from '../../../views/Timeline/content/Content';

describe('Timeline', () => {
	// Test go here
	let wrapper;
	it('wraps content in a div  with .notificationsFrame class', () => {
		wrapper = shallow(<Panel />);
		expect(wrapper.find('.notificationsFrame').length).toEqual(1);
	});

	it('has a title of Timeline', () => {
		wrapper = mount(<Panel />);
		expect(wrapper.find('.title').text()).toBe('Timeline');
	});

	describe('search button', () => {
		beforeEach(() => (wrapper = mount(<Timeline />)));
		it('starts out hidden', () => {
			expect(
				wrapper.find('input.searchInput').hasClass('active')
			).toBeFalsy();
		});
		it('becomes visible after being clicked on', () => {
			const icon = wrapper.find('.searchIcon');
			icon.simulate('click');
			expect(
				wrapper.find('input.searchInput').hasClass('active')
			).toBeTruthy();
		});
	});

	describe('status updates', () => {
		it('has 4 status updates at minimum', () => {
			wrapper = mount(<Panel />);
			expect(wrapper.find('Item').length).toBeGreaterThan(3);
		});
	});
});
// npx react-codemod rename-unsafe-lifecycles
