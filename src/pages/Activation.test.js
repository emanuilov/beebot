import React from 'react';
import ReactDOM from 'react-dom';
import Activation from './Activation';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Activation />, div);
	ReactDOM.unmountComponentAtNode(div);
});
