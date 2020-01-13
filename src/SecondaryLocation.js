import React from 'react';
import { Redirect } from 'react-router-dom';

export default function SecondaryLocation() {
	return <Redirect to={window.localStorage.nextPage} />;
}
