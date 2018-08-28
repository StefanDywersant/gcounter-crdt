import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import Beans from '../../src/Components/Beans';

const renderer = new ReactShallowRenderer();

describe('Component rendering', () => {

	it('renders correctly with default props', () => {
		expect(renderer.render(
			<Beans />
		)).toMatchSnapshot();
	});

	it('renders correctly with className set', () => {
		expect(renderer.render(
			<Beans className="customClassName" />
		)).toMatchSnapshot();
	});

	it('renders correctly with children', () => {
		expect(renderer.render(
			<Beans>
				<div />
				<p />
			</Beans>
		)).toMatchSnapshot();
	});

});
