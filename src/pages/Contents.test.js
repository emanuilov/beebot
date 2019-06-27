import React from 'react';
import ReactDOM from 'react-dom';
import Contents from './Contents';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Contents />, div);
	ReactDOM.unmountComponentAtNode(div);
});
