import React from 'react';
import os from 'os';
import { Redirect } from 'react-router-dom';
import './sass/main.scss';

const InitialLocation = () => {
	const networkInterfaces = os.networkInterfaces();
	if (
		localStorage.getItem('expiration') !== null &&
		new Date(localStorage.getItem('expiration')) >= new Date() &&
		localStorage.getItem('mac') === networkInterfaces[Object.keys(networkInterfaces)[0]][0].mac
	) {
		return <Redirect to={'/Game'} />;
	}
	return <Redirect to={'/Game'} />;
};

export default InitialLocation;
