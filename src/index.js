import React from 'react';
import ReactDOM from 'react-dom';
import os from 'os';
import Home from './pages/Home';
import Game from './pages/Game';
import './sass/main.scss';
import * as serviceWorker from './serviceWorker';

const networkInterfaces = os.networkInterfaces();
if (
	localStorage.getItem('expiration') !== null &&
	new Date(localStorage.getItem('expiration')) >= new Date() &&
	localStorage.getItem('mac') === networkInterfaces[Object.keys(networkInterfaces)[0]][0].mac
) {
	ReactDOM.render(<Home />, document.getElementById('root'));
} else {
	ReactDOM.render(<Game />, document.getElementById('root'));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
