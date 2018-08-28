import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import Button from "../../src/Components/Button";

const renderer = new ReactShallowRenderer();

describe('Component rendering', () => {

	it('renders correctly with default props', () => {
		expect(renderer.render(
			<Button />
		)).toMatchSnapshot();
	});

	it('renders correctly with className set', () => {
		expect(renderer.render(
			<Button className="customClassName" />
		)).toMatchSnapshot();
	});

	it('renders correctly with children', () => {
		expect(renderer.render(
			<Button>Test button</Button>
		)).toMatchSnapshot();
	});

});
