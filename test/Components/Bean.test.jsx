import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import Bean from '../../src/Components/Bean';

const renderer = new ReactShallowRenderer();

describe('Component rendering', () => {

	it('renders correctly with default props', () => {
		expect(renderer.render(
			<Bean />
		)).toMatchSnapshot();
	});

	it('renders correctly with slides', () => {
		expect(renderer.render(
			<Bean slideX={.9} slideY={.3} />
		)).toMatchSnapshot();
	});

});
