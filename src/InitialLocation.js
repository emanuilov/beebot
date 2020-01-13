import React from 'react';
import { Redirect } from 'react-router-dom';

const InitialLocation = () => {
	if (
		localStorage.getItem('expiration') !== null &&
		new Date(localStorage.getItem('expiration')) >= new Date() &&
		localStorage.getItem('mac') === window.MAC
	) {
		return <Redirect to={'/Home'} />;
	}
	return <Redirect to={'/Game?id=1'} />;
};

export default InitialLocation;
