import React from 'react';
import { Redirect } from 'react-router-dom';
import os from 'os';
import config from '../config';

export default class ManageLicense {
	constructor(licenseKey) {
		this.licenseKey = licenseKey;
		return this.performAction();
	}

	async performAction() {
		const requestValidation = await this.validateKey();
		console.log(requestValidation[1].expiration);
		switch (requestValidation[0]) {
			case 200:
				localStorage.setItem('expiration', requestValidation[1].expiration);
				localStorage.setItem('mac', requestValidation[2]);
				return <Redirect to={'/Home'} />;
			case 400: // Wrong key
				return 1;
			default:
				// Technical error
				return 2;
		}
	}

	async validateKey() {
		const networkInterfaces = os.networkInterfaces();
		const { mac } = networkInterfaces[Object.keys(networkInterfaces)[0]][0];
		const options = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: config.AUTH
			},
			body: JSON.stringify({
				action: 1,
				license_key: this.licenseKey,
				mac_address: mac
			})
		};
		const response = await fetch(config.REST, options);
		return [response.status, await response.json(), mac];
	}
}
