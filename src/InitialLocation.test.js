import React from 'react';
import ReactDOM from 'react-dom';
import InitialLocation from './InitialLocation';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<InitialLocation />, div);
	ReactDOM.unmountComponentAtNode(div);
});
