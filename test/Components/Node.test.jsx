import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import Node from "../../src/Components/Node";

const renderer = new ReactShallowRenderer();

describe('Component rendering', () => {

	it('renders correctly with default props', () => {
		expect(renderer.render(
			<Node total={32} />
		)).toMatchSnapshot();
	});

});
